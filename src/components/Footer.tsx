import { Terminal } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-slate-900/50 py-12 relative z-10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3 opacity-60">
          <Terminal className="text-primary size-6" />
          <span className="text-lg font-bold tracking-tight text-slate-200">
            Sarvesh <span className="text-primary font-medium">Pagar</span>
          </span>
        </div>
        <div className="text-slate-500 text-xs font-medium uppercase tracking-widest text-center">
          © {new Date().getFullYear()} Sarvesh Pagar. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
