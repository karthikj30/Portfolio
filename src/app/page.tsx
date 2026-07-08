import IntroSequence from "@/components/IntroSequence";
import ResumeModal from "@/components/ResumeModal";
import ProjectModal from "@/components/ProjectModal";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import ProjectsGallery from "@/components/ProjectsGallery";
import MoreProjects from "@/components/MoreProjects";
import Certifications from "@/components/Certifications";
import WritingSection from "@/components/WritingSection";
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
        <WritingSection />
        <Contact />
      </main>
      <Footer />
      <ResumeModal />
      <ProjectModal />
    </>
  );
}
