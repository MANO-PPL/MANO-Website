import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function CareersHero() {
    return (
        <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background Image with Zoom Effect */}
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, ease: "easeOut" }}
                className="absolute inset-0 z-0"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${import.meta.env.BASE_URL}careers-hero.webp)`,
                    }}
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-black/70 to-black/80" />
            </motion.div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-20 flex flex-col items-center text-center">
                <div className="max-w-4xl flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Decorative Line & Badge */}
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="h-0.5 w-12 bg-blue-500" />
                            <span className="text-blue-400 font-bold tracking-widest uppercase text-sm">
                                Join Our Team
                            </span>
                            <div className="h-0.5 w-12 bg-blue-500" />
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-[1.1] sm:leading-tight">
                            Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">Future</span> <br />
                            With MANO
                        </h1>

                        <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
                            Join our team of engineering experts and help us shape the future of technical consulting.
                        </p>

                        {/* Scroll Indicator */}
                        <motion.button
                            onClick={() => document.getElementById('positions')?.scrollIntoView({ behavior: 'smooth' })}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex items-center gap-3 text-white font-medium border border-white/20 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all mx-auto"
                        >
                            View Open Positions
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center group-hover:translate-y-1 transition-transform">
                                <ArrowDown size={16} />
                            </div>
                        </motion.button>
                    </motion.div>
                </div>
            </div>

            {/* Decorative Blueprint/Grid Overlay */}
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-15"
                style={{
                    backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />
        </div>
    );
}
