import React, { Suspense, useState, useEffect, ErrorInfo, ReactNode } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, useSphere, useBox } from "@react-three/cannon";
import { Environment, Html, useProgress } from "@react-three/drei";
import { motion } from "motion/react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
  key?: string | number;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public props: ErrorBoundaryProps;
  public state: ErrorBoundaryState = { hasError: false, error: null };

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.props = props;
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Canvas error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback !== undefined) {
        return this.props.fallback;
      }
      return (
        <div className="w-full h-full flex flex-col items-center justify-center text-red-400 p-4 bg-slate-900/50 rounded-3xl border border-red-500/30">
          <p className="font-bold mb-2">Failed to load 3D scene</p>
          <p className="text-xs text-red-300/70 text-center break-all">{this.state.error?.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const techStack = [
  // Languages
  { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", category: "Language" },
  { name: "SQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg", category: "Language" },
  { name: "C++", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg", category: "Language" },
  
  // AI/ML
  { name: "TensorFlow", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg", category: "AI/ML" },
  { name: "PyTorch", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg", category: "AI/ML" },
  { name: "Scikit-learn", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg", category: "AI/ML" },
  { name: "Pandas", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg", category: "AI/ML" },
  { name: "NumPy", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg", category: "AI/ML" },
  { name: "FastAPI", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg", category: "AI/ML" },
  { name: "Flask", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg", category: "AI/ML" },
  { name: "LangChain", url: "https://avatars.githubusercontent.com/u/126733545?v=4", category: "AI/ML" },
  { name: "LangGraph", url: "https://avatars.githubusercontent.com/u/126733545?v=4", category: "AI/ML" },
  
  // Tools
  { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", category: "Tools" },
  { name: "GitHub", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", category: "Tools" },
  { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", category: "Tools" },
  { name: "Hugging Face", url: "https://avatars.githubusercontent.com/u/25720743?v=4", category: "Tools" },
  { name: "Meta Graph API", url: "https://img.icons8.com/color/512/meta.png", category: "Tools" },
  { name: "MS Excel", url: "https://img.icons8.com/color/512/microsoft-excel-2019--v1.png", category: "Tools" },
  
  // Cloud
  { name: "AWS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", category: "Cloud" }
];

const categories = ["All", "Language", "Cloud", "AI/ML", "Tools"];

function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-sky-400/20 border-t-sky-400 rounded-full animate-spin"></div>
        <span className="text-sky-400 font-mono text-xs whitespace-nowrap tracking-widest">
          LOADING {progress.toFixed(0)}%
        </span>
      </div>
    </Html>
  );
}

function Pointer() {
  const viewport = useThree((state) => state.viewport);
  const { width } = useThree((state) => state.size);
  const isMobile = width < 768;
  const pointerSize = isMobile ? 0.6 : 1.2;
  const [, api] = useSphere(() => ({ type: "Kinematic", args: [pointerSize], position: [0, 0, 0] }));
  useFrame((state) => {
    api.position.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0);
  });
  return null;
}

function Boundaries() {
  const viewport = useThree((state) => state.viewport);
  const { width } = useThree((state) => state.size);
  const isMobile = width < 768;
  const offset = isMobile ? 1.0 : 1.5;
  const thickness = 20; // Very thick walls to prevent tunneling

  const [, bottomApi] = useBox(() => ({ type: "Static", args: [100, thickness, 100], position: [0, -viewport.height / 2 + offset - thickness / 2, 0] }));
  const [, leftApi] = useBox(() => ({ type: "Static", args: [thickness, 100, 100], position: [-viewport.width / 2 + offset - thickness / 2, 0, 0] }));
  const [, rightApi] = useBox(() => ({ type: "Static", args: [thickness, 100, 100], position: [viewport.width / 2 - offset + thickness / 2, 0, 0] }));
  const [, backApi] = useBox(() => ({ type: "Static", args: [100, 100, thickness], position: [0, 0, -2 - thickness / 2] }));
  const [, frontApi] = useBox(() => ({ type: "Static", args: [100, 100, thickness], position: [0, 0, 2 + thickness / 2] }));

  useEffect(() => {
    bottomApi.position.set(0, -viewport.height / 2 + offset - thickness / 2, 0);
    leftApi.position.set(-viewport.width / 2 + offset - thickness / 2, 0, 0);
    rightApi.position.set(viewport.width / 2 - offset + thickness / 2, 0, 0);
    backApi.position.set(0, 0, -2 - thickness / 2);
    frontApi.position.set(0, 0, 2 + thickness / 2);
  }, [viewport.width, viewport.height, offset, thickness, bottomApi, leftApi, rightApi, backApi, frontApi]);

  return null;
}

function FallbackCube({ name, position, size = 1.2 }: { name: string; position: [number, number, number]; size?: number }) {
  const [ref, api] = useBox(() => ({ 
    mass: 1, 
    args: [size, size, size], 
    position, 
    linearDamping: 0.3, 
    angularDamping: 0.3, 
    restitution: 0.4,
    linearFactor: [1, 1, 0]
  }));
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = `url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="6" fill="%2338bdf8" opacity="0.4" /><circle cx="12" cy="12" r="3" fill="%2338bdf8" /></svg>') 12 12, auto`;
    } else {
      document.body.style.cursor = 'auto';
    }
    return () => { document.body.style.cursor = 'auto'; };
  }, [hovered]);

  return (
    <mesh 
      ref={ref as any} 
      castShadow 
      receiveShadow 
      onClick={() => api.applyImpulse([0, 5, 0], [0, 0, 0])}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color="#0f172a" />
      <Html center position={[0, 0, size/2 + 0.01]}>
        <div className="text-sky-400 font-bold text-xs md:text-sm whitespace-nowrap pointer-events-none drop-shadow-md">
          {name}
        </div>
      </Html>
    </mesh>
  );
}

function useCanvasTexture(url: string) {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    let isMounted = true;
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      if (!isMounted) return;
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, 512, 512);
        
        // Draw a white circle background so dark logos are visible
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(256, 256, 220, 0, Math.PI * 2);
        ctx.fill();

        const imgW = img.width || 256;
        const imgH = img.height || 256;
        const padding = 100; // Increased padding to fit inside the circle
        const availableSize = 512 - (padding * 2);
        const scale = Math.min(availableSize / imgW, availableSize / imgH);
        const w = imgW * scale;
        const h = imgH * scale;
        
        ctx.drawImage(img, (512 - w) / 2, (512 - h) / 2, w, h);
        
        const tex = new THREE.CanvasTexture(canvas);
        tex.colorSpace = THREE.SRGBColorSpace;
        setTexture(tex);
      }
    };
    img.src = url;
    
    return () => {
      isMounted = false;
      if (texture) texture.dispose();
    };
  }, [url]);

  return texture;
}

function TechCube({ name, imgUrl, position, size = 1.2, setHoveredTech }: { name: string; imgUrl: string; position: [number, number, number]; size?: number; setHoveredTech: (name: string | null) => void }) {
  const [ref, api] = useBox(() => ({ 
    mass: 1, 
    args: [size, size, size], 
    position, 
    linearDamping: 0.3, 
    angularDamping: 0.3, 
    restitution: 0.4,
    linearFactor: [1, 1, 0] // Lock Z-axis movement so cubes never go behind each other
  }));
  const [hovered, setHovered] = useState(false);
  const texture = useCanvasTexture(imgUrl);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = `url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="6" fill="%2338bdf8" opacity="0.4" /><circle cx="12" cy="12" r="3" fill="%2338bdf8" /></svg>') 12 12, auto`;
      setHoveredTech(name);
    } else {
      document.body.style.cursor = 'auto';
      setHoveredTech(null);
    }
    return () => { 
      document.body.style.cursor = 'auto'; 
      setHoveredTech(null);
    };
  }, [hovered, name, setHoveredTech]);

  return (
    <mesh 
      ref={ref as any} 
      castShadow 
      receiveShadow 
      onClick={() => api.applyImpulse([0, 5, 0], [0, 0, 0])}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color="#1e293b" />
      
      {texture && (
        <mesh>
          <boxGeometry args={[size + 0.01, size + 0.01, size + 0.01]} />
          <meshBasicMaterial map={texture} transparent={true} alphaTest={0.05} side={THREE.DoubleSide} />
        </mesh>
      )}
    </mesh>
  );
}

function FallbackTechGrid({ techStack }: { techStack: any[] }) {
  return (
    <div className="w-full h-full p-6 overflow-y-auto flex flex-wrap justify-center gap-4 items-center bg-slate-900/20">
      {techStack.map((tech) => (
        <div key={tech.name} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-sky-500/50 transition-colors">
          <img src={tech.url} alt={tech.name} className="w-12 h-12 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <span className="text-xs font-medium text-slate-300">{tech.name}</span>
        </div>
      ))}
    </div>
  );
}

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isMobile, setIsMobile] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch (e) {
      setHasWebGL(false);
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredStack = techStack.filter(
    (tech) => activeFilter === "All" || tech.category === activeFilter
  );

  const cubeSize = isMobile ? 0.8 : 1.2;
  const spacing = cubeSize * 1.2;

  return (
    <section id="skills" className="py-12 md:py-16 px-6 md:px-16 max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col items-center mb-16 md:mb-24 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold text-slate-100 uppercase tracking-widest mb-4 drop-shadow-lg"
        >
          My Tech Stack
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="h-1 w-20 bg-primary rounded-full opacity-80"
        />
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-slate-400 max-w-2xl text-sm md:text-base mt-4"
        >
          Interact with the technologies I use. Drag your mouse or click the cubes!
        </motion.p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
              activeFilter === category
                ? "bg-sky-400/10 border-sky-400/50 text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.15)]"
                : "bg-slate-900/50 border-slate-700/50 text-slate-400 hover:border-slate-500 hover:text-slate-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl mx-auto h-[400px] md:h-[500px] bg-transparent rounded-3xl border border-sky-400/20 shadow-[0_0_20px_rgba(56,189,248,0.05)] overflow-hidden relative">
        {hoveredTech && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 bg-slate-900/90 text-sky-300 text-sm md:text-base px-6 py-2.5 rounded-full border border-sky-400/30 backdrop-blur-md whitespace-nowrap shadow-[0_0_20px_rgba(56,189,248,0.2)] pointer-events-none font-medium tracking-wide transition-opacity duration-200 animate-in fade-in zoom-in-95">
            {hoveredTech}
          </div>
        )}
        {!hasWebGL ? (
          <FallbackTechGrid techStack={filteredStack} />
        ) : (
          <ErrorBoundary fallback={<FallbackTechGrid techStack={filteredStack} />}>
            <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 0, 15], fov: 35 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
              <Environment preset="city" />
              <Suspense fallback={<CanvasLoader />}>
                <Physics gravity={[0, -10, 0]}>
                  <Pointer />
                  <Boundaries />
                  {filteredStack.map((tech, i) => {
                    const cols = Math.min(isMobile ? 3 : 4, filteredStack.length || 1);
                    const col = i % cols;
                    const row = Math.floor(i / cols);
                    const jitterX = i % 2 === 0 ? 0.1 : -0.1;
                    const x = col * spacing - ((cols - 1) * spacing) / 2 + jitterX;
                    const y = row * spacing + 2; // Spawn higher up so they fall in
                    const z = 0; // Strictly 0 to prevent Z-axis overlapping
                    return (
                      <ErrorBoundary key={tech.url} fallback={<FallbackCube name={tech.name} position={[x, y, z]} size={cubeSize} />}>
                        <TechCube name={tech.name} imgUrl={tech.url} position={[x, y, z]} size={cubeSize} setHoveredTech={setHoveredTech} />
                      </ErrorBoundary>
                    );
                  })}
                </Physics>
              </Suspense>
            </Canvas>
          </ErrorBoundary>
        )}
      </div>
    </section>
  );
}
