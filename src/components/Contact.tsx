import { motion } from "motion/react";
import { Mail, Send, Github, Linkedin, Loader2 } from "lucide-react";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await addDoc(collection(db, "messages"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        createdAt: serverTimestamp(),
      });
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-16 px-6 md:px-16 max-w-7xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center text-center gap-3 mb-12"
      >
        <div className="flex items-center gap-3">
          <Mail className="text-primary size-8" />
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-slate-100">
            Establish Connection
          </h2>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-slate-800/30 rounded-3xl border border-primary/20 overflow-hidden glow-border backdrop-blur-sm">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="p-8 md:p-12 space-y-6"
        >
          <h3 className="text-xl font-bold text-slate-100">Send a Message</h3>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary/50 placeholder:text-slate-600 text-slate-200 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary/50 placeholder:text-slate-600 text-slate-200 outline-none transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Message
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can I help you?"
                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary/50 placeholder:text-slate-600 text-slate-200 outline-none transition-all resize-none"
              ></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-slate-900 py-3.5 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>Sending... <Loader2 className="size-4 animate-spin" /></>
              ) : submitStatus === "success" ? (
                "Message Sent!"
              ) : (
                <>Send Message <Send className="size-4" /></>
              )}
            </motion.button>
            {submitStatus === "error" && (
              <p className="text-red-400 text-sm text-center mt-2">Failed to send message. Please try again.</p>
            )}
          </form>
        </motion.div>

        {/* Info & Socials */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 md:p-12 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-primary/10"
        >
          <div className="space-y-10">
            <div>
              <h4 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">
                Location
              </h4>
              <p className="text-slate-300 leading-relaxed">
                Nashik-422003, Maharashtra - IN
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wider">
                Social Profiles
              </h4>
              <div className="flex gap-4">
                <motion.a
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://github.com/sarveshpagar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-slate-900/50 border border-slate-700/50 flex items-center justify-center text-slate-300 hover:bg-primary hover:text-slate-900 hover:border-primary transition-all"
                >
                  <Github className="size-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://www.linkedin.com/in/sarvesh-pagar-99592122a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-slate-900/50 border border-slate-700/50 flex items-center justify-center text-slate-300 hover:bg-primary hover:text-slate-900 hover:border-primary transition-all"
                >
                  <Linkedin className="size-5" />
                </motion.a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">
                Connect
              </h4>
              <a 
                href="mailto:sarveshapagar1113@gmail.com"
                className="text-slate-300 hover:text-primary transition-colors flex items-center gap-2"
              >
                <Mail className="size-5" />
                sarveshapagar1113@gmail.com
              </a>
            </div>
          </div>

          <div className="mt-12 bg-slate-900/40 p-5 rounded-2xl border border-primary/20 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="size-3 rounded-full bg-primary shadow-[0_0_10px_rgba(56,189,248,0.6)] animate-pulse"></div>
              <span className="text-xs font-medium tracking-wider text-slate-300 uppercase">
                Status: Available for work
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
