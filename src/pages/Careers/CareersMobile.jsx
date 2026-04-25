
import React, { useState, useEffect } from 'react';
import {
    Users, TrendingUp, ShieldCheck, Award, Briefcase, MapPin,
    Clock, ChevronRight, ArrowRight, BookOpen, UserPlus, FileText,
    CheckCircle, Target, Zap, Layout, User, Sparkles, ArrowDown
} from 'lucide-react';
import RevealOnScroll from '../../components/RevealOnScroll';
import RainbowButton from '../../components/RainbowButton';

import jobData from '../../data/jobs.json';
import ResumeModal from '../../components/ResumeModal';

const CareersHeroMobile = () => {
    return (
        <section className="relative min-h-[62vh] w-full overflow-hidden flex items-center justify-center">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${import.meta.env.BASE_URL}careers-hero.webp)`,
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-black/70 to-black/80" />

            <div className="relative z-10 w-full px-4 py-7 text-center">
                <div className="max-w-md mx-auto">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="h-0.5 w-8 bg-blue-500" />
                        <span className="text-blue-400 font-bold tracking-[0.2em] uppercase text-[10px]">
                            Join Our Team
                        </span>
                        <div className="h-0.5 w-8 bg-blue-500" />
                    </div>

                    <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
                        Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">Future</span>
                        <br />
                        With MANO
                    </h1>

                    <p className="text-sm text-gray-300 leading-relaxed mb-6">
                        Join our team of engineering experts and help us shape the future of technical consulting.
                    </p>

                    <button
                        onClick={() => document.getElementById('positions')?.scrollIntoView({ behavior: 'smooth' })}
                        className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/10 transition-colors"
                    >
                        View Open Positions
                        <span className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                            <ArrowDown size={14} />
                        </span>
                    </button>
                </div>
            </div>

            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-15"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />
        </section>
    );
};

const CareersMobile = () => {
    const [openPosition, setOpenPosition] = useState(null);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState("");
    const [testimonialTouchStartX, setTestimonialTouchStartX] = useState(null);

    const handleApplyClick = (jobTitle = "") => {
        setSelectedJob(jobTitle);
        setIsResumeModalOpen(true);
    };

    // Filter out header rows (where title is "Position")
    const allPositions = jobData.filter(job => job.title !== "Position" && job.title);

    // Extract unique locations
    const locations = ['All', ...new Set(allPositions.map(job => job.details.Location || "Pan India"))];

    const [activeLocation, setActiveLocation] = useState('All');

    const filteredPositions = allPositions.filter(job => {
        if (activeLocation === 'All') return true;
        return (job.details.Location || "Pan India") === activeLocation;
    });

    const testimonials = [
        {
            name: "Priskilla Samuel",
            text: "It's been a great experience working here with a supportive team and positive work culture that encourages growth and quality delivery."
        },
        {
            name: "Surya Senthilkumar",
            text: "Working at MANO Projects has been a genuinely rewarding experience. The management team is supportive and approachable, encouraging open communication and teamwork at every level."
        },
        {
            name: "Chhatrapal Yadav",
            text: "Working here has been an incredible experience. The environment is highly supportive, and there is a genuine focus on professional growth and innovation."
        },
        {
            name: "Riya Jadhav",
            text: "The organization offers a professional work environment with valuable learning and development opportunities. Team collaboration is encouraged, and management supports employee growth."
        },
        {
            name: "Priyal Singh",
            text: "Working here has been a good experience. The team is supportive, and the work environment is comfortable."
        }
    ];

    const values = [
        { title: "12+ Years", subtitle: "Industry Leadership", icon: Award },
        { title: "Culture", subtitle: "Learning & Innovation", icon: BookOpen },
        { title: "Growth", subtitle: "Cross-Domain Opportunities", icon: TrendingUp },
        { title: "Clients", subtitle: "Top Developers & Corporates", icon: Briefcase },
    ];

    const culture = [
        {
            title: "Integrity & Responsibility",
            desc: "We maintain transparency, honesty, and professionalism in everything we do.",
            icon: ShieldCheck
        },
        {
            title: "Continuous Learning",
            desc: "Regular training, workshops, and knowledge-sharing sessions to help you grow.",
            icon: BookOpen
        },
        {
            title: "Collaborative Environment",
            desc: "Work with diverse teams across planning, QA/QC, execution, cost, contracts, and safety.",
            icon: Users
        },
        {
            title: "Performance-Driven Growth",
            desc: "We reward excellence, leadership, and consistent contributions.",
            icon: TrendingUp
        }
    ];

    useEffect(() => {
        const handleInteraction = () => {
            setIsLoaded(true);
            removeListeners();
        };

        const removeListeners = () => {
            window.removeEventListener('scroll', handleInteraction);
            window.removeEventListener('wheel', handleInteraction);
            window.removeEventListener('touchmove', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
        };

        window.addEventListener('scroll', handleInteraction);
        window.addEventListener('wheel', handleInteraction);
        window.addEventListener('touchmove', handleInteraction);
        window.addEventListener('keydown', handleInteraction);

        // Fallback timer
        const timer = setTimeout(() => {
            setIsLoaded(true);
            removeListeners();
        }, 1500);

        return () => {
            removeListeners();
            clearTimeout(timer);
        };
    }, []);

    const togglePosition = (index) => {
        setOpenPosition(openPosition === index ? null : index);
    };

    const goToNextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const goToPrevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleTestimonialTouchStart = (e) => {
        setTestimonialTouchStartX(e.touches[0].clientX);
    };

    const handleTestimonialTouchEnd = (e) => {
        if (testimonialTouchStartX === null) return;

        const deltaX = e.changedTouches[0].clientX - testimonialTouchStartX;
        const swipeThreshold = 40;

        if (Math.abs(deltaX) > swipeThreshold) {
            if (deltaX < 0) {
                goToNextTestimonial();
            } else {
                goToPrevTestimonial();
            }
        }

        setTestimonialTouchStartX(null);
    };

    return (
        <div className="min-h-screen bg-blue-pattern text-white font-sans selection:bg-blue-500/30 overflow-x-hidden overscroll-x-none">

            {/* 1. HERO SECTION */}
            <CareersHeroMobile />

            <div id="values-strip"></div>

            {isLoaded && (
                <>
                    {/* 2. WHY WORK WITH US - VALUE STRIP */}
                    <section className="py-10 sm:py-16 border-y border-white/5 bg-white/5 backdrop-blur-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
                                {values.map((item, index) => (
                                    <div key={index} className="flex flex-col items-center text-center group">
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-3 sm:mb-4 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                            <item.icon size={22} />
                                        </div>
                                        <h3 className="text-base sm:text-xl font-bold text-white mb-1">{item.title}</h3>
                                        <p className="text-[11px] sm:text-sm text-gray-400 uppercase tracking-wide">{item.subtitle}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* 3. OUR VALUES */}
                    <section className="py-12 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
                        <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
                        <div className="max-w-7xl mx-auto">
                            <RevealOnScroll>
                                <div className="text-center mb-8 sm:mb-20">
                                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">Why Join <span className="text-blue-500">Mano</span>?</h2>
                                    <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base px-4">We foster an environment where innovation meets precision, and every team member is empowered to grow.</p>
                                </div>
                            </RevealOnScroll>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                                {[
                                    { title: "Growth Mindset", desc: "Continuous learning and professional development are at our core.", icon: Target },
                                    { title: "Innovation first", desc: "Using cutting-edge technology and Digital ERPs to simplify construction.", icon: Sparkles },
                                    { title: "Team Culture", desc: "Collaborate with industry experts and dynamic young engineers.", icon: Users },
                                ].map((value, idx) => (
                                    <RevealOnScroll key={idx} className="h-full">
                                        <div className="p-5 sm:p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm hover:border-blue-500/30 transition-all group h-full animated-white-border">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 sm:mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:scale-110">
                                                <value.icon size={20} />
                                            </div>
                                            <h4 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{value.title}</h4>
                                            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{value.desc}</p>
                                        </div>
                                    </RevealOnScroll>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* 4. OUR WORK CULTURE */}
                    <section className="py-12 sm:py-24 px-4 sm:px-6 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full -z-10"></div>
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto">
                                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-8 sm:mb-16">Our Work Culture</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                                    {culture.map((item, index) => (
                                        <div key={index} className="group p-5 sm:p-8 rounded-2xl border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all shadow-lg backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 hover:to-blue-600/10 relative animated-white-border">
                                            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                                                <div className="p-3 sm:p-4 rounded-xl bg-white/5 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                                    <item.icon size={22} />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg sm:text-2xl font-bold text-white mb-2 sm:mb-3">{item.title}</h3>
                                                    <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{item.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </RevealOnScroll>
                    </section>

                    {/* 5. OPEN POSITIONS */}
                    <section id="positions" className="py-12 sm:py-24 px-4 sm:px-6 bg-white/[0.02]">
                        <div className="max-w-7xl mx-auto">
                            <RevealOnScroll>
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-16">
                                    <div>
                                        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">Open Positions</h2>
                                        <p className="text-gray-400 text-sm sm:text-base">Discover your next career move at Mano.</p>
                                    </div>
                                    {/* Filter Chips */}
                                    <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 no-scrollbar">
                                        {locations.map(loc => (
                                            <button
                                                key={loc}
                                                onClick={() => setActiveLocation(loc)}
                                                className={`px-4 py-1.5 rounded-full border text-xs sm:text-sm transition-all duration-300 whitespace-nowrap ${activeLocation === loc
                                                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20'
                                                    : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
                                                    }`}
                                            >
                                                {loc}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </RevealOnScroll>

                            <div className="space-y-3 sm:space-y-4 max-w-5xl mx-auto">
                                {filteredPositions.map((job, index) => (
                                    <div key={index} className="rounded-2xl border border-white/10 bg-black overflow-hidden transition-all duration-300 hover:border-blue-500/30 animated-white-border">
                                        <button
                                            onClick={() => togglePosition(index)}
                                            className="w-full flex items-center justify-between p-4 sm:p-6 md:p-8 text-left hover:bg-white/5 transition-colors"
                                        >
                                            <div>
                                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">{job.title}</h3>
                                                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                                                    <div className="flex items-center gap-1">
                                                        <MapPin size={14} className="text-blue-500" />
                                                        {job.details.Location || "Pan India"}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Briefcase size={14} className="text-blue-500" />
                                                        {job.details["Experience (Yrs)"] || "Experience N/A"}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center transition-transform duration-300 ${openPosition === index ? 'rotate-90 bg-blue-500 text-white' : 'text-gray-400'}`}>
                                                <ChevronRight size={18} />
                                            </div>
                                        </button>

                                        <div className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${openPosition === index ? 'max-h-[800px]' : 'max-h-0'}`}>
                                            <div className="p-4 sm:p-8 pt-0 border-t border-white/5">
                                                <h4 className="text-blue-400 font-semibold mb-4 mt-6 uppercase tracking-wider text-sm">Job Details</h4>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-8 text-sm sm:text-base">
                                                    {Object.entries(job.details).map(([key, value], idx) => (
                                                        <div key={idx} className="flex flex-col">
                                                            <span className="text-xs text-gray-500 uppercase tracking-wide mb-1">{key}</span>
                                                            <span className="text-gray-200 font-medium">{value}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <button
                                                    onClick={() => handleApplyClick(job.title)}
                                                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors flex items-center justify-center gap-2"
                                                >
                                                    Apply for this Role <ArrowRight size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* 6. LIFE AT MANO (Optional Culture) */}
                    <section className="py-12 sm:py-24 px-4 sm:px-6">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
                                <div className="relative group overflow-hidden rounded-2xl h-64 sm:h-80">
                                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&fit=crop" alt="Team Collaboration" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                                        <h3 className="text-xl font-bold text-white mb-2">Team Collaboration</h3>
                                        <p className="text-sm text-gray-300">Cross-functional teamwork drives our success.</p>
                                    </div>
                                </div>
                                <div className="relative group overflow-hidden rounded-2xl h-64 sm:h-80">
                                    <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&fit=crop" alt="Growth" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                                        <h3 className="text-xl font-bold text-white mb-2">Growth Opportunities</h3>
                                        <p className="text-sm text-gray-300">Continuous skill development and project exposure.</p>
                                    </div>
                                </div>
                                <div className="relative group overflow-hidden rounded-2xl h-64 sm:h-80">
                                    <img src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=800&fit=crop" alt="Recognition" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                                        <h3 className="text-xl font-bold text-white mb-2">Recognition & Rewards</h3>
                                        <p className="text-sm text-gray-300">We celebrate achievements and innovation.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 7. EMPLOYEE PERSPECTIVES (CAROUSEL) */}
                    <section className="py-12 sm:py-24 px-4 sm:px-6 bg-black text-center">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-20 bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-3 sm:pb-6">Employee Perspectives</h2>

                            {/* Outer Glass Container */}
                            <div
                                className="relative w-full border border-white/10 rounded-[1.5rem] sm:rounded-[2.5rem] bg-white/[0.03] backdrop-blur-md min-h-[300px] sm:min-h-[400px] flex flex-col justify-center px-3 sm:px-4 md:px-12 py-6 sm:py-12 md:py-16"
                                onTouchStart={handleTestimonialTouchStart}
                                onTouchEnd={handleTestimonialTouchEnd}
                            >
                                {/* Single Active Card (Swipe Left/Right) */}
                                <div className="w-full mx-auto bg-gradient-to-br from-white/10 to-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-8 text-left shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
                                    <div className="flex items-center gap-3 sm:gap-5 mb-4 sm:mb-6">
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-white/20 bg-white/5 flex items-center justify-center shrink-0">
                                            <User size={24} className="text-gray-300" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg sm:text-xl text-white">{testimonials[currentTestimonial].name}</h4>
                                        </div>
                                    </div>

                                    <p className="text-gray-200 leading-relaxed text-sm sm:text-base md:text-lg pl-1 min-h-[100px] sm:min-h-[120px]">
                                        {testimonials[currentTestimonial].text}
                                    </p>
                                </div>

                                {/* Dots */}
                                <div className="flex justify-center gap-2.5 mt-5 sm:mt-8">
                                    {testimonials.map((_, dotIndex) => (
                                        <button
                                            key={dotIndex}
                                            onClick={() => setCurrentTestimonial(dotIndex)}
                                            className={`transition-all duration-300 rounded-full border border-white/10 ${dotIndex === currentTestimonial
                                                ? 'w-5 h-2.5 bg-blue-500/80'
                                                : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/35'
                                                }`}
                                            aria-label={`Show testimonial ${dotIndex + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 8. CTA SECTION */}
                    <section className="py-14 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
                        <div className="absolute inset-0 bg-blue-900/10"></div>
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,1)_0%,rgba(20,20,50,0.5)_50%,rgba(0,0,0,1)_100%)]"></div>

                        <div className="max-w-4xl mx-auto text-center relative z-10">
                            <h2 className="text-2xl sm:text-5xl md:text-6xl font-bold text-white mb-5 sm:mb-6 leading-tight">
                                Take the Next Step in Your <br className="hidden sm:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Professional Journey.</span>
                            </h2>
                            <p className="text-sm sm:text-xl text-gray-400 mb-6 sm:mb-10 px-2 sm:px-4">
                                Become part of a team that values excellence, innovation, and integrity.
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6">
                                <div onClick={() => handleApplyClick("General Application")}>
                                    <RainbowButton className="w-full sm:w-auto" buttonClassName="px-4 py-2.5 sm:px-8 sm:py-4 text-sm sm:text-lg">
                                        <span className="flex items-center text-sm sm:text-lg font-semibold px-1 sm:px-4">
                                            Apply Today <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                                        </span>
                                    </RainbowButton>
                                </div>
                                <button
                                    onClick={() => document.getElementById('positions')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="w-full sm:w-auto px-4 py-2.5 sm:px-8 sm:py-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white font-semibold text-sm sm:text-lg flex items-center justify-center backdrop-blur-sm"
                                >
                                    View Open Positions <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </div>
                        </div>
                    </section>
                </>
            )}

            <ResumeModal
                isOpen={isResumeModalOpen}
                onClose={() => setIsResumeModalOpen(false)}
                jobRole={selectedJob}
            />
        </div>
    );
};

export default CareersMobile;
