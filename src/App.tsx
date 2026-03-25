import { ReactLenis } from 'lenis/react';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ParticleBackground from "./components/ParticleBackground";
import GlobalHUD from "./components/GlobalHUD";

const lenisOptions = { lerp: 0.05, duration: 1.5, smoothWheel: true };

export default function App() {
  return (
    <ReactLenis root options={lenisOptions}>
      <div className="relative min-h-screen bg-background-dark text-slate-100 selection:bg-primary/30 font-display neural-bg overflow-x-hidden w-full max-w-full">
        <ParticleBackground />
        <GlobalHUD />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </ReactLenis>
  );
}

