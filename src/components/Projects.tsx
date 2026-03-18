import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Tilt } from "react-tilt";
import { X, ExternalLink } from "lucide-react";

type Project = {
  title: string;
  category: string;
  desc: string;
  fullDesc: string;
  img: string;
  tags: string[];
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const halfRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  // Auto-scroll effect
  useEffect(() => {
    const el = scrollRef.current;
    const halfEl = halfRef.current;
    if (!el || !halfEl) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    let exactScrollLeft = el.scrollLeft;
    const speed = 0.05; // pixels per ms

    const scroll = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      
      if (el && halfEl) {
        // Sync if user scrolled manually
        if (Math.abs(el.scrollLeft - exactScrollLeft) > 2) {
          exactScrollLeft = el.scrollLeft;
        }
        
        exactScrollLeft += speed * delta;
        const resetPoint = halfEl.offsetWidth + 24; // 24px is gap-6
        
        if (exactScrollLeft >= resetPoint) {
          exactScrollLeft -= resetPoint;
        } else if (exactScrollLeft < 0) {
          exactScrollLeft += resetPoint;
        }
        
        el.scrollLeft = exactScrollLeft;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };
    
    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const projects: Project[] = [
    {
      title: "Facial Sketch Matching",
      category: "Computer Vision",
      desc: "Implementing Siamese Networks and triplet loss for high-accuracy forensic sketch-to-photo matching.",
      fullDesc: "This project implements a robust computer vision pipeline using Siamese Networks and triplet loss to match forensic hand-drawn sketches to actual photographs. By training on a diverse dataset of faces, the model learns to extract invariant facial features, overcoming the domain gap between sketches and photos. It achieves state-of-the-art accuracy, providing a critical tool for law enforcement and forensic analysis.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqKGfTMMsAqGxK_4ruDvWZPB7gDK2j0hC3AyeTyWh4oabxtBJT3MW3DfQ7qjD5HMjUa5mCUVJMuDiSITiB2AKxjrDDY5sJPA55v8n9bFf0UvYGxOEyQ9zTz2E1_vEoUQxLI4UcZyOZQ3J4Ci-vwVP6myYoddyb_p0ca6DTxL5PMivkbjfNI5N8L7TZ8CdAglYqBC2cJfo8i-2p8aoCuYxAfkt0XgAKhHJz0pMLdzKIDcfzWJNruowDPhKOQMi1WyHiquOf5HryGF4d",
      tags: ["PyTorch", "OpenCV", "CUDA"],
    },
    {
      title: "Mileage Prediction System",
      category: "Regression",
      desc: "Predicting fuel efficiency with 98% accuracy using advanced ensemble learning and feature engineering.",
      fullDesc: "A comprehensive machine learning system designed to predict vehicle fuel efficiency (MPG) with 98% accuracy. The project involved extensive exploratory data analysis, feature engineering (handling missing values, encoding categorical variables), and the deployment of advanced ensemble learning models like XGBoost and Random Forest. The final model was optimized using hyperparameter tuning to ensure robust performance across various vehicle specifications.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWx5yQvaG2ggGH9MgHLsNnzDq1ut4he0mLwpVMDo8zOpUsFn-4wPZLstOXm8efdTphbbIOo-B9Ho-6HuSe6Tb2ZBlfRR4HY9fJsKtwcO5_C-zMG_WMl2N0sTWFHR7t_l944yD2W19aZsB081d9MscVeJYZyTeMotDhWc6Jn8Kyw3wK2RzON08m6uorAai_MuHeXL76aPRxqEBkaEZ3si0FWpf0GmKuJSBN-NoUzBk38iPLVn7OiEZBkkkXQZK10ogSEDKajN_0OTey",
      tags: ["Scikit-Learn", "Pandas", "XGBoost"],
    },
    {
      title: "Gen-AI Chatbot",
      category: "LLM / NLP",
      desc: "Context-aware assistant with RAG implementation using LangChain for vector-based knowledge retrieval.",
      fullDesc: "An intelligent, context-aware conversational agent built using modern Generative AI techniques. This chatbot leverages Retrieval-Augmented Generation (RAG) to provide accurate, domain-specific answers by querying a Pinecone vector database. Built with LangChain and OpenAI's models, it maintains conversational memory and grounds its responses in factual data, significantly reducing hallucinations and improving user trust.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYuNNJ7QEVZENrcPjATFES-xlW4nYgdxQjTTecAaluMx-GYjOPD_777umT9j5h-N2yyql8mbUCDkielH1AJpJ9mZytGMuX0j7YNGz9QSvpGgaIDi2Mw0UodnSSkIfyNYGd6YpbZ3uDNO4oYSofdtqIXlk0jamco8a5-QpbdAptILCXiXYsw-V9J1-1PiuivaY5UuWs5dWCWpieXN7YiFUi6Gb_4TBB3Wwoj7mwvCscTO2pG4h6lDPoY6uMRC9qwd-ni2IGoHWfe6GU",
      tags: ["LangChain", "OpenAI", "Pinecone"],
    },
  ];

  const duplicatedProjects = [...projects, ...projects, ...projects, ...projects];

  const renderProjectCard = (project: Project, key: string) => (
    <div
      key={key}
      className="w-[85vw] sm:w-[350px] md:w-[400px] shrink-0 cursor-pointer"
      onClick={() => setSelectedProject(project)}
    >
      <Tilt
        options={{ max: 10, scale: 1.01, speed: 500 }}
        className="h-full"
      >
        <div className="group bg-slate-800/30 border border-slate-700/50 rounded-3xl overflow-hidden flex flex-col glow-border transition-all duration-500 h-full relative backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/80 z-10 pointer-events-none"></div>
          <div className="relative aspect-video w-full overflow-hidden rounded-t-3xl">
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img
              src={project.img}
              alt={project.title}
              className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 right-4 z-20">
              <span className="bg-slate-900/60 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-semibold text-primary uppercase border border-primary/20 tracking-wider">
                {project.category}
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8 flex flex-col flex-1 relative z-20">
            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 text-slate-100">
              {project.title}
            </h3>
            <p className="text-sm text-slate-400 mb-6 line-clamp-2 leading-relaxed">
              {project.desc}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium bg-slate-800/50 px-2.5 py-1 rounded-md text-slate-300 border border-slate-700/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Tilt>
    </div>
  );

  return (
    <>
      <section id="projects" className="py-12 md:py-16 relative z-10 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center text-center mb-12 max-w-7xl mx-auto px-6 md:px-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-100">
          Featured Projects
        </h2>
        <div className="h-1 w-20 bg-primary mt-3 rounded-full opacity-80"></div>
      </motion.div>

      {/* Auto-scrolling Horizontal List */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="relative w-full overflow-hidden pb-12"
      >
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto hide-scrollbar w-full"
        >
          <div className="flex gap-6 w-max px-6">
            {/* Half 1 */}
            <div ref={halfRef} className="flex gap-6">
              {duplicatedProjects.map((project, index) => renderProjectCard(project, `h1-${index}`))}
            </div>
            {/* Half 2 */}
            <div className="flex gap-6">
              {duplicatedProjects.map((project, index) => renderProjectCard(project, `h2-${index}`))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>

      {/* Project Detail Modal - Moved outside section to fix z-index stacking context */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-slate-950/80"
            style={{ perspective: "1000px" }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 60, rotateX: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 60, rotateX: -20 }}
              transition={{ type: "spring", damping: 20, stiffness: 200, mass: 0.8 }}
              className="relative w-full max-w-2xl max-h-[80vh] flex flex-col rounded-2xl shadow-[0_0_50px_rgba(56,189,248,0.2)] overflow-hidden border border-primary/30 bg-slate-900"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background Image Layer */}
              <div className="absolute inset-0 z-0 pointer-events-none bg-slate-950">
                <img
                  src={selectedProject.img}
                  alt={selectedProject.title}
                  className="w-full h-full object-contain object-top opacity-60"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent"></div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white rounded-full backdrop-blur-md transition-colors border border-slate-700/50 shadow-lg"
              >
                <X className="size-5" />
              </button>

              {/* Scrollable Content Area */}
              <div 
                className="relative z-10 flex-1 overflow-y-auto hide-scrollbar scroll-smooth w-full p-6 sm:p-8"
                style={{ overscrollBehavior: "contain" }}
              >
                {/* Spacer to keep the top of the image visible */}
                <div className="h-48 sm:h-64 w-full shrink-0"></div>
                
                {/* Text Content - No solid background! */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
                  className="relative"
                >
                  <span className="inline-block bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-sm">
                    {selectedProject.category}
                  </span>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 drop-shadow-lg">
                    {selectedProject.title}
                  </h3>

                  <div className="prose prose-invert max-w-none drop-shadow-md">
                    <p className="text-slate-200 leading-relaxed text-sm sm:text-base">
                      {selectedProject.fullDesc}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-700/50">
                    <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 drop-shadow-md">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium bg-slate-900/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-slate-100 border border-slate-600/50 shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
