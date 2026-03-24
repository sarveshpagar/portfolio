import { motion } from 'motion/react';
import { useState } from 'react';

const educationData = [
  {
    role: "SSC",
    company: "SNJB's English Med. School, Chandwad",
    period: "2018 - 2019",
    score: "83.00%",
  },
  {
    role: "Diploma in Computer Technology",
    company: "Government Polytechnic, Nashik",
    period: "2019 - 2022",
    score: "88.44%",
  },
  {
    role: "B.E. in Artificial Intelligence and Data Science",
    company: "K K Wagh Institute of Engineering, Nashik",
    period: "2022 - 2025",
    score: "8.64 CGPA",
  }
];

export default function Education() {
  const [hoverIndex, setHoverIndex] = useState(-1);

  return (
    <section id="education" className="relative z-10 w-full py-12 md:py-16 overflow-hidden">
      {/* Heading */}
      <div className="flex flex-col items-center mb-16 md:mb-24 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold text-slate-100 uppercase tracking-widest mb-4 drop-shadow-lg"
        >
          Education
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
      <div className="relative max-w-5xl mx-auto px-4 md:px-12">
        
        {/* Desktop View (Horizontal) */}
        <div className="hidden md:block w-full pb-48 pt-48">
          <div className="relative w-full h-[2px] flex items-center">
            
            {/* Faint background track */}
            <div className="absolute inset-0 bg-slate-800/30 w-full rounded-full" />
            
            {/* Static glowing line that draws itself on scroll */}
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-400/0 via-teal-400/80 to-teal-400/0 shadow-[0_0_15px_rgba(45,212,191,0.3)] rounded-full"
            />

            {/* Finite End Caps (Shows the journey is bounded/completed) */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-8 bg-teal-400 rounded-full shadow-[0_0_15px_rgba(45,212,191,0.4)] border-2 border-slate-900" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-8 bg-teal-400 rounded-full shadow-[0_0_15px_rgba(45,212,191,0.4)] border-2 border-slate-900" />

            {/* Milestones */}
            <div className="absolute inset-0 flex justify-around items-center w-full">
              {educationData.map((exp, index) => {
                const isActive = hoverIndex === index;
                const isTop = index % 2 === 0; // Alternate text top/bottom
                
                return (
                  <div key={index} className="relative flex flex-col items-center justify-center">
                    
                    {/* Glowing Node */}
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ delay: 0.5 + index * 0.3, type: "spring", stiffness: 100, damping: 20 }}
                      className="z-10"
                    >
                      <motion.div
                        animate={{
                          scale: isActive ? 1.2 : 1,
                          boxShadow: isActive ? "0 0 25px rgba(45,212,191,0.6)" : "0 0 15px rgba(45,212,191,0.2)",
                          borderColor: isActive ? "#ffffff" : "#2dd4bf"
                        }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        onMouseEnter={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(-1)}
                        className="w-5 h-5 rounded-full bg-slate-900 border-[3px] cursor-pointer"
                      />
                    </motion.div>

                    {/* Content (Role, Company, Period) */}
                    <motion.div 
                      initial={{ opacity: 0, y: isTop ? -15 : 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ delay: 0.7 + index * 0.3, duration: 0.8, ease: "easeOut" }}
                      className={`absolute w-48 md:w-64 text-center ${isTop ? 'bottom-8' : 'top-8'}`}
                    >
                      <motion.div
                        animate={{ y: isActive ? (isTop ? -3 : 3) : 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        onMouseEnter={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(-1)}
                        className="cursor-pointer p-4 rounded-2xl transition-colors duration-500 hover:bg-slate-800/20"
                      >
                        <motion.h3 
                          animate={{
                            color: isActive ? "#ffffff" : "#f1f5f9",
                            textShadow: isActive ? "0 0 15px rgba(45,212,191,0.5)" : "0 0 0px rgba(45,212,191,0)"
                          }}
                          transition={{ duration: 0.5 }}
                          className="text-lg md:text-xl font-bold tracking-wide mb-2"
                        >
                          {exp.role}
                        </motion.h3>
                        <motion.h4 
                          animate={{
                            color: isActive ? "#5eead4" : "#2dd4bf"
                          }}
                          transition={{ duration: 0.5 }}
                          className="text-sm md:text-base font-medium mb-2"
                        >
                          {exp.company}
                        </motion.h4>
                        <p className="text-xs md:text-sm text-slate-400 font-mono tracking-wider mb-1">
                          {exp.period}
                        </p>
                        <p className="text-xs md:text-sm text-teal-300/80 font-mono tracking-wider font-semibold">
                          Score: {exp.score}
                        </p>
                      </motion.div>
                    </motion.div>

                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile View (Vertical Timeline) */}
        <div className="block md:hidden w-full py-8">
          <div className="relative w-full flex flex-col pl-4">
            
            {/* Vertical Track */}
            <div className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-slate-800/30" />
            
            {/* Animated Vertical Line */}
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute left-[23px] top-0 w-[2px] bg-gradient-to-b from-teal-400/0 via-teal-400/80 to-teal-400/0 shadow-[0_0_15px_rgba(45,212,191,0.3)]"
            />

            {/* End Caps */}
            <div className="absolute left-[19px] top-0 w-2.5 h-8 bg-teal-400 rounded-full shadow-[0_0_15px_rgba(45,212,191,0.4)] border-2 border-slate-900" />
            <div className="absolute left-[19px] bottom-0 w-2.5 h-8 bg-teal-400 rounded-full shadow-[0_0_15px_rgba(45,212,191,0.4)] border-2 border-slate-900" />

            {/* Milestones */}
            <div className="flex flex-col gap-12 w-full py-12">
              {educationData.map((exp, index) => {
                const isActive = hoverIndex === index;
                
                return (
                  <div key={index} className="relative flex items-center w-full">
                    
                    {/* Glowing Node */}
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ delay: 0.3 + index * 0.3, type: "spring", stiffness: 100, damping: 20 }}
                      className="absolute left-[14px] z-10"
                    >
                      <motion.div
                        animate={{
                          scale: isActive ? 1.2 : 1,
                          boxShadow: isActive ? "0 0 25px rgba(45,212,191,0.6)" : "0 0 15px rgba(45,212,191,0.2)",
                          borderColor: isActive ? "#ffffff" : "#2dd4bf"
                        }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        onMouseEnter={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(-1)}
                        onPointerDown={() => setHoverIndex(index)}
                        onPointerUp={() => setHoverIndex(-1)}
                        className="w-5 h-5 rounded-full bg-slate-900 border-[3px] cursor-pointer"
                      />
                    </motion.div>

                    {/* Content */}
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ delay: 0.5 + index * 0.3, duration: 0.8, ease: "easeOut" }}
                      className="w-full pl-12 pr-4"
                    >
                      <motion.div
                        animate={{ x: isActive ? 5 : 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        onMouseEnter={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(-1)}
                        onPointerDown={() => setHoverIndex(index)}
                        onPointerUp={() => setHoverIndex(-1)}
                        className="cursor-pointer p-5 rounded-2xl transition-colors duration-500 hover:bg-slate-800/20 bg-slate-800/20 border border-slate-700/30 backdrop-blur-sm"
                      >
                        <motion.h3 
                          animate={{
                            color: isActive ? "#ffffff" : "#f1f5f9",
                            textShadow: isActive ? "0 0 15px rgba(45,212,191,0.5)" : "0 0 0px rgba(45,212,191,0)"
                          }}
                          transition={{ duration: 0.5 }}
                          className="text-lg font-bold tracking-wide mb-1"
                        >
                          {exp.role}
                        </motion.h3>
                        <motion.h4 
                          animate={{
                            color: isActive ? "#5eead4" : "#2dd4bf"
                          }}
                          transition={{ duration: 0.5 }}
                          className="text-sm font-medium mb-2"
                        >
                          {exp.company}
                        </motion.h4>
                        <p className="text-xs text-slate-400 font-mono tracking-wider mb-1">
                          {exp.period}
                        </p>
                        <p className="text-xs text-teal-300/80 font-mono tracking-wider font-semibold">
                          Score: {exp.score}
                        </p>
                      </motion.div>
                    </motion.div>

                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
