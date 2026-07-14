
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Layout, Award, ChevronRight, ArrowRight, CheckCircle
} from 'lucide-react';
import RevealOnScroll from '../../components/RevealOnScroll';
import RainbowButton from '../../components/RainbowButton';
import ProjectsHero from '../../components/HeroSections/ProjectsHero';
import ContactModal from '../../components/ContactModal';
import { useNavigate } from 'react-router-dom';
import { useCompany } from '../../context/CompanyContext';
import { PROJECTS_API_URL } from '../../config';

const ImageSlider = ({ images, title }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [direction, setDirection] = React.useState(0);
    const containerRef = React.useRef(null);
    const [isVisible, setIsVisible] = React.useState(false);

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

    React.useEffect(() => {
        if (!images || images.length <= 1 || !isVisible) return;
        const interval = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [images, isVisible]);

    const nextSlide = (e) => {
        e.stopPropagation();
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = (e) => {
        e.stopPropagation();
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
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
        <div ref={containerRef} className="relative w-full h-full group overflow-hidden bg-black">
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
                />
            </AnimatePresence>

            {images.length > 1 && (
                <>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-300 z-10" />
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

const ProjectsDesktop = () => {
    const navigate = useNavigate();
    const { brand, isEPC } = useCompany();
    const [activeCategory, setActiveCategory] = useState("All");
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const show = () => {
            setIsLoaded(true);
            cleanup();
        };
        const cleanup = () => {
            clearTimeout(timer);
            window.removeEventListener('wheel', show);
            window.removeEventListener('touchmove', show);
            window.removeEventListener('keydown', show);
        };
        window.addEventListener('wheel', show, { passive: true });
        window.addEventListener('touchmove', show, { passive: true });
        window.addEventListener('keydown', show);
        const timer = setTimeout(show, 800);
        return cleanup;
    }, []);

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

    const featuredProjects = projects.filter(p => p.featured);
    const categoryProjects = projects;

    const parseScope = (scope) => {
        if (!scope) return [];
        if (Array.isArray(scope)) return scope;
        return [scope];
    };

    const categories = ["All", ...new Set(projects.map(p => p.category).filter(Boolean))];

    return (
        <div className="min-h-screen bg-blue-pattern text-white font-sans selection:bg-blue-500/30">
            <ProjectsHero />
            <div id="featured-projects"></div>

            <div
                className="transition-all duration-700 ease-out"
                style={{
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? 'translateY(0)' : 'translateY(32px)',
                    pointerEvents: isLoaded ? 'auto' : 'none',
                }}
            >
            {/* Featured Projects */}
            <section id="featured-projects" className="py-16 sm:py-24 px-6 relative overflow-hidden">
                <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <div className="mb-12 sm:mb-20">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">Featured Masterpieces</h2>
                            <p className="text-gray-400 max-w-2xl text-sm sm:text-base">A selection of our most complex and successfully delivered projects.</p>
                        </div>
                    </RevealOnScroll>
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24 gap-4">
                            <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                            <p className="text-gray-500 text-sm">Loading projects...</p>
                        </div>
                    ) : (
                        <div className="space-y-16 sm:space-y-32">
                            {featuredProjects.map((project, index) => (
                                <RevealOnScroll key={project.id || index}>
                                    <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 sm:gap-16 items-center`}>
                                        <div className="w-full lg:w-1/2">
                                            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl animated-white-border">
                                                <ImageSlider images={project.images} title={project.title} />
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8">
                                            {project.location && (
                                                <div className="inline-flex px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold">
                                                    {project.location}
                                                </div>
                                            )}
                                            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">{project.title}</h3>
                                            <div className="space-y-4">
                                                <div className="flex items-start gap-4">
                                                    <div className="p-2 rounded-lg bg-white/5 text-blue-400"><Layout size={20} /></div>
                                                    <div>
                                                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Scope of Work</div>
                                                        <div className="text-gray-300 font-medium text-sm sm:text-base">{parseScope(project.scope).join(", ") || project.scope}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-4">
                                                    <div className="p-2 rounded-lg bg-white/5 text-blue-400"><Award size={20} /></div>
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

            {/* Portfolio Grid */}
            <section className="py-16 sm:py-24 px-6 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <div className="text-center mb-12 sm:mb-16">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">Our Diverse Portfolio</h2>
                            <p className="text-gray-400 text-sm sm:text-base">Explore our work across different sectors.</p>
                        </div>
                    </RevealOnScroll>
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12 sm:mb-16 overflow-x-auto pb-4 no-scrollbar">
                        {categories.map((cat) => (
                            <button key={cat} onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full border transition-all duration-300 whitespace-nowrap text-sm sm:text-base ${activeCategory === cat ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/30' : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'}`}>
                                {cat}
                            </button>
                        ))}
                    </div>
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[1,2,3,4].map(i => <div key={i} className="rounded-2xl bg-[#0a0a0a] border border-white/5 h-72 animate-pulse" />)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                            {categoryProjects.filter(p => activeCategory === "All" || p.category === activeCategory).map((project, index) => (
                                <div key={project.id || index} className="group p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1 animated-white-border">
                                    <div className="relative h-64 rounded-xl overflow-hidden mb-6">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                                        {project.images?.length > 0 ? (
                                            <img src={project.images[0]} alt={project.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        ) : (
                                            <div className="w-full h-full bg-gray-900 flex items-center justify-center"><Layout className="text-gray-700 w-12 h-12" /></div>
                                        )}
                                        <span className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/10">{project.category}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {parseScope(project.scope).map((item, idx) => (
                                            <div key={idx} className="flex items-center text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">
                                                <CheckCircle size={10} className="text-blue-500 mr-1" />{item}
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-400 italic">"{project.highlight}"</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 sm:py-32 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/10"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,1)_0%,rgba(20,20,50,0.5)_50%,rgba(0,0,0,1)_100%)]"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-10 leading-tight">
                        Build Your Project With a <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Trusted Partner.</span>
                    </h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <div onClick={() => setIsContactOpen(true)}>
                            <RainbowButton>
                                <span className="flex items-center text-lg font-semibold px-6">Start Your Project <ChevronRight className="ml-2 w-5 h-5" /></span>
                            </RainbowButton>
                        </div>
                        <button onClick={() => navigate(`/${brand.toLowerCase()}${isEPC ? '/services/epc' : '/services'}`)}
                            className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white font-semibold text-lg flex items-center justify-center backdrop-blur-sm">
                            View More Services <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>
            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
            </div>
        </div>
    );
};

export default ProjectsDesktop;
