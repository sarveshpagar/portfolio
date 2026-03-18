import { Suspense, useState, useEffect, Component, ErrorInfo, ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, useSphere, useBox } from "@react-three/cannon";
import { Environment, useTexture, Html, useProgress } from "@react-three/drei";
import { motion } from "motion/react";

class ErrorBoundary extends Component<{children: ReactNode, fallback: ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: ReactNode, fallback: ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
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
  { name: "Python", url: "/tech/python.png", category: "Language" },
  { name: "SQL", url: "/tech/sql.png", category: "Language" },
  { name: "C++", url: "/tech/cpp.png", category: "Language" },
  
  // AI/ML
  { name: "TensorFlow", url: "/tech/tensorflow.png", category: "AI/ML" },
  { name: "PyTorch", url: "/tech/pytorch.png", category: "AI/ML" },
  { name: "Scikit-learn", url: "/tech/scikit-learn.png", category: "AI/ML" },
  { name: "Pandas", url: "/tech/pandas.png", category: "AI/ML" },
  { name: "NumPy", url: "/tech/numpy.png", category: "AI/ML" },
  { name: "FastAPI", url: "/tech/fastapi.png", category: "AI/ML" }, // FastAPI fallback
  { name: "Flask", url: "/tech/flask.png", category: "AI/ML" },
  { name: "LangChain", url: "/tech/langchain.png", category: "AI/ML" }, // LangChain
  { name: "LangGraph", url: "/tech/langgraph.png", category: "AI/ML" }, // LangGraph fallback
  
  // Tools
  { name: "Git", url: "/tech/git.png", category: "Tools" },
  { name: "GitHub", url: "/tech/github.png", category: "Tools" },
  { name: "Docker", url: "/tech/docker.png", category: "Tools" },
  { name: "Hugging Face", url: "/tech/huggingface.png", category: "Tools" },
  { name: "Meta Graph API", url: "/tech/meta.png", category: "Tools" },
  { name: "MS Excel", url: "/tech/excel.png", category: "Tools" },
  
  // Cloud
  { name: "AWS", url: "/tech/aws.png", category: "Cloud" }
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

function TechCube({ name, imgUrl, position, size = 1.2 }: { name: string; imgUrl: string; position: [number, number, number]; size?: number }) {
  const [ref, api] = useBox(() => ({ 
    mass: 1, 
    args: [size, size, size], 
    position, 
    linearDamping: 0.3, 
    angularDamping: 0.3, 
    restitution: 0.4,
    linearFactor: [1, 1, 0] // Lock Z-axis movement so cubes never go behind each other
  }));
  const [texture] = useTexture([imgUrl]);
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
      <meshStandardMaterial map={texture} color="#ffffff" />
      {hovered && (
        <Html center position={[0, size, 0]}>
          <div className="bg-slate-900/90 text-sky-300 text-xs px-3 py-1.5 rounded-full border border-sky-400/30 backdrop-blur-md whitespace-nowrap shadow-[0_0_15px_rgba(56,189,248,0.15)] pointer-events-none font-medium tracking-wide">
            {name}
          </div>
        </Html>
      )}
    </mesh>
  );
}

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredStack = techStack.filter(
    (tech) => activeFilter === "All" || tech.category === activeFilter
  );

  const cubeSize = isMobile ? 0.8 : 1.2;
  const spacing = cubeSize * 1.2;

  return (
    <section id="skills" className="py-12 md:py-16 px-6 md:px-16 max-w-7xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col gap-4 mb-8 items-center text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100 uppercase tracking-widest">My Tech Stack</h2>
        <div className="h-1 w-20 bg-primary rounded-full opacity-80"></div>
        <p className="text-slate-400 max-w-2xl text-sm md:text-base">
          Interact with the technologies I use. Drag your mouse or click the cubes!
        </p>
      </motion.div>

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
        <ErrorBoundary fallback={<div>Error</div>}>
          <Canvas shadows camera={{ position: [0, 0, 15], fov: 35 }} key={isMobile ? 'mobile' : 'desktop'}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <Environment preset="city" />
            <Suspense fallback={null}>
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
                    <ErrorBoundary key={tech.url} fallback={null}>
                      <TechCube name={tech.name} imgUrl={tech.url} position={[x, y, z]} size={cubeSize} />
                    </ErrorBoundary>
                  );
                })}
              </Physics>
            </Suspense>
          </Canvas>
        </ErrorBoundary>
      </div>
    </section>
  );
}
