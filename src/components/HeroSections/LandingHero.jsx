import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    Play,
    Users,
    Trophy,
} from "lucide-react";
import { CLIENTS } from "../../data/clients";
import ContactModal from "../ContactModal";


const BACKGROUND_IMAGES = [
    `${import.meta.env.BASE_URL}hero-collage-1.webp`,
    `${import.meta.env.BASE_URL}hero-collage-2.webp`,
    `${import.meta.env.BASE_URL}hero-collage-3.webp`
];

// --- SUB-COMPONENTS ---
const StatItem = ({ value, label }) => (
    <div className="flex flex-col items-center justify-center transition-transform hover:-translate-y-1 cursor-default">
        <span className="text-xl font-bold text-white sm:text-2xl">{value}</span>
        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium sm:text-xs">{label}</span>
    </div>
);

// --- MAIN COMPONENT ---
export default function LandingHero() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isContactOpen, setIsContactOpen] = useState(false);

    // Rotate images every 1.2 seconds for fast dynamic feel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
        }, 1200);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full text-white overflow-hidden font-sans">
            {/* 
        SCOPED ANIMATIONS 
      */}
            <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-fade-in {
          animation: fadeSlideIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>

            {/* Background Image Slider with Framer Motion for Smooth Crossfade */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 0.35, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${BACKGROUND_IMAGES[currentImageIndex]})`,
                        maskImage: "linear-gradient(180deg, transparent, black 0%, black 70%, transparent)",
                        WebkitMaskImage: "linear-gradient(180deg, transparent, black 0%, black 70%, transparent)",
                    }}
                />
            </AnimatePresence>

            {/* Dark Gradient Overlay for Text Visibility */}
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent" />

            <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 pt-24 pb-12 sm:px-8 md:pt-32 md:pb-20 lg:px-12">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">

                    {/* --- LEFT COLUMN --- */}
                    <div className="lg:col-span-7 flex flex-col justify-center space-y-8 pt-8 text-center lg:text-left items-center lg:items-start">

                        {/* Badge */}
                        <div className="animate-fade-in delay-100">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md transition-colors hover:bg-white/10">
                                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                                    Trusted by 25+ Clients
                                    <Users className="w-3.5 h-3.5 text-blue-400" />
                                </span>
                            </div>
                        </div>

                        {/* Heading */}
                        <h1
                            className="animate-fade-in delay-200 text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-[1.1] sm:leading-[0.9]"
                        >
                            Building<br />
                            <span className="bg-gradient-to-br from-white via-white to-[#3b82f6] bg-clip-text text-transparent">
                                Excellence
                            </span><br />
                            Through Precision
                        </h1>

                        {/* Description */}
                        <p className="animate-fade-in delay-300 max-w-xl text-base sm:text-lg text-zinc-100 leading-relaxed font-semibold">
                            MANO Project Consultants delivers end-to-end consulting solutions for reliable, high-performance project delivery across residential, commercial, and industrial sectors.
                        </p>

                        {/* CTA Buttons */}
                        <div className="animate-fade-in delay-400 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <button
                                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-zinc-950 transition-all hover:scale-[1.02] hover:bg-zinc-200 active:scale-[0.98]"
                            >
                                View Services
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </button>

                            <div
                                onClick={() => setIsContactOpen(true)}
                                className="group cursor-pointer inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 hover:border-white/20"
                            >
                                <Play className="w-4 h-4 fill-current" />
                                Start Your Project
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN (DYNAMIC COLLAGE) --- */}
                    <div className="lg:col-span-5 relative h-[500px] hidden lg:block">
                        {/* 3D Floating Collage Container */}
                        <div className="relative w-full h-full perspective-[1000px]">

                            {/* Back Layer - Abstract Detail */}
                            <motion.div
                                animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-10 right-10 w-[60%] h-[70%] rounded-[2rem] overflow-hidden border border-white/5 opacity-50 z-0 grayscale"
                            >
                                <img src={BACKGROUND_IMAGES[2]} alt="Detail" className="w-full h-full object-cover" />
                            </motion.div>

                            {/* Middle Layer - Architects */}
                            <motion.div
                                animate={{ y: [0, 15, 0], rotate: [0, -2, 0] }}
                                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                className="absolute bottom-20 left-10 w-[55%] h-[45%] rounded-[2rem] overflow-hidden border border-white/10 shadow-xl z-10"
                            >
                                <img src={BACKGROUND_IMAGES[1]} alt="Architects" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay" />
                            </motion.div>


                            {/* Floating Stats Card - Front Layer */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="absolute bottom-10 right-0 w-[300px] bg-black/60 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl z-20"
                            >
                                {/* Glow */}
                                <div className="absolute top-0 right-0 -mr-16 -mt-16 h-40 w-40 rounded-full bg-white/5 blur-3xl pointer-events-none" />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                                            <Trophy className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-3xl font-bold tracking-tight text-white">12+</div>
                                            <div className="text-sm text-zinc-400">Years of Experience</div>
                                        </div>
                                    </div>

                                    {/* Animated Progress Bar */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-zinc-400">Client Satisfaction</span>
                                            <span className="text-white font-medium">95%</span>
                                        </div>
                                        <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800/50">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "95%" }}
                                                transition={{ duration: 1.5, delay: 1 }}
                                                className="h-full rounded-full bg-gradient-to-r from-white to-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="h-px w-full bg-white/10 mb-4" />

                                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                                        <div><span className="block font-bold text-white text-lg">25+</span><span className="text-zinc-500">Clients</span></div>
                                        <div><span className="block font-bold text-white text-lg">100+</span><span className="text-zinc-500">Projects</span></div>
                                        <div><span className="block font-bold text-white text-lg">90%</span><span className="text-zinc-500">Success</span></div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Marquee Section - Bottom Full Width */}
                <div className="mt-8">
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 py-3 sm:py-6 backdrop-blur-xl">
                        <h3 className="mb-2 sm:mb-4 px-8 text-center text-xs sm:text-sm font-medium text-zinc-400 uppercase tracking-widest">Trusted by Industry Leaders</h3>
                        <div
                            className="relative flex overflow-hidden"
                            style={{
                                maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
                                WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)"
                            }}
                        >
                            <div
                                className="flex w-full overflow-hidden select-none"
                                style={{
                                    maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
                                    WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)"
                                }}
                            >
                                {[0, 1].map((_, setIndex) => (
                                    <motion.div
                                        key={setIndex}
                                        initial={{ x: 0 }}
                                        animate={{ x: "-100%" }}
                                        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                                        className="flex shrink-0 gap-8 sm:gap-16 pr-8 sm:pr-16 min-w-full"
                                    >
                                        {[...CLIENTS, ...CLIENTS].map((client, i) => (
                                            <div key={i} className="flex items-center justify-center grayscale hover:grayscale-0 transition-grayscale duration-300 opacity-70 hover:opacity-100"
                                                style={{ minWidth: 'max-content' }}
                                            >
                                                <img
                                                    src={`${import.meta.env.BASE_URL}${client.logo}`}
                                                    alt={client.name}
                                                    loading="lazy"
                                                    className={`w-auto object-contain transition-all duration-300 
                                                ${client.isExtraLarge ? 'h-8 sm:h-24' : (client.isLarge ? 'h-6 sm:h-16' : 'h-5 sm:h-12')} 
                                                ${client.hasBackground
                                                            ? 'mix-blend-screen brightness-125 contrast-125 grayscale hover:grayscale-0'
                                                            : 'brightness-0 invert hover:brightness-100 hover:invert-0'
                                                        }`}
                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                />
                                            </div>
                                        ))}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </div>
    );
}

