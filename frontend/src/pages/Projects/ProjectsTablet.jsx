
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Building, Briefcase, Factory, Hexagon, GraduationCap,
    MapPin, CheckCircle, ArrowRight, ChevronRight, Layout, Minimize2, Activity,
    ShieldCheck, DollarSign, FileText, Award
} from 'lucide-react';
import RevealOnScroll from '../../components/RevealOnScroll';
import RainbowButton from '../../components/RainbowButton';
import ProjectsHero from '../../components/HeroSections/ProjectsHero';
import ContactModal from '../../components/ContactModal';
import { useNavigate } from 'react-router-dom';
import { useCompany } from '../../context/CompanyContext';

const ImageSlider = ({ images, title, autoScrollTrigger }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [direction, setDirection] = React.useState(0); // -1 for left, 1 for right

    // Auto-slide effect based on parent trigger
    React.useEffect(() => {
        if (!images || images.length <= 1) return;
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [autoScrollTrigger, images]);

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
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 1.2
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 1.2
        })
    };

    return (
        <div className="relative w-full h-full group overflow-hidden bg-black">
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
                        x: { type: "tween", duration: 0.8, ease: "easeInOut" },
                        opacity: { duration: 0.5 },
                        scale: { duration: 5 } // Slow zoom effect
                    }}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
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

const ProjectsTablet = () => {
    const navigate = useNavigate();
    const { brand, isEPC } = useCompany();
    const [activeCategory, setActiveCategory] = useState("All");
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [autoScrollTrigger, setAutoScrollTrigger] = useState(0);

    // Global timer for synchronized carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setAutoScrollTrigger(prev => prev + 1);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const featuredProjects = [
        {
            id: 1,
            title: "Hotel Moon Palace - Kinshasa",
            location: "Kinshasa, Congo",
            scope: ["PMC - Project Management Consultants"],
            highlight: "Luxury hospitality development with premium amenities.",
            images: [
                `${import.meta.env.BASE_URL}Hotel Moon Kinshasa/001 (3).webp`,
                `${import.meta.env.BASE_URL}Hotel Moon Kinshasa/002 (3).webp`,
                `${import.meta.env.BASE_URL}Hotel Moon Kinshasa/003 (3).webp`,
                `${import.meta.env.BASE_URL}Hotel Moon Kinshasa/006 (2).webp`
            ]
        },
        {
            id: 2,
            title: "Triveni Crown",
            location: "Kalyan",
            scope: ["PMC - Project Management Consultants"],
            highlight: "Landmark residential project with grand entrance gate.",
            images: [
                `${import.meta.env.BASE_URL}HD Picture TRIVENI Crown, Kalyan/MAIN GATE/1.option 01-crown gate 01.webp`,
                `${import.meta.env.BASE_URL}HD Picture TRIVENI Crown, Kalyan/MAIN GATE/5.option 02-crown gate 03.webp`,
                `${import.meta.env.BASE_URL}HD Picture TRIVENI Crown, Kalyan/MAIN GATE/6.option 02-crown gate 04.webp`
            ]
        },
        {
            id: 3,
            title: "Ananda Residency - Paradigm Ambit Buildcon",
            location: "Borivali (West), Mumbai",
            scope: ["PMC - Project Management Consultants"],
            highlight: "Massive 3,10,230 sq. ft. residential development completed successfully.",
            images: [
                `${import.meta.env.BASE_URL}projects_img/Ananda Residency - Paradigm Ambit Buildcon..webp`,
                `${import.meta.env.BASE_URL}Ananda residency/Aerial.webp`,
                `${import.meta.env.BASE_URL}Ananda residency/podium.webp`,
                `${import.meta.env.BASE_URL}Ananda residency/pool.webp`,
                `${import.meta.env.BASE_URL}Ananda residency/terrace 2.webp`
            ]
        },
        {
            id: 4,
            title: "Westside – Tata Trent Ltd.",
            location: "Gachibowli, Hyderabad",
            scope: ["PMC - Project Management Consultants"],
            highlight: "21,255 sq.ft. retail project delivered for Tata Trent.",
            images: [
                `${import.meta.env.BASE_URL}projects_img/Westside – Tata Trent Ltd.(1).webp`,
                `${import.meta.env.BASE_URL}projects_img/Westside– Tata Trent Ltd..webp`
            ]
        },
        {
            id: 5,
            title: "30 Juin",
            location: "Congo",
            scope: ["PMC - Project Management Consultants"],
            highlight: "Premium residential and commercial development.",
            images: [
                `${import.meta.env.BASE_URL}30 Juin/Tranjio Hotel 03.webp`,
                `${import.meta.env.BASE_URL}30 Juin/Tranjio Hotel 04.webp`,
                `${import.meta.env.BASE_URL}30 Juin/Tranjio Hotel 06.webp`
            ]
        }
    ];

    const categoryProjects = [
        // Residential
        {
            category: "Residential",
            title: "Triveni Crown",
            location: "Kalyan",
            scope: ["PMC - Project Management Consultants"],
            highlight: "Landmark residential project with grand entrance gate.",
            images: [
                `${import.meta.env.BASE_URL}HD Picture TRIVENI Crown, Kalyan/MAIN GATE/1.option 01-crown gate 01.webp`,
                `${import.meta.env.BASE_URL}HD Picture TRIVENI Crown, Kalyan/MAIN GATE/5.option 02-crown gate 03.webp`,
                `${import.meta.env.BASE_URL}HD Picture TRIVENI Crown, Kalyan/MAIN GATE/6.option 02-crown gate 04.webp`
            ]
        },
        {
            category: "Residential",
            title: "Ananda Residency - Paradigm Ambit Buildcon",
            location: "Borivali (West), Mumbai",
            scope: ["PMC - Project Management Consultants"],
            highlight: "Massive 3,10,230 sq. ft. residential development completed successfully.",
            images: [
                `${import.meta.env.BASE_URL}projects_img/Ananda Residency - Paradigm Ambit Buildcon..webp`,
                `${import.meta.env.BASE_URL}Ananda residency/Aerial.webp`,
                `${import.meta.env.BASE_URL}Ananda residency/podium.webp`,
                `${import.meta.env.BASE_URL}Ananda residency/pool.webp`,
                `${import.meta.env.BASE_URL}Ananda residency/terrace 2.webp`
            ]
        },
        {
            category: "Residential",
            title: "Sati Darshan - Goyal Group",
            scope: ["PMC - Project Management Consultants"],
            highlight: "1,39,749 sq.ft. residential project in Malad, Mumbai.",
            images: [`${import.meta.env.BASE_URL}projects_img/Sati Darshan - Goyal Group..webp`]
        },
        {
            category: "Residential",
            title: "Celestia - Shree Ram Samarth",
            scope: ["PMC - Project Management Consultants"],
            highlight: "1,00,000 sq.ft. residential development in Mulund, Mumbai.",
            images: [`${import.meta.env.BASE_URL}projects_img/Celestia - Shree Ram Samarth..webp`]
        },
        {
            category: "Residential",
            title: "Shubharambh Residency",
            scope: ["PMC - Project Management Consultants"],
            highlight: "59,000 sq.ft. housing project in Solapur.",
            images: [`${import.meta.env.BASE_URL}projects_img/Shubharambh Residency - Veer Housing Projects LLP..webp`]
        },
        {
            category: "Residential",
            title: "Golf Apartment",
            scope: ["PMC - Project Management Consultants"],
            highlight: "Luxury apartments with golf course views.",
            images: [
                `${import.meta.env.BASE_URL}Golf Apartment/Golf Appartment 1 .webp.webp`,
                `${import.meta.env.BASE_URL}Golf Apartment/Golf Appartment 2 .webp.webp`
            ]
        },
        {
            category: "Residential",
            title: "Triveni Classics",
            scope: ["PMC - Project Management Consultants"],
            highlight: "Classic residential architecture in Kalyan.",
            images: [
                `${import.meta.env.BASE_URL}HD Picture TRIVENI Classics, Kalyan/Triveni CLASSIC (NEW view) in progress.webp`,
                `${import.meta.env.BASE_URL}HD Picture TRIVENI Classics, Kalyan/Triveni CLASSIC (Old view).webp`
            ]
        },

        // Commercial
        {
            category: "Commercial",
            title: "Westside – Tata Trent Ltd.",
            location: "Gachibowli, Hyderabad",
            scope: ["PMC - Project Management Consultants"],
            highlight: "21,255 sq.ft. retail project delivered for Tata Trent.",
            images: [
                `${import.meta.env.BASE_URL}projects_img/Westside – Tata Trent Ltd.(1).webp`,
                `${import.meta.env.BASE_URL}projects_img/Westside– Tata Trent Ltd..webp`
            ]
        },
        {
            category: "Commercial",
            title: "Zudio / Tata Trent Projects",
            scope: ["PMC - Project Management Consultants"],
            highlight: "Rollout management for multiple retail outlets.",
            images: [
                `${import.meta.env.BASE_URL}projects_img/Zudio – Tata Trent Ltd.(3).webp`,
                `${import.meta.env.BASE_URL}projects_img/Zudio – Tata Trent Ltd.(4).webp`
            ]
        },
        {
            category: "Commercial",
            title: "NIDIMO - Kamala Mill",
            scope: ["PMC - Project Management Consultants"],
            highlight: "Commercial interior works at Kamala Mills.",
            images: [
                `${import.meta.env.BASE_URL}NIDIMO - Kamala mill/2025-12-19 123025 1.webp`,
                `${import.meta.env.BASE_URL}NIDIMO - Kamala mill/2025-12-19 123201 2.webp`,
                `${import.meta.env.BASE_URL}NIDIMO - Kamala mill/2025-12-19 123143 3.webp`,
                `${import.meta.env.BASE_URL}NIDIMO - Kamala mill/2025-12-19 123244 4.webp`
            ]
        },
        {
            category: "Commercial",
            title: "NSCI Dome – Worli",
            scope: ["PMC - Project Management Consultants"],
            highlight: "5,150 sq.ft. institutional-scale project in Mumbai.",
            images: [
                `${import.meta.env.BASE_URL}projects_img/NSCI Dome – National Sports Club of India..webp`,
                `${import.meta.env.BASE_URL}NSCI/16.webp`,
                `${import.meta.env.BASE_URL}NSCI/21.webp`,
                `${import.meta.env.BASE_URL}NSCI/25.webp`
            ]
        },
        {
            category: "Commercial",
            title: "More Hyper Mart",
            scope: ["PMC - Project Management Consultants"],
            highlight: "Retail construction in Nashik, Maharashtra.",
            images: [`${import.meta.env.BASE_URL}projects_img/More Hyper Mart -Aher Constructions Pvt. Ltd..webp`]
        },
        {
            category: "Commercial",
            title: "Expeditors – Studio DNA",
            scope: ["PMC - Project Management Consultants"],
            highlight: "Corporate office interior project.",
            images: [
                `${import.meta.env.BASE_URL}projects_img/Expeditors – Studio DNA .webp`,
                `${import.meta.env.BASE_URL}projects_img/Expeditors – Studio DNA.webp`
            ]
        },
        {
            category: "Commercial",
            title: "Maharail – Studio DNA",
            scope: ["PMC - Project Management Consultants"],
            highlight: "Office space development.",
            images: [`${import.meta.env.BASE_URL}projects_img/Maharail – Studio DNA.webp`]
        },

        // Industrial
        {
            category: "Industrial",
            title: "Prima Plastics Limited",
            scope: ["PMC - Project Management Consultants"],
            highlight: "1,69,000 Sft plastic manufacturing facility.",
            images: [`${import.meta.env.BASE_URL}projects_img/Prima Plastics Limited..webp`]
        },
        {
            category: "Industrial",
            title: "Textile Factory",
            scope: ["PMC - Project Management Consultants"],
            highlight: "52,532 sq.ft. industrial facility in Tarapur.",
            images: [`${import.meta.env.BASE_URL}projects_img/Textile Factory - Micro Interlinings Pvt. Ltd..webp`]
        },
        {
            category: "Industrial",
            title: "Gaiwadi Industrial Estate",
            scope: ["PMC - Project Management Consultants"],
            highlight: "Amazon Warehouse project management.",
            images: [`${import.meta.env.BASE_URL}projects_img/Gaiwadi Industrial Estate - Amazon Warehouse..webp`]
        },
        {
            category: "Industrial",
            title: "JNPC Infra Development",
            scope: ["PMC - Project Management Consultants"],
            highlight: "Infrastructure development oversight.",
            images: [`${import.meta.env.BASE_URL}projects_img/JNPC Infra Development– TUV Rheinland (India) Pvt Ltd..webp`]
        },

        // Hospitality
        {
            category: "Hospitality",
            title: "Hotel Moon Palace - Kinshasa",
            location: "Kinshasa, Congo",
            scope: ["PMC - Project Management Consultants"],
            highlight: "Luxury hospitality development with premium amenities.",
            images: [
                `${import.meta.env.BASE_URL}Hotel Moon Kinshasa/001 (3).webp`,
                `${import.meta.env.BASE_URL}Hotel Moon Kinshasa/002 (3).webp`,
                `${import.meta.env.BASE_URL}Hotel Moon Kinshasa/003 (3).webp`,
                `${import.meta.env.BASE_URL}Hotel Moon Kinshasa/006 (2).webp`
            ]
        },
        {
            category: "Hospitality",
            title: "30 Juin",
            location: "Congo",
            scope: ["PMC - Project Management Consultants"],
            highlight: "Premium residential and commercial development.",
            images: [
                `${import.meta.env.BASE_URL}30 Juin/Tranjio Hotel 03.webp`,
                `${import.meta.env.BASE_URL}30 Juin/Tranjio Hotel 04.webp`,
                `${import.meta.env.BASE_URL}30 Juin/Tranjio Hotel 06.webp`
            ]
        },
        {
            category: "Hospitality",
            title: "KAPCO Banquets & Catering",
            scope: ["PMC - Project Management Consultants"],
            highlight: "15,698 sq.ft. hospitality project in New Delhi.",
            images: [`${import.meta.env.BASE_URL}projects_img/KAPCO Banquets & Catering Pvt. Ltd..webp`]
        }
    ];

    const categories = ["All", "Residential", "Commercial", "Industrial", "Hospitality"];

    return (
        <div className="min-h-screen bg-blue-pattern text-white font-sans selection:bg-blue-500/30">

            {/* HERO SECTION */}
            {/* HERO SECTION */}
            <ProjectsHero />

            <div id="featured-projects"></div>

            {/* 2. FEATURED PROJECTS SHOWCASE */}
            <section id="featured-projects" className="py-16 sm:py-24 px-6 relative overflow-hidden">
                <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <div className="mb-12 sm:mb-20">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">Featured Masterpieces</h2>
                            <p className="text-gray-400 max-w-2xl text-sm sm:text-base">A selection of our most complex and successfully delivered projects.</p>
                        </div>
                    </RevealOnScroll>

                    <div className="space-y-16 sm:space-y-32">
                        {featuredProjects.map((project, index) => (
                            <RevealOnScroll key={index}>
                                <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 sm:gap-16 items-center`}>
                                    <div className="w-full lg:w-1/2 group">
                                        <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl animated-white-border">
                                            <ImageSlider images={project.images} title={project.title} autoScrollTrigger={autoScrollTrigger} />
                                            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div> */}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8">
                                        <div className="inline-flex px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold">
                                            {project.location}
                                        </div>
                                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">{project.title}</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-4">
                                                <div className="p-2 rounded-lg bg-white/5 text-blue-400"><Layout size={20} /></div>
                                                <div>
                                                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Scope of Work</div>
                                                    <div className="text-gray-300 font-medium text-sm sm:text-base">{Array.isArray(project.scope) ? project.scope.join(", ") : project.scope}</div>
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
                </div>
            </section>

            {/* 3. CATEGORIZED PROJECT GRID */}
            <section className="py-16 sm:py-24 px-6 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <div className="text-center mb-12 sm:mb-16">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">Our Diverse Portfolio</h2>
                            <p className="text-gray-400 text-sm sm:text-base">Explore our work across different sectors.</p>
                        </div>
                    </RevealOnScroll>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12 sm:mb-16 overflow-x-auto pb-4 no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full border transition-all duration-300  text-sm sm:text-base ${activeCategory === cat
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/30'
                                    : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {categoryProjects
                            .filter(p => activeCategory === "All" || p.category === activeCategory)
                            .map((project, index) => (
                                <div key={index} className="group p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1 animated-white-border">
                                    <div className="relative h-64 rounded-xl overflow-hidden mb-6">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                                        <img
                                            src={project.images[0]}
                                            alt={project.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <span className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/10">
                                            {project.category}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                                        {project.title}
                                    </h3>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.scope.map((item, idx) => (
                                            <div key={idx} className="flex items-center text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">
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
                </div>
            </section>

            {/* 4. PROJECTS SUMMARY STRIP */}


            {/* 5. CTA SECTION */}
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
                                <span className="flex items-center text-lg font-semibold px-6">
                                    Start Your Project <ChevronRight className="ml-2 w-5 h-5" />
                                </span>
                            </RainbowButton>
                        </div>
                        <button
                            onClick={() => navigate(`/${brand.toLowerCase()}${isEPC ? '/services/epc' : '/services'}`)}
                            className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white font-semibold text-lg flex items-center justify-center backdrop-blur-sm"
                        >
                            View More Services <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </div >
    );
};

export default ProjectsTablet;
