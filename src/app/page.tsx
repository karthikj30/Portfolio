import IntroSequence from "@/components/IntroSequence";
import ResumeModal from "@/components/ResumeModal";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import ProjectsGallery from "@/components/ProjectsGallery";
import MoreProjects from "@/components/MoreProjects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <IntroSequence />
      <Nav />
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <ProjectsGallery />
        <MoreProjects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <ResumeModal />
    </>
  );
}
