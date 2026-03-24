import { motion, useMotionValue, animate, useMotionValueEvent, useTransform } from 'motion/react';
import { useState, useEffect } from 'react';

const experiences = [
  {
    role: "Machine Learning Intern",
    company: "YBI Foundation",
    period: "Nov 2023 - Feb 2024",
  },
  {
    role: "AI Engineer",
    company: "Aqeeq Technologies",
    period: "Nov 2024 - Present",
  },
];

export default function Experience() {
  const progress = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hoverIndex, setHoverIndex] = useState(-1);

  // Animate the progress value from 0 to 100 continuously (Slower for softer feel)
  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: 8,
      repeat: Infinity,
      ease: "linear",
    });
    return controls.stop;
  }, [progress]);

  // Sync the active index based on the particle's position
  useMotionValueEvent(progress, "change", (latest) => {
    if (latest >= 0 && latest < 25) {
      setActiveIndex(0);
    } else if (latest > 75 && latest <= 100) {
      setActiveIndex(1);
    } else {
      setActiveIndex(-1);
    }
  });

  // Map the progress to the particle's top CSS property
  const particleTop = useTransform(progress, [0, 100], ["0%", "100%"]);

  return (
    <section id="experience" className="relative z-10 w-full py-12 md:py-16 overflow-hidden">
      {/* Heading */}
      <div className="flex flex-col items-center mb-16 md:mb-24 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold text-slate-100 uppercase tracking-widest mb-4 drop-shadow-lg"
        >
          Professional Journey
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="h-1 w-20 bg-primary rounded-full opacity-80"
        />
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-4xl mx-auto px-6 md:px-12">
        
        {/* The Neural Data Pipeline (Line) */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2">
          {/* Faint background track */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(30,41,59,0.5)_5%,rgba(30,41,59,0.5)_95%,transparent)] w-full" />
          
          {/* Animated glowing line that draws itself */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full bg-[linear-gradient(to_bottom,transparent,rgba(56,189,248,0.8)_5%,rgba(56,189,248,0.8)_95%,transparent)] shadow-[0_0_15px_rgba(56,189,248,0.3)]"
          />

          {/* Traveling Data Particle (Synced with state) */}
          <motion.div
            style={{ top: particleTop }}
            className="absolute left-1/2 -translate-x-1/2 w-1.5 h-8 rounded-full bg-white shadow-[0_0_15px_#fff,0_0_20px_rgba(56,189,248,0.6)] z-0"
          />
        </div>

        {/* Milestones */}
        <div className="relative flex flex-col gap-24 md:gap-32">
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;
            // Node is active if the particle is over it OR if the user is hovering over it
            const isActive = activeIndex === index || hoverIndex === index;
            
            return (
              <div key={index} className={`relative flex items-center ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                
                {/* Glowing Node */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ delay: 0.5 + index * 0.3, type: "spring", stiffness: 100, damping: 20 }}
                  className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10"
                >
                  <motion.div
                    animate={{
                      scale: isActive ? 1.3 : 1,
                      boxShadow: isActive ? "0 0 25px rgba(56,189,248,0.6)" : "0 0 15px rgba(56,189,248,0.2)",
                      borderColor: isActive ? "#ffffff" : "#38bdf8"
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(-1)}
                    className="w-5 h-5 rounded-full bg-slate-900 border-[3px] cursor-pointer"
                  />
                </motion.div>

                {/* Content (Role, Company, Period) */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ delay: 0.7 + index * 0.3, duration: 0.8, ease: "easeOut" }}
                  className={`ml-16 md:ml-0 md:w-1/2 ${isEven ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'}`}
                >
                  {/* Interactive Container that floats and glows */}
                  <motion.div
                    animate={{ y: isActive ? -4 : 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(-1)}
                    className="cursor-pointer p-4 -m-4 rounded-2xl transition-colors duration-500 hover:bg-slate-800/20"
                  >
                    <motion.h3 
                      animate={{
                        color: isActive ? "#ffffff" : "#f1f5f9",
                        textShadow: isActive ? "0 0 15px rgba(56,189,248,0.5)" : "0 0 0px rgba(56,189,248,0)"
                      }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl md:text-3xl font-bold tracking-wide mb-2"
                    >
                      {exp.role}
                    </motion.h3>
                    <motion.h4 
                      animate={{
                        color: isActive ? "#7dd3fc" : "#38bdf8"
                      }}
                      transition={{ duration: 0.5 }}
                      className="text-lg md:text-xl font-medium mb-3"
                    >
                      {exp.company}
                    </motion.h4>
                    <p className="text-sm md:text-base text-slate-400 font-mono tracking-wider">
                      {exp.period}
                    </p>
                  </motion.div>
                </motion.div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
