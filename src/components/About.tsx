import { motion } from "motion/react";
import { Cpu, Sparkles, Layers } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-12 md:py-16 px-6 md:px-16 max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        
        {/* Left Column: Sticky Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:sticky lg:top-32"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-6">
            <Cpu className="size-4" />
            <span>System Profile</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-100">
            Turning computation into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">cognition.</span>
          </h2>
        </motion.div>

        {/* Right Column: Content Blocks */}
        <div className="flex flex-col gap-12 pt-4 lg:pt-12">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative pl-8 border-l border-primary/20"
          >
            <div className="absolute -left-[17px] top-0 p-2 bg-slate-900 rounded-full border border-primary/20 text-primary shadow-[0_0_15px_rgba(56,189,248,0.15)]">
              <Sparkles className="size-4" />
            </div>
            <h3 className="text-xl font-semibold text-slate-200 mb-4">The Philosophy</h3>
            <p className="text-lg text-slate-400 leading-relaxed">
              My work lives at the intersection of language, vision, and automation. I believe AI shouldn't just be a parlor trick — it should be a grounded, reliable engine that drives real business value and solves complex problems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="relative pl-8 border-l border-accent/20"
          >
            <div className="absolute -left-[17px] top-0 p-2 bg-slate-900 rounded-full border border-accent/20 text-accent shadow-[0_0_15px_rgba(129,140,248,0.15)]">
              <Layers className="size-4" />
            </div>
            <h3 className="text-xl font-semibold text-slate-200 mb-4">The Execution</h3>
            <p className="text-lg text-slate-400 leading-relaxed">
              I architect RAG pipelines that make LLMs grounded and accurate, build AI agents that think and act autonomously, and develop computer vision solutions. Most importantly, I make sure everything I build is production-ready — deployed, scalable, and maintainable.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
