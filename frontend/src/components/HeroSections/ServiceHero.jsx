import {
    ArrowRight,
    Target,
    Crown,
    Star
} from "lucide-react";


// --- SUB-COMPONENTS ---
const StatItem = ({ value, label }) => (
    <div className="flex flex-col items-center justify-center transition-transform hover:-translate-y-1 cursor-default">
        <span className="text-xl font-bold text-white sm:text-2xl">{value}</span>
        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium sm:text-xs">{label}</span>
    </div>
);

// --- MAIN COMPONENT ---
export default function ServiceHero({ compactMobile = false }) {
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
        .animate-marquee {
          animation: marquee 40s linear infinite; /* Slower for readability */
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>

            {/* Background Image with Gradient Mask */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-35 blur-[2px] scale-110"
                style={{
                    backgroundImage: `url(${import.meta.env.BASE_URL}services-hero.webp)`,
                    maskImage: "linear-gradient(180deg, transparent, black 0%, black 70%, transparent)",
                    WebkitMaskImage: "linear-gradient(180deg, transparent, black 0%, black 70%, transparent)",
                }}
            />

            {/* Dark Gradient Overlay for Text Visibility */}
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

            <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 pt-24 pb-12 sm:px-8 md:pt-32 md:pb-20 lg:px-12">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">

                    {/* --- LEFT COLUMN --- */}
                    <div className="lg:col-span-7 flex flex-col justify-center space-y-8 pt-8">

                        {/* Badge */}
                        <div className="animate-fade-in delay-100">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md transition-colors hover:bg-white/10">
                                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                                    Premium Construction Services
                                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                                </span>
                            </div>
                        </div>

                        {/* Heading */}
                        <h1
                            className={`animate-fade-in delay-200 font-bold tracking-tight leading-tight pb-2 ${compactMobile ? 'text-3xl sm:text-6xl lg:text-7xl xl:text-8xl' : 'text-5xl sm:text-6xl lg:text-7xl xl:text-8xl'}`}
                        >
                            Building<br />
                            <span className="bg-gradient-to-br from-white via-white to-[#3b82f6] bg-clip-text text-transparent">
                                Excellence
                            </span><br />
                            Through Precision
                        </h1>

                        <p className={`animate-fade-in delay-300 max-w-xl text-zinc-100 leading-relaxed font-semibold ${compactMobile ? 'text-sm sm:text-lg' : 'text-lg'}`}>
                            At MANO Project Consultants, we provide end-to-end consulting solutions that help organizations plan smarter, execute faster, and maintain uncompromising quality.
                        </p>

                        {/* CTA Buttons */}
                        <div className="animate-fade-in delay-400 flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => document.getElementById('core-services')?.scrollIntoView({ behavior: 'smooth' })}
                                className={`group inline-flex items-center justify-center gap-2 rounded-full bg-white font-semibold text-zinc-950 transition-all hover:scale-[1.02] hover:bg-zinc-200 active:scale-[0.98] ${compactMobile ? 'px-5 py-2.5 text-xs sm:text-sm' : 'px-8 py-4 text-sm'}`}
                            >
                                Explore Services
                                <ArrowRight className={`transition-transform group-hover:translate-x-1 ${compactMobile ? 'w-3.5 h-3.5 sm:w-4 sm:h-4' : 'w-4 h-4'}`} />
                            </button>

                        </div>
                    </div>

                    {/* --- RIGHT COLUMN --- */}
                    <div className={`lg:col-span-5 lg:mt-6 ${compactMobile ? 'space-y-3 max-w-sm mx-auto w-full' : 'space-y-4'}`}>

                        {/* Stats Card */}
                        <div className={`animate-fade-in delay-500 relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl ${compactMobile ? 'rounded-2xl p-5' : 'rounded-3xl p-8'}`}>
                            {/* Card Glow Effect */}
                            <div className={`absolute top-0 right-0 rounded-full bg-white/5 blur-3xl pointer-events-none ${compactMobile ? '-mr-12 -mt-12 h-44 w-44' : '-mr-16 -mt-16 h-64 w-64'}`} />

                            <div className="relative z-10">
                                <div className={`flex items-center ${compactMobile ? 'gap-3 mb-5' : 'gap-4 mb-8'}`}>
                                    <div className={`flex items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 ${compactMobile ? 'h-10 w-10' : 'h-12 w-12'}`}>
                                        <Target className={`text-white ${compactMobile ? 'h-5 w-5' : 'h-6 w-6'}`} />
                                    </div>
                                    <div>
                                        <div className={`font-bold tracking-tight text-white ${compactMobile ? 'text-2xl' : 'text-3xl'}`}>500+</div>
                                        <div className={`text-zinc-400 ${compactMobile ? 'text-xs' : 'text-sm'}`}>Clients Served</div>
                                    </div>
                                </div>

                                {/* Progress Bar Section */}
                                <div className={`space-y-3 ${compactMobile ? 'mb-5' : 'mb-8'}`}>
                                    <div className={`flex justify-between ${compactMobile ? 'text-xs' : 'text-sm'}`}>
                                        <span className="text-zinc-400">Client Satisfaction</span>
                                        <span className="text-white font-medium">98%</span>
                                    </div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800/50">
                                        <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-white to-blue-500" />
                                    </div>
                                </div>

                                <div className={`h-px w-full bg-white/10 ${compactMobile ? 'mb-4' : 'mb-6'}`} />

                                {/* Mini Stats Grid */}
                                <div className={`grid grid-cols-3 text-center ${compactMobile ? 'gap-3' : 'gap-4'}`}>
                                    <StatItem value="12+" label="Years" />
                                    <div className="w-px h-full bg-white/10 mx-auto" />
                                    <StatItem value="24/7" label="Support" />
                                    <div className="w-px h-full bg-white/10 mx-auto" />
                                    <StatItem value="100%" label="Quality" />
                                </div>

                                {/* Tag Pills */}
                                <div className={`flex flex-wrap gap-2 ${compactMobile ? 'mt-5' : 'mt-8'}`}>
                                    <div className={`inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 font-medium tracking-wide text-zinc-300 ${compactMobile ? 'px-2.5 py-1 text-[9px]' : 'px-3 py-1 text-[10px]'}`}>
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        ACTIVE
                                    </div>
                                    <div className={`inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 font-medium tracking-wide text-zinc-300 ${compactMobile ? 'px-2.5 py-1 text-[9px]' : 'px-3 py-1 text-[10px]'}`}>
                                        <Crown className={`${compactMobile ? 'w-2.5 h-2.5' : 'w-3 h-3'} text-yellow-500`} />
                                        PREMIUM
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}
