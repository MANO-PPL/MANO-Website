
import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    CheckCircle, ArrowRight, ChevronRight, Layout, Award, ArrowDown
} from 'lucide-react';
import RevealOnScroll from '../../components/RevealOnScroll';
import RainbowButton from '../../components/RainbowButton';
import ContactModal from '../../components/ContactModal';
import LazyBgDiv from '../../components/LazyBgDiv';
import { useNavigate } from 'react-router-dom';
import { useCompany } from '../../context/CompanyContext';
import { PROJECTS_API_URL } from '../../config';

const ProjectsHeroMobile = () => {
    return (
        <section className="relative min-h-[62vh] w-full overflow-hidden flex items-center justify-center">
            <motion.div
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 8, ease: 'easeOut' }}
                className="absolute inset-0 z-0"
            >
                <LazyBgDiv
                    className="absolute inset-0 bg-cover bg-center"
                    src={`${import.meta.env.BASE_URL}projects-hero.webp`}
                    eager
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/75 to-black/90" />
            </motion.div>

            <div className="relative z-10 w-full px-4 py-7 text-center">
                <div className="max-w-md mx-auto">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="h-0.5 w-8 bg-blue-500" />
                        <span className="text-blue-400 font-bold tracking-[0.2em] uppercase text-[10px]">
                            Our Portfolio
                        </span>
                        <div className="h-0.5 w-8 bg-blue-500" />
                    </div>

                    <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
                        Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">Legacies</span>
                        <br />
                        Across Horizons
                    </h1>

                    <p className="text-sm text-gray-300 leading-relaxed mb-6">
                        Showcasing our precision-engineered projects across residential, commercial, and industrial landscapes.
                    </p>

                    <button
                        onClick={() => document.getElementById('featured-projects')?.scrollIntoView({ behavior: 'smooth' })}
                        className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/10 transition-colors"
                    >
                        View Projects
                        <span className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                            <ArrowDown size={14} />
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
};

const ImageSlider = ({ images, title }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [direction, setDirection] = React.useState(0); // -1 for left, 1 for right
    const touchStartX = React.useRef(null);
    const containerRef = React.useRef(null);
    const [isVisible, setIsVisible] = React.useState(false);

    const goToNext = React.useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const goToPrev = React.useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    React.useEffect(() => {
        if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
            setIsVisible(true);
            return;
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.05 }
        );
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }
        return () => observer.disconnect();
    }, []);

    // Independent smooth auto-scroll interval
    React.useEffect(() => {
        if (!images || images.length <= 1 || !isVisible) return;
        const interval = setInterval(() => {
            goToNext();
        }, 4000);
        return () => clearInterval(interval);
    }, [images, isVisible, goToNext]);

    const nextSlide = (e) => {
        e.stopPropagation();
        goToNext();
    };

    const prevSlide = (e) => {
        e.stopPropagation();
        goToPrev();
    };

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        if (touchStartX.current === null || images.length <= 1) return;
        const deltaX = e.changedTouches[0].clientX - touchStartX.current;
        const swipeThreshold = 40;

        if (Math.abs(deltaX) > swipeThreshold) {
            if (deltaX < 0) {
                goToNext();
            } else {
                goToPrev();
            }
        }

        touchStartX.current = null;
    };

    if (!images || images.length === 0) return null;

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0
        })
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full group overflow-hidden bg-black"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`${title} - View ${currentIndex + 1}`}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "tween", duration: 0.6, ease: "easeInOut" },
                        opacity: { duration: 0.4 }
                    }}
                    className="absolute inset-0 w-full h-full object-cover"
                    decoding="async"
                />
            </AnimatePresence>

            {images.length > 1 && (
                <>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-300 z-10" />

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 z-20"
                        aria-label="Previous image"
                    >
                        <ChevronRight className="w-6 h-6 rotate-180" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 z-20"
                        aria-label="Next image"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        {images.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-2 h-2 rounded-full transition-all border border-white/30 ${idx === currentIndex ? 'bg-blue-500 w-6' : 'bg-white/50'}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

const ProjectsMobile = () => {
    const navigate = useNavigate();
    const { brand, isEPC } = useCompany();
    const [activeCategory, setActiveCategory] = useState("All");
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch from API
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch(PROJECTS_API_URL);
                const data = await res.json();
                if (res.ok && data.ok) {
                    setProjects(data.data || []);
                }
            } catch (err) {
                console.error('Failed to fetch projects:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    // Derive featured and category lists from API data
    const featuredProjects = projects.filter(p => p.featured);
    const categoryProjects = projects;

    // Parse scope into array for backward compat with JSX
    const parseScope = (scope) => {
        if (!scope) return [];
        if (Array.isArray(scope)) return scope;
        return [scope];
    };

    const categories = ["All", ...new Set(projects.map(p => p.category).filter(Boolean))];

    return (
        <div className="min-h-screen bg-blue-pattern text-white font-sans selection:bg-blue-500/30">

            {/* HERO SECTION */}
            <ProjectsHeroMobile />

            <div id="featured-projects"></div>

            {/* 2. FEATURED PROJECTS SHOWCASE */}
            <section id="featured-projects" className="py-16 sm:py-24 px-6 relative overflow-hidden">
                <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <div className="mb-8 sm:mb-20">
                            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Featured Masterpieces</h2>
                            <p className="text-gray-400 max-w-2xl text-sm sm:text-base">A selection of our most complex and successfully delivered projects.</p>
                        </div>
                    </RevealOnScroll>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-3">
                            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                            <p className="text-gray-500 text-xs">Loading projects...</p>
                        </div>
                    ) : (
                        <div className="space-y-10 sm:space-y-32">
                            {featuredProjects.map((project, index) => (
                                <RevealOnScroll key={index}>
                                    <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-5 sm:gap-16 items-center`}>
                                        <div className="w-full lg:w-1/2 group">
                                            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-[1.3rem] sm:rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl animated-white-border">
                                                {project.images && project.images.length > 0 ? (
                                                    <ImageSlider images={project.images} title={project.title} />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-900 flex items-center justify-center"><Layout className="text-gray-700 w-12 h-12" /></div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-1/2 space-y-4 sm:space-y-8">
                                            <div className="inline-flex px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-semibold">
                                                {project.location}
                                            </div>
                                            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">{project.title}</h3>
                                            <div className="space-y-3">
                                                <div className="flex items-start gap-3">
                                                    <div className="p-1.5 rounded-lg bg-white/5 text-blue-400"><Layout size={18} /></div>
                                                    <div>
                                                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Scope of Work</div>
                                                        <div className="text-gray-300 font-medium text-sm sm:text-base">{parseScope(project.scope).join(", ") || project.scope}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <div className="p-1.5 rounded-lg bg-white/5 text-blue-400"><Award size={18} /></div>
                                                    <div>
                                                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Impact</div>
                                                        <div className="text-gray-300 font-medium text-sm sm:text-base">{project.highlight}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </RevealOnScroll>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* 3. CATEGORIZED PROJECT GRID */}
            <section className="py-12 sm:py-24 px-4 sm:px-6 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <div className="text-center mb-8 sm:mb-16">
                            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Our Diverse Portfolio</h2>
                            <p className="text-gray-400 text-sm sm:text-base">Explore our work across different sectors.</p>
                        </div>
                    </RevealOnScroll>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-16 overflow-x-auto pb-2 no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-1.5 rounded-full border transition-all duration-300 whitespace-nowrap text-xs sm:text-base ${activeCategory === cat
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/30'
                                    : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Projects Grid */}
                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => <div key={i} className="rounded-2xl bg-[#0a0a0a] border border-white/5 h-64 animate-pulse" />)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-8">
                            {categoryProjects
                                .filter(p => activeCategory === "All" || p.category === activeCategory)
                                .map((project, index) => (
                                    <div key={index} className="group p-4 sm:p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1 animated-white-border">
                                            <div className="relative h-52 sm:h-64 rounded-xl overflow-hidden mb-4 sm:mb-6">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                                            {project.images?.length > 0 ? (
                                                <img
                                                    src={project.images[0]}
                                                    alt={project.title}
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-900 flex items-center justify-center"><Layout className="text-gray-700 w-12 h-12" /></div>
                                            )}
                                            <span className="absolute top-3 right-3 px-2.5 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-bold text-white border border-white/10">
                                                {project.category}
                                            </span>
                                        </div>

                                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-blue-400 transition-colors">
                                            {project.title}
                                        </h3>

                                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                                            {parseScope(project.scope).map((item, idx) => (
                                                <div key={idx} className="flex items-center text-[11px] sm:text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">
                                                    <CheckCircle size={10} className="text-blue-500 mr-1" />
                                                    {item}
                                                </div>
                                            ))}
                                        </div>

                                        <p className="text-sm text-gray-400 italic">
                                            "{project.highlight}"
                                        </p>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </section>

            {/* 4. PROJECTS SUMMARY STRIP */}


            {/* 5. CTA SECTION */}
            <section className="py-14 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/10"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,1)_0%,rgba(20,20,50,0.5)_50%,rgba(0,0,0,1)_100%)]"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-2xl sm:text-5xl md:text-6xl font-bold text-white mb-6 sm:mb-10 leading-tight">
                        Build Your Project With a <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Trusted Partner.</span>
                    </h2>

                    <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-2.5 sm:gap-6">
                        <div className="w-full sm:w-auto" onClick={() => setIsContactOpen(true)}>
                            <RainbowButton className="w-full sm:w-auto" buttonClassName="h-11 sm:h-auto px-4 sm:px-8 py-2 sm:py-4 text-sm sm:text-lg">
                                <span className="flex items-center justify-center text-sm sm:text-lg font-semibold">
                                    Start Your Project <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                                </span>
                            </RainbowButton>
                        </div>
                        <button
                            onClick={() => navigate(`/${brand.toLowerCase()}${isEPC ? '/services/epc' : '/services'}`)}
                            className="w-full sm:w-auto h-12 sm:h-auto px-4 sm:px-8 py-2 sm:py-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white font-semibold text-sm sm:text-lg flex items-center justify-center backdrop-blur-sm"
                        >
                            View More Services <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </div>
                </div>
            </section>

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </div >
    );
};

export default ProjectsMobile;
