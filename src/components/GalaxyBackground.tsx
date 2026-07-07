"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Premium interactive 3D galaxy hero background.
 *
 * - Spiral galaxy of additive-blended particles (violet core → cyan rim)
 * - A glowing core plus two parallax star layers for depth
 * - Exponential fog for atmospheric haze
 * - Mouse + scroll parallax with smooth easing
 * - Visibility-aware rAF loop, capped particle counts, single draw call each
 * - Graceful fallback when WebGL is unavailable, and a static frame under
 *   `prefers-reduced-motion`.
 *
 * Rendered on a transparent canvas so it layers over the dark page background.
 */
export default function GalaxyBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- Renderer (with graceful WebGL fallback) ----
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return; // No WebGL → leave the dark background untouched.
    }
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    mount.appendChild(canvas);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05060a, 0.055);

    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 120);
    camera.position.set(0, 2.6, 9);
    camera.lookAt(0, 0, 0);

    // ---- Soft glowing point sprite (fake bloom, cheaply) ----
    function makeSprite() {
      const size = 64;
      const c = document.createElement("canvas");
      c.width = c.height = size;
      const ctx = c.getContext("2d")!;
      const g = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2
      );
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.2, "rgba(255,255,255,0.85)");
      g.addColorStop(0.45, "rgba(255,255,255,0.3)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);
      return new THREE.CanvasTexture(c);
    }
    const sprite = makeSprite();

    const disposables: { dispose(): void }[] = [sprite];

    // ---- Spiral galaxy ----
    const COUNT = 7000;
    const RADIUS = 10;
    const BRANCHES = 4;
    const SPIN = 1.05;
    const RANDOMNESS = 0.45;
    const POWER = 2.6;
    const inside = new THREE.Color(0x8b5cf6);
    const outside = new THREE.Color(0x22d3ee);

    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const r = Math.pow(Math.random(), 1.4) * RADIUS;
      const branch = ((i % BRANCHES) / BRANCHES) * Math.PI * 2;
      const spin = r * SPIN;
      const sign = () => (Math.random() < 0.5 ? 1 : -1);
      const rx = Math.pow(Math.random(), POWER) * sign() * RANDOMNESS * r;
      const ry = Math.pow(Math.random(), POWER) * sign() * RANDOMNESS * r * 0.35;
      const rz = Math.pow(Math.random(), POWER) * sign() * RANDOMNESS * r;
      positions[i3] = Math.cos(branch + spin) * r + rx;
      positions[i3 + 1] = ry;
      positions[i3 + 2] = Math.sin(branch + spin) * r + rz;
      const col = inside.clone().lerp(outside, Math.min(r / RADIUS, 1));
      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;
    }
    const galaxyGeo = new THREE.BufferGeometry();
    galaxyGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    galaxyGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const galaxyMat = new THREE.PointsMaterial({
      size: 0.09,
      sizeAttenuation: true,
      map: sprite,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });
    disposables.push(galaxyGeo, galaxyMat);

    const galaxyGroup = new THREE.Group();
    galaxyGroup.add(new THREE.Points(galaxyGeo, galaxyMat));
    galaxyGroup.rotation.x = -0.5; // tilt the disc toward the camera

    // Glowing core
    const coreGeo = new THREE.BufferGeometry();
    coreGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array([0, 0, 0]), 3)
    );
    const coreMat = new THREE.PointsMaterial({
      size: 1.7,
      sizeAttenuation: true,
      map: sprite,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: 0xede4ff,
    });
    disposables.push(coreGeo, coreMat);
    galaxyGroup.add(new THREE.Points(coreGeo, coreMat));
    scene.add(galaxyGroup);

    // ---- Parallax star layers ----
    function makeStars(n: number, spread: number, size: number, color: number) {
      const pos = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) {
        const i3 = i * 3;
        pos[i3] = (Math.random() - 0.5) * spread;
        pos[i3 + 1] = (Math.random() - 0.5) * spread * 0.6;
        pos[i3 + 2] = (Math.random() - 0.5) * spread;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({
        size,
        sizeAttenuation: true,
        map: sprite,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color,
      });
      disposables.push(geo, mat);
      const points = new THREE.Points(geo, mat);
      scene.add(points);
      return points;
    }
    const starsFar = makeStars(1200, 70, 0.12, 0x8fa6ff);
    const starsNear = makeStars(500, 34, 0.2, 0xffffff);

    // ---- Interaction state ----
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let scrollProgress = 0;

    const onPointer = (e: PointerEvent) => {
      target.x = e.clientX / window.innerWidth - 0.5;
      target.y = e.clientY / window.innerHeight - 0.5;
    };
    const onScroll = () => {
      scrollProgress = Math.min(window.scrollY / (window.innerHeight || 1), 1.3);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    // ---- Resize ----
    const resize = () => {
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(resize);
      ro.observe(mount);
    } else {
      window.addEventListener("resize", resize);
    }

    // ---- Render loop (visibility-aware, delta-based) ----
    const clock = new THREE.Clock();
    let raf = 0;
    let running = false;

    const renderFrame = () => {
      const delta = Math.min(clock.getDelta(), 0.05);

      current.x += (target.x - current.x) * 0.045;
      current.y += (target.y - current.y) * 0.045;

      galaxyGroup.rotation.y += delta * 0.05;
      galaxyGroup.rotation.x = -0.5 + current.y * 0.28;
      galaxyGroup.rotation.z = current.x * 0.14;

      starsFar.rotation.y += delta * 0.01;
      starsNear.rotation.y -= delta * 0.014;

      camera.position.x = current.x * 1.2;
      camera.position.y = 2.6 + scrollProgress * 2.6 + current.y * -0.6;
      camera.lookAt(0, scrollProgress * -0.6, 0);

      renderer.render(scene, camera);
    };

    const loop = () => {
      if (!running) return;
      renderFrame();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      clock.getDelta(); // discard the gap so motion resumes smoothly
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    if (reduced) {
      renderFrame(); // one static frame
    } else {
      start();
    }

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // ---- Cleanup ----
    return () => {
      stop();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      ro?.disconnect();
      disposables.forEach((d) => d.dispose());
      // Explicitly release the GPU context so repeated mounts (React
      // StrictMode / Fast Refresh) don't leak WebGL contexts and hit the
      // browser's per-page context limit.
      renderer.forceContextLoss();
      renderer.dispose();
      if (canvas.parentNode === mount) mount.removeChild(canvas);
    };
  }, []);

  return (
    <div ref={mountRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
  );
}
