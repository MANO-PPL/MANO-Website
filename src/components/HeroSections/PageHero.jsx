import React from "react";
import LazyBgDiv from "../LazyBgDiv";
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    Play,
    Target,
    Crown,
    Star,
} from "lucide-react";


// --- SUB-COMPONENTS ---
const StatItem = ({ value, label }) => (
    <div className="flex flex-col items-center justify-center transition-transform hover:-translate-y-1 cursor-default">
        <span className="text-xl font-bold text-white sm:text-2xl">{value}</span>
        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium sm:text-xs">{label}</span>
    </div>
);

// --- MAIN COMPONENT ---
export default function PageHero({
    title,
    subtitle,
    description,
    bgImage,
    images,
    layout = "grid", // 'grid' | 'split'
    scrollTargetId = "content",
    stats = {
        mainValue: "500+",
        mainLabel: "Clients Served",
        satisfaction: "98%",
        grid: [
            { value: "12+", label: "Years" },
            { value: "24/7", label: "Support" },
            { value: "100%", label: "Quality" }
        ]
    },
    badgeText = "Premium Construction Services",
    showCards = false,
    showContactButton = true,
    headingClassName = ""
}) {
    return (
        <div className="relative w-full min-h-screen flex flex-col justify-center text-white overflow-hidden font-sans">
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

            {/* Background Image(s) */}
            <div
                className="absolute inset-0 z-0 opacity-100 blur-[2px] scale-110"
                style={{
                    maskImage: "none",
                    WebkitMaskImage: "none",
                }}
            >
                {(images && images.length > 1) ? (
                    <div className="h-full w-full">
                        {layout === 'split' ? (
                            <div className="grid h-full w-full grid-cols-2 gap-1">
                                {/* Left Large Image */}
                                <LazyBgDiv
                                    className="h-full w-full bg-cover bg-center"
                                    src={images[0]}
                                />
                                {/* Right Stacked Images */}
                                <div className="grid grid-rows-2 gap-1 h-full">
                                    {images.slice(1, 3).map((img, index) => (
                                        <LazyBgDiv
                                            key={index}
                                            className="h-full w-full bg-cover bg-center"
                                            src={img}
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : layout === 'horizontal-split' ? (
                            <div className="grid h-full w-full grid-rows-2 gap-1">
                                {/* Top Large Image */}
                                <LazyBgDiv
                                    className="h-full w-full bg-cover bg-center"
                                    src={images[0]}
                                />
                                {/* Bottom Split Images */}
                                <div className="grid grid-cols-2 gap-1 h-full">
                                    {images.slice(1, 3).map((img, index) => (
                                        <LazyBgDiv
                                            key={index}
                                            className="h-full w-full bg-cover bg-center rounded-2xl border border-white/10 shadow-lg hover:scale-[1.02] transition-transform duration-500"
                                            src={img}
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : layout === 'quad-grid' ? (
                            <div className="grid h-full w-full grid-cols-2 gap-2 p-2">
                                {images.slice(0, 4).map((img, index) => (
                                    <LazyBgDiv
                                        key={index}
                                        className="h-full w-full bg-cover bg-center rounded-2xl border border-white/10 shadow-lg hover:scale-[1.02] transition-transform duration-500"
                                        src={img}
                                    />
                                ))}
                            </div>
                        ) : layout === 'masonry-3' ? (
                            <div className="grid h-full w-full grid-cols-12 gap-4 p-4">
                                {/* Left Vertical - 5 cols */}
                                <LazyBgDiv
                                    className="col-span-12 lg:col-span-5 h-[40vh] lg:h-full w-full bg-cover bg-center rounded-3xl border border-white/10 shadow-2xl"
                                    src={images[0]}
                                />
                                {/* Right Stack - 7 cols */}
                                <div className="col-span-12 lg:col-span-7 grid grid-rows-2 gap-4 h-[40vh] lg:h-full">
                                    <LazyBgDiv
                                        className="h-full w-full bg-cover bg-center rounded-3xl border border-white/10 shadow-xl"
                                        src={images[1]}
                                    />
                                    <LazyBgDiv
                                        className="h-full w-full bg-cover bg-center rounded-3xl border border-white/10 shadow-xl"
                                        src={images[2]}
                                    />
                                </div>
                            </div>
                        ) : layout === 'masonry-reverse-3' ? (
                            <div className="grid h-full w-full grid-cols-12 gap-4 p-4">
                                {/* Left Stack - 5 cols */}
                                <div className="col-span-12 lg:col-span-5 grid grid-rows-2 gap-4 h-[40vh] lg:h-full">
                                    <LazyBgDiv
                                        className="h-full w-full bg-cover bg-center rounded-3xl border border-white/10 shadow-xl"
                                        src={images[0]}
                                    />
                                    <LazyBgDiv
                                        className="h-full w-full bg-cover bg-center rounded-3xl border border-white/10 shadow-xl"
                                        src={images[1]}
                                    />
                                </div>
                                {/* Right Large Vertical - 7 cols */}
                                <LazyBgDiv
                                    className="col-span-12 lg:col-span-7 h-[40vh] lg:h-full w-full bg-cover bg-center rounded-3xl border border-white/10 shadow-2xl"
                                    src={images[2]}
                                />
                            </div>
                        ) : layout === 'mosaic-5' ? (
                            <div className="grid h-full w-full grid-cols-12 gap-2 p-2 relative">
                                {/* 1. Main Large (Left) - Spans 6 cols, 2 rows */}
                                <LazyBgDiv
                                    className="col-span-12 lg:col-span-6 row-span-2 h-[50vh] lg:h-full w-full bg-cover bg-center rounded-2xl border border-white/10"
                                    src={images[0]}
                                />

                                {/* 2. Top Middle - Spans 3 cols */}
                                <LazyBgDiv
                                    className="col-span-6 lg:col-span-3 h-[25vh] lg:h-full w-full bg-cover bg-center rounded-2xl border border-white/10"
                                    src={images[1]}
                                />

                                {/* 3. Top Right - Spans 3 cols */}
                                <LazyBgDiv
                                    className="col-span-6 lg:col-span-3 h-[25vh] lg:h-full w-full bg-cover bg-center rounded-2xl border border-white/10"
                                    src={images[2]}
                                />

                                {/* 4. Bottom Middle - Spans 3 cols */}
                                <LazyBgDiv
                                    className="col-span-6 lg:col-span-3 h-[25vh] lg:h-full w-full bg-cover bg-center rounded-2xl border border-white/10"
                                    src={images[3]}
                                />

                                {/* 5. Bottom Right - Spans 3 cols */}
                                <LazyBgDiv
                                    className="col-span-6 lg:col-span-3 h-[25vh] lg:h-full w-full bg-cover bg-center rounded-2xl border border-white/10"
                                    src={images[4]}
                                />
                            </div>
                        ) : layout === 'diagonal-4' ? (
                            <div className="grid h-full w-full grid-cols-12 gap-1 relative">
                                {/* Col 1 */}
                                <div className="col-span-6 grid grid-rows-4 gap-1 h-full">
                                    {/* Tall Top (3/4) */}
                                    <LazyBgDiv
                                        className="row-span-3 w-full h-full bg-cover bg-center rounded-xl border border-white/5 shadow-xl"
                                        src={images[0]}
                                    />
                                    {/* Short Bottom (1/4) */}
                                    <LazyBgDiv
                                        className="row-span-1 w-full h-full bg-cover bg-center rounded-xl border border-white/5 shadow-xl"
                                        src={images[1]}
                                    />
                                </div>
                                {/* Col 2 */}
                                <div className="col-span-6 grid grid-rows-4 gap-1 h-full">
                                    {/* Short Top (1/4) */}
                                    <LazyBgDiv
                                        className="row-span-1 w-full h-full bg-cover bg-center rounded-xl border border-white/5 shadow-xl"
                                        src={images[2]}
                                    />
                                    {/* Tall Bottom (3/4) */}
                                    <LazyBgDiv
                                        className="row-span-3 w-full h-full bg-cover bg-center rounded-xl border border-white/5 shadow-xl"
                                        src={images[3]}
                                    />
                                </div>
                            </div>
                        ) : layout === 'mosaic-6' ? (
                            <div className="grid h-full w-full grid-cols-12 gap-1 relative">
                                {/* Left Column - 2 Large Stacked */}
                                <div className="col-span-4 grid grid-rows-2 gap-1 h-full">
                                    <LazyBgDiv src={images[0]} className="bg-cover bg-center rounded-xl border border-white/5" />
                                    <LazyBgDiv src={images[1]} className="bg-cover bg-center rounded-xl border border-white/5" />
                                </div>
                                {/* Middle Column - 1 Large Vertical */}
                                <LazyBgDiv src={images[2]} className="col-span-4 bg-cover bg-center rounded-xl border border-white/5" />
                                {/* Right Column - 3 Small Stacked */}
                                <div className="col-span-4 grid grid-rows-3 gap-1 h-full">
                                    <LazyBgDiv src={images[3]} className="bg-cover bg-center rounded-xl border border-white/5" />
                                    <LazyBgDiv src={images[4]} className="bg-cover bg-center rounded-xl border border-white/5" />
                                    <LazyBgDiv src={images[5]} className="bg-cover bg-center rounded-xl border border-white/5" />
                                </div>
                            </div>
                        ) : layout === 'split-reverse' ? (
                            <div className="grid h-full w-full grid-cols-2 gap-1">
                                {/* Left Stacked Images */}
                                <div className="grid grid-rows-2 gap-1 h-full">
                                    {images.slice(1, 3).map((img, index) => (
                                        <LazyBgDiv
                                            key={index}
                                            className="h-full w-full bg-cover bg-center"
                                            src={img}
                                        />
                                    ))}
                                </div>
                                {/* Right Large Image */}
                                <LazyBgDiv
                                    className="h-full w-full bg-cover bg-center"
                                    src={images[0]}
                                />
                            </div>
                        ) : layout === 'bento-5' ? (
                            <div className="grid h-full w-full grid-cols-10 gap-0.5 relative">
                                {/* Large Left - 6/10 width */}
                                <LazyBgDiv
                                    className="col-span-6 h-full bg-cover bg-center border border-white/5"
                                    src={images[0]}
                                />
                                {/* Right 2x2 Grid - 4/10 width */}
                                <div className="col-span-4 h-full grid grid-cols-2 grid-rows-2 gap-0.5">
                                    <LazyBgDiv src={images[1]} className="bg-cover bg-center border border-white/5" />
                                    <LazyBgDiv src={images[2]} className="bg-cover bg-center border border-white/5" />
                                    <LazyBgDiv src={images[3]} className="bg-cover bg-center border border-white/5" />
                                    <LazyBgDiv src={images[4]} className="bg-cover bg-center border border-white/5" />
                                </div>
                            </div>
                        ) : layout === 'dense-collage' ? (
                            <div className="grid h-full w-full grid-cols-6 grid-rows-2 gap-0.5 relative">
                                {images.slice(0, 12).map((img, index) => (
                                    <LazyBgDiv
                                        key={index}
                                        className="h-full w-full bg-cover bg-center border border-white/5"
                                        src={img}
                                    />
                                ))}
                            </div>
                        ) : layout === 'collage-4' ? (
                            <div className="grid h-full w-full grid-cols-12 gap-0.5 relative">
                                {/* Left Main - Covers text area */}
                                <LazyBgDiv
                                    className="col-span-7 h-full bg-cover bg-center border border-white/5"
                                    src={images[0]}
                                />
                                {/* Right Side - Mixed Grid */}
                                <div className="col-span-5 grid grid-rows-2 gap-0.5 h-full">
                                    <LazyBgDiv
                                        className="w-full h-full bg-cover bg-center border border-white/5"
                                        src={images[1]}
                                    />
                                    <div className="grid grid-cols-2 gap-0.5 h-full">
                                        <LazyBgDiv
                                            className="w-full h-full bg-cover bg-center border border-white/5"
                                            src={images[2]}
                                        />
                                        <LazyBgDiv
                                            className="w-full h-full bg-cover bg-center border border-white/5"
                                            src={images[3]}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Default Grid Layout
                            <div className={`grid h-full w-full gap-1 ${images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                                {images.map((img, index) => (
                                    <LazyBgDiv
                                        key={index}
                                        className="h-full w-full bg-cover bg-center"
                                        src={img}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <LazyBgDiv
                        className="h-full w-full bg-cover bg-center"
                        src={images && images.length > 0 ? images[0] : bgImage}
                    />
                )}
            </div>

            {/* Dark Gradient Overlay for Text Visibility - Adjusted for visibility */}
            <div className={`absolute inset-0 z-0 ${layout === 'minimal-centered' ? 'bg-black/60' : 'bg-gradient-to-r from-black/60 via-black/40 to-transparent'}`} />

            <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 pt-24 pb-12 sm:px-8 md:pt-32 md:pb-20 lg:px-12">
                {layout === 'minimal-centered' ? (
                    <div className="flex flex-col items-center text-center justify-center max-w-4xl mx-auto pt-12 pb-12">
                        {/* Centered Badge */}
                        <div className="animate-fade-in delay-100 mb-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md transition-colors hover:bg-white/10">
                                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                                    {badgeText}
                                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                                </span>
                            </div>
                        </div>

                        {/* Centered Heading */}
                        <h1
                            className="animate-fade-in delay-200 text-4xl sm:text-6xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-[1.1] pb-6 sm:pb-8"
                        >
                            {title}
                            <span className="bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent ml-3 block sm:inline">
                                {subtitle}
                            </span>
                        </h1>

                        {/* Centered Description */}
                        <p className="animate-fade-in delay-300 max-w-2xl text-lg sm:text-xl md:text-2xl text-zinc-200 leading-relaxed font-medium mb-10">
                            {description}
                        </p>

                        {/* Centered CTA Buttons */}
                        <div className="animate-fade-in delay-400 flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: 'smooth' })}
                                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-zinc-950 transition-all hover:scale-[1.05] hover:bg-zinc-200 active:scale-[0.98]"
                            >
                                Learn More
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </button>

                            {showContactButton && (
                                <Link to="/contact" className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 hover:border-white/20">
                                    <Play className="w-4 h-4 fill-current" />
                                    Get in Touch
                                </Link>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-start">
                        {/* --- LEFT COLUMN --- */}
                        <div className="lg:col-span-8 flex flex-col justify-center space-y-8 pt-8">

                            {/* Badge */}
                            <div className="animate-fade-in delay-100">
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md transition-colors hover:bg-white/10">
                                    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                                        {badgeText}
                                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                                    </span>
                                </div>
                            </div>

                            {/* Heading */}
                            <h1
                                className={`animate-fade-in delay-200 text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-bold tracking-tighter leading-[1.0] pb-4 ${headingClassName}`}
                            >
                                <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                                    {title}
                                </span>
                                {subtitle && (
                                    <>
                                        <br />
                                        <span className="bg-gradient-to-br from-white via-white to-[#3b82f6] bg-clip-text text-transparent">
                                            {subtitle}
                                        </span>
                                    </>
                                )}
                            </h1>

                            {/* Description */}
                            <p className="animate-fade-in delay-300 max-w-2xl text-base sm:text-lg md:text-xl text-zinc-100 leading-relaxed font-semibold">
                                {description}
                            </p>

                            {/* CTA Buttons */}
                            <div className="animate-fade-in delay-400 flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: 'smooth' })}
                                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-zinc-950 transition-all hover:scale-[1.02] hover:bg-zinc-200 active:scale-[0.98]"
                                >
                                    Learn More
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </button>

                                {showContactButton && (
                                    <Link to="/contact" className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 hover:border-white/20">
                                        <Play className="w-4 h-4 fill-current" />
                                        Get in Touch
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* --- RIGHT COLUMN --- */}
                        <div className="lg:col-span-4 space-y-4 lg:mt-6">
                            {showCards && (
                                <div className="animate-fade-in delay-500 relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">
                                    {/* Card Glow Effect */}
                                    <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                                                <Target className="h-6 w-6 text-white" />
                                            </div>
                                            <div>
                                                <div className="text-3xl font-bold tracking-tight text-white">{stats.mainValue}</div>
                                                <div className="text-sm text-zinc-400">{stats.mainLabel}</div>
                                            </div>
                                        </div>

                                        {/* Progress Bar Section */}
                                        <div className="space-y-3 mb-8">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-zinc-400">Client Satisfaction</span>
                                                <span className="text-white font-medium">{stats.satisfaction}</span>
                                            </div>
                                            <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800/50">
                                                <div className="h-full w-[95%] rounded-full bg-gradient-to-r from-white to-blue-500" />
                                            </div>
                                        </div>

                                        <div className="h-px w-full bg-white/10 mb-6" />

                                        {/* Mini Stats Grid */}
                                        <div className="grid grid-cols-3 gap-4 text-center">
                                            {stats.grid.map((stat, idx) => (
                                                <React.Fragment key={idx}>
                                                    <StatItem value={stat.value} label={stat.label} />
                                                    {idx < 2 && <div className="w-px h-full bg-white/10 mx-auto" />}
                                                </React.Fragment>
                                            ))}
                                        </div>

                                        {/* Tag Pills */}
                                        <div className="mt-8 flex flex-wrap gap-2">
                                            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wide text-zinc-300">
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                                </span>
                                                ACTIVE
                                            </div>
                                            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wide text-zinc-300">
                                                <Crown className="w-3 h-3 text-yellow-500" />
                                                PREMIUM
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
