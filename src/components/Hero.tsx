import { motion } from "motion/react";
import { Typewriter } from "react-simple-typewriter";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-px h-64 bg-gradient-to-b from-transparent via-primary to-transparent rotate-45"></div>
        <div className="absolute top-1/2 right-1/3 w-px h-96 bg-gradient-to-b from-transparent via-accent to-transparent -rotate-12"></div>
        <div className="absolute bottom-1/4 right-1/4 w-px h-48 bg-gradient-to-b from-transparent via-primary to-transparent rotate-90"></div>
        <div className="absolute top-20 right-20 size-2 rounded-full bg-primary shadow-[0_0_20px_rgba(56,189,248,0.4)]"></div>
        <div className="absolute bottom-40 left-20 size-1.5 rounded-full bg-accent shadow-[0_0_20px_rgba(129,140,248,0.4)]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 max-w-4xl px-6 py-20 w-full"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-slate-800/60 bg-slate-900/50 backdrop-blur-md px-5 py-2.5 text-sm font-mono shadow-lg"
        >
          <span className="text-slate-400">$</span>
          <span className="text-slate-200">echo</span>
          <span className="text-emerald-400">"Hello, World! I'm"</span>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight text-slate-100"
        >
          Sarvesh <span className="text-primary">Pagar</span>
        </motion.h1>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          className="text-xl md:text-2xl font-semibold mb-8 text-slate-300 h-8 flex items-center gap-3 font-mono"
        >
          <span className="w-1.5 h-6 bg-primary inline-block rounded-full"></span>
          <div className="flex items-center gap-2">
            <span className="text-primary">
              <Typewriter
                words={[
                  "Artificial Intelligence",
                  "Machine Learning",
                ]}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={50}
                deleteSpeed={40}
                delaySpeed={2000}
              />
            </span>
            <span className="text-slate-400">Engineer</span>
          </div>
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          className="text-base md:text-lg text-slate-400 max-w-2xl mb-10 leading-relaxed"
        >
          I turn raw data into intelligent systems — building scalable ML pipelines, fine-tuning large language models, and shipping AI-powered applications that solve real problems in production, not just notebooks.
        </motion.p>
      </motion.div>
    </section>
  );
}
