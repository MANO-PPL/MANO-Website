import { useState } from "react";

import {
    ArrowRight,
    Users,
    Award,
    Briefcase,
    CheckCircle
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import ContactModal from "../ContactModal";

const StatItem = ({ value, label }) => (
    <div className="flex flex-col items-center justify-center transition-transform hover:-translate-y-1 cursor-default">
        <span className="text-xl font-bold text-white sm:text-2xl">{value}</span>
        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium sm:text-xs">{label}</span>
    </div>
);

// --- MAIN COMPONENT ---
export default function AboutHero({ showStatsCard = true }) {
    const [isContactOpen, setIsContactOpen] = useState(false);
    const isDesktopHero = showStatsCard;
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove(event) {
        const { currentTarget, clientX, clientY } = event;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set(clientX - left - width / 2);
        y.set(clientY - top - height / 2);
    }

    const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
    const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

    return (
        <div className={`relative w-full text-white overflow-hidden font-sans ${isDesktopHero ? 'min-h-screen' : ''}`}>
            {isDesktopHero && (
                <style>{`
                    @keyframes fadeSlideIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
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
            )}

            {/* Background Image with Gradient Mask */}
            <div
                className={`absolute inset-0 z-0 bg-cover bg-center ${isDesktopHero ? 'opacity-35 blur-[2px] scale-110' : 'opacity-30'}`}
                style={
                    isDesktopHero
                        ? {
                            backgroundImage: `url(${import.meta.env.BASE_URL}about-hero-bg.webp)`,
                            maskImage: "linear-gradient(180deg, transparent, black 0%, black 70%, transparent)",
                            WebkitMaskImage: "linear-gradient(180deg, transparent, black 0%, black 70%, transparent)",
                        }
                        : {
                            backgroundImage: `url(${import.meta.env.BASE_URL}about-hero-bg.webp)`,
                            maskImage: "linear-gradient(180deg, transparent, black 0%, black 70%, transparent)",
                            WebkitMaskImage: "linear-gradient(180deg, transparent, black 0%, black 70%, transparent)",
                        }
                }
            />

            {/* Dark Gradient Overlay for Text Visibility */}
            <div className={`absolute inset-0 z-0 ${isDesktopHero ? 'bg-gradient-to-r from-black/90 via-black/50 to-transparent' : 'bg-gradient-to-r from-black/95 via-black/60 to-transparent'}`} />

            <div className={`relative z-10 mx-auto w-full ${showStatsCard ? 'max-w-[1500px] min-h-screen flex items-center' : 'max-w-[1200px]'} px-6 pt-24 pb-12 sm:px-8 md:pt-32 md:pb-20 lg:px-12`}>
                <div className={`${showStatsCard ? 'grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center w-full' : 'flex flex-col justify-center'} ${showStatsCard ? '' : 'pt-8'}`}>

                    <div className={`${showStatsCard ? 'lg:col-span-7' : ''} flex flex-col justify-center space-y-8 text-center lg:text-left items-center lg:items-start`}>

                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className={isDesktopHero ? 'animate-fade-in delay-100' : ''}
                        >
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md transition-colors hover:bg-white/10">
                                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                                    Dedicated to Excellence
                                    <Award className="w-3.5 h-3.5 text-yellow-400" />
                                </span>
                            </div>
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={`${showStatsCard ? 'text-4xl sm:text-6xl lg:text-7xl xl:text-8xl whitespace-nowrap' : 'text-3xl sm:text-5xl lg:text-6xl'} ${isDesktopHero ? 'animate-fade-in delay-200' : ''} font-bold tracking-tight leading-[1.1] sm:leading-tight pb-2`}
                        >
                            Who
                            <span className="mx-2" />
                            <span className="bg-gradient-to-br from-white via-white to-[#3b82f6] bg-clip-text text-transparent">
                                Are We
                            </span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className={`max-w-xl text-base sm:text-lg text-zinc-100 leading-relaxed font-semibold ${isDesktopHero ? 'animate-fade-in delay-300' : ''}`}
                        >
                            We are a team of dedicated professionals committed to delivering excellence in every project we undertake. From concept to completion, we ensure quality and precision.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className={`flex flex-col sm:flex-row gap-4 w-full sm:w-auto ${isDesktopHero ? 'animate-fade-in delay-400' : ''}`}
                        >
                            <div
                                onClick={() => setIsContactOpen(true)}
                                className="group cursor-pointer inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-zinc-950 transition-all hover:scale-[1.02] hover:bg-zinc-200 active:scale-[0.98]"
                            >
                                Start Your Project
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </div>

                            <button
                                onClick={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })}
                                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 hover:border-white/20"
                            >
                                <Users className="w-4 h-4 fill-current" />
                                Meet the Team
                            </button>
                        </motion.div>
                    </div>

                    {showStatsCard && (
                        <div className="lg:col-span-5 space-y-4 lg:mt-6" style={{ perspective: 1000 }} onMouseMove={onMouseMove} onMouseLeave={() => { x.set(0); y.set(0); }}>
                            <motion.div
                                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl ${isDesktopHero ? 'animate-fade-in delay-500' : ''}`}
                            >
                                <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />

                                <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                                            <Briefcase className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-3xl font-bold tracking-tight text-white">100+</div>
                                            <div className="text-sm text-zinc-400">Projects Managed</div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-8">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-zinc-400">Timely Completion</span>
                                            <span className="text-white font-medium">95%</span>
                                        </div>
                                        <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800/50">
                                            <div className="h-full w-[95%] rounded-full bg-gradient-to-r from-white to-blue-500" />
                                        </div>
                                    </div>

                                    <div className="h-px w-full bg-white/10 mb-6" />

                                    <div className="flex justify-between items-center text-center gap-2">
                                        <StatItem value="12+" label="Years" />
                                        <div className="w-px h-8 bg-white/10" />
                                        <StatItem value="50+" label="Experts" />
                                        <div className="w-px h-8 bg-white/10" />
                                        <StatItem value="100%" label="Commitment" />
                                    </div>

                                    <div className="mt-8 flex flex-wrap gap-2 justify-center sm:justify-start">
                                        <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wide text-zinc-300">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                            </span>
                                            HIRING
                                        </div>
                                        <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wide text-zinc-300">
                                            <CheckCircle className="w-3 h-3 text-blue-500" />
                                            QUALIFIED
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>
            {/* Contact Modal */}
            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </div>
    );
}
