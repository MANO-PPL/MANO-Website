import { useState, useEffect, useRef } from 'react';
import {
    ChevronRight, Handshake, ShieldAlert, Coins, FileText, CheckCircle, Banknote,
    Search, Activity, Target, Package,
    Layers, Truck, HardHat, Settings, Database, Globe, Zap,
} from 'lucide-react';
import RainbowButton from '../../components/RainbowButton';
import ContactModal from '../../components/ContactModal';
import PageHero from '../../components/HeroSections/PageHero';
import ProjectTypes from '../../components/Services/ProjectTypes';

const RevealOnScroll = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {children}
        </div>
    );
};

const CountUp = ({ end, duration = 2000, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !hasAnimated.current) {
                hasAnimated.current = true;
                let startTime = null;
                const animate = (currentTime) => {
                    if (!startTime) startTime = currentTime;
                    const progress = Math.min((currentTime - startTime) / duration, 1);
                    const easeOut = 1 - Math.pow(2, -10 * progress);
                    setCount(Math.floor(easeOut * end));

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        setCount(end);
                    }
                };
                requestAnimationFrame(animate);
            }
        }, { threshold: 0.5 });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [end, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
};

const AnimatedBar = ({ width, color = "bg-blue-500", delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setTimeout(() => setIsVisible(true), delay);
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [delay]);

    return (
        <div ref={ref} className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`} style={{ width: isVisible ? `${width}%` : '0%' }} />
    );
};

const EPCTablet = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

        // Auto load after small delay if no interaction
        const timer = setTimeout(() => {
            setIsLoaded(true);
            removeListeners();
        }, 1000);

        return () => {
            removeListeners();
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const coreServices = [
        {
            title: "Engineering Coordination & Design Management",
            desc: "Constructability reviews, design validation, technical feasibility analysis, and change impact evaluation.",
            items: [
                "Constructability reviews",
                "Design validation",
                "Technical feasibility analysis",
                "Change impact evaluation",
                "Interdisciplinary drawing coordination"
            ],
            icon: Layers
        },
        {
            title: "Procurement Strategy & Vendor Management",
            desc: "Strategic sourcing, vendor prequalification, logistics planning, and procurement risk mitigation.",
            items: [
                "Vendor prequalification",
                "Technical & commercial bid evaluation",
                "Strategic sourcing",
                "Logistics planning",
                "Procurement risk mitigation"
            ],
            icon: Truck
        },
        {
            title: "Construction Execution Oversight",
            desc: "Site monitoring, contractor coordination, productivity tracking, and milestone reviews.",
            items: [
                "Site execution monitoring",
                "Contractor coordination",
                "Productivity tracking",
                "Milestone reviews",
                "Field reporting systems"
            ],
            icon: HardHat
        },
        {
            title: "Integrated EPC Project Controls",
            desc: "Performance dashboards, cost analysis, site alignment reports, and stakeholder frameworks.",
            items: [
                "Performance dashboards",
                "Cost vs. procurement analytics",
                "Engineering-to-site alignment reports",
                "Stakeholder review frameworks"
            ],
            icon: Activity
        }
    ];

    const specializedCapabilities = [
        {
            title: "Turnkey Project Delivery",
            desc: "Complete lifecycle support from feasibility to commissioning.",
            items: [
                { text: "Feasibility studies", icon: Search },
                { text: "Commissioning support", icon: CheckCircle },
                { text: "Lifecycle management", icon: Activity }
            ],
            icon: Package
        },
        {
            title: "Procurement Cost Optimization",
            desc: "Bulk procurement models and strategic vendor alliances.",
            items: [
                { text: "Bulk procurement models", icon: Package },
                { text: "Strategic vendor alliances", icon: Handshake },
                { text: "Price lock mechanisms", icon: LockIcon } // Using generic for lock mechanism
            ],
            icon: Banknote
        },
        {
            title: "EPC Risk Management",
            desc: "Supply chain mapping and contractor risk profiling.",
            items: [
                { text: "Supply chain risk mapping", icon: MapIcon }, // Using generic for map
                { text: "Contractor risk profiling", icon: ShieldAlert },
                { text: "Engineering risk audits", icon: FileText }
            ],
            icon: ShieldAlert
        }
    ];

    // Helper for icons used above but not imported directly in the generic set
    function LockIcon(props) { return <ShieldAlert {...props} /> }
    function MapIcon(props) { return <Globe {...props} /> }

    const processFlow = [
        { title: "Engineering Feasibility & Design Review", icon: Search },
        { title: "Procurement Strategy & Vendor Onboarding", icon: Handshake },
        { title: "Material Planning & Logistics Coordination", icon: Truck },
        { title: "Construction Execution Monitoring", icon: HardHat },
        { title: "Integrated Cost & Timeline Control", icon: Activity },
        { title: "Commissioning & Handover Compliance", icon: CheckCircle }
    ];

    return (
        <div className="min-h-screen bg-blue-pattern text-white overflow-x-hidden font-sans selection:bg-blue-500/30">
            {/* 1. HERO SECTION */}
            <PageHero
                title="Engineering"
                subtitle="Procurement Construction (EPC)"
                description="Delivering fully integrated engineering, procurement, and construction solutions through structured execution and performance-driven delivery systems."
                images={[
                    `${import.meta.env.BASE_URL}epc-hero-background.webp`,
                    `${import.meta.env.BASE_URL}epc-engineering-design.webp`,
                    `${import.meta.env.BASE_URL}epc-procurement-logistics.webp`,
                    `${import.meta.env.BASE_URL}epc-construction-site.webp`,
                    `${import.meta.env.BASE_URL}epc-industrial-plant.webp`
                ]}
                bgImage={`${import.meta.env.BASE_URL}epc-hero-background.webp`}
                badgeText="EPC Solutions"
                scrollTargetId="content"
                layout="mosaic-5"
                showContactButton={false}
                stats={{
                    mainValue: "100+",
                    mainLabel: "EPC Projects",
                    satisfaction: "95%",
                    grid: [
                        { value: "25", label: "Clients" },
                        { value: "90%", label: "On-Time" },
                        { value: "Zero", label: "Accidents" }
                    ]
                }}
            />

            <div id="content"></div>

            {isLoaded && (
                <>
                    {/* 2. VALUE METRICS STRIP */}
                    <section className="relative z-20 -mt-32 pb-16 pt-32 border-b border-white/5 bg-gradient-to-b from-transparent via-black/80 to-black backdrop-blur-sm animate-in fade-in duration-1000"
                        style={{
                            maskImage: "linear-gradient(to bottom, transparent, black 20%)",
                            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%)"
                        }}
                    >
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 text-center lg:divide-x divide-white/10">
                                <div className="p-4">
                                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2"><CountUp end={100} suffix="+" /></h3>
                                    <p className="text-gray-400 text-xs uppercase tracking-wider">EPC Projects Supported</p>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2"><CountUp end={25} suffix="" /></h3>
                                    <p className="text-gray-400 text-xs uppercase tracking-wider">Happy Clients</p>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2"><CountUp end={95} suffix="%" /></h3>
                                    <p className="text-gray-400 text-xs uppercase tracking-wider">Procurement Savings</p>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2"><CountUp end={90} suffix="%" /></h3>
                                    <p className="text-gray-400 text-xs uppercase tracking-wider">Project Success Rate</p>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2"><CountUp end={100} suffix="%" /></h3>
                                    <p className="text-gray-400 text-xs uppercase tracking-wider">Safety Compliance</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 3. EPC DELIVERY MODEL - VALUE PROPOSITION */}
                    <section className="py-16 md:py-24 px-6 md:px-12 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-100">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="bg-white/5 border border-white/10 rounded-3xl p-10 hover:border-blue-500/30 transition-all">
                                        <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
                                            <Target size={32} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-4">Single-Point Execution Accountability</h3>
                                        <p className="text-gray-300 leading-relaxed">
                                            Our EPC framework centralizes responsibility, ensuring seamless coordination between engineering consultants, procurement teams, contractors, and vendors.
                                        </p>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 rounded-3xl p-10 hover:border-blue-500/30 transition-all">
                                        <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
                                            <Settings size={32} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-4">Integrated Cost & Timeline Control</h3>
                                        <p className="text-gray-300 leading-relaxed">
                                            Engineering feasibility, procurement cost strategy, and execution planning are synchronized to eliminate delays and cost escalations.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </section>

                    {/* 4. CORE EPC SERVICES */}
                    <section className="py-16 md:py-24 px-6 md:px-12 bg-white/5 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-200">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-16">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2 leading-tight">Core EPC Services</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {coreServices.map((service, index) => (
                                        <div key={index} className="group relative p-8 rounded-2xl border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all shadow-lg backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 hover:to-blue-600/10 animated-white-border">
                                            {/* Large Background Icon */}
                                            <div className="absolute -bottom-10 -right-10 text-white/5 group-hover:text-blue-500/10 transition-colors duration-500 pointer-events-none transform rotate-12">
                                                <service.icon size={180} />
                                            </div>

                                            <div className="relative z-10">
                                                <div className="w-14 h-14 rounded-xl mb-6 bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.1)]">
                                                    <service.icon className="w-7 h-7 text-blue-400 group-hover:text-white transition-colors" />
                                                </div>

                                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{service.title}</h3>
                                                <p className="text-gray-400 mb-8 leading-relaxed min-h-[56px]">{service.desc}</p>

                                                <div className="bg-black/20 rounded-xl p-6 border border-white/5 group-hover:border-white/10 transition-colors">
                                                    <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wide">Capabilities:</h4>
                                                    <ul className="grid grid-cols-1 gap-3">
                                                        {service.items.map((item, idx) => (
                                                            <li key={idx} className="flex items-center text-sm text-gray-400">
                                                                <CheckCircle className="w-4 h-4 mr-2 text-blue-500 shrink-0" />
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </RevealOnScroll>
                    </section>

                    {/* 5. SUPPLY CHAIN & PROCUREMENT INTELLIGENCE */}
                    <section className="py-24 px-6 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-300">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
                                <div className="w-full lg:w-1/2 text-center lg:text-left">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none"></div>
                                        <div className="text-sm text-blue-400 font-bold tracking-widest uppercase mb-4">Supply Chain Excellence</div>
                                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                            End-to-End <br />
                                            <span className="text-blue-500">Supply Chain Visibility</span>
                                        </h2>
                                        <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                                            We ensure materials, equipment, and services are procured and delivered with optimal cost and timeline efficiency through data-driven logistics and sourcing strategies.
                                        </p>

                                        <div className="space-y-4 text-left max-w-md mx-auto lg:mx-0">
                                            {[
                                                "Vendor benchmarking databases",
                                                "Lead-time optimization",
                                                "Import vs. local sourcing analysis",
                                                "Inventory buffer planning",
                                                "Supply risk forecasting"
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                                        <CheckCircle size={14} />
                                                    </div>
                                                    <span className="text-gray-200">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/2">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-4 lg:translate-y-8">
                                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                                                <Globe className="w-10 h-10 text-blue-500 mb-4" />
                                                <h4 className="font-bold text-white mb-2">Global Sourcing</h4>
                                                <p className="text-sm text-gray-400">International vendor network access.</p>
                                            </div>
                                            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl text-white">
                                                <h4 className="font-bold text-xl mb-2">92%</h4>
                                                <p className="text-sm text-blue-100">Vendor Performance Efficiency</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                                                <Truck className="w-10 h-10 text-green-500 mb-4" />
                                                <h4 className="font-bold text-white mb-2">Logistics</h4>
                                                <p className="text-sm text-gray-400">Optimized delivery routes & timing.</p>
                                            </div>
                                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                                                <Database className="w-10 h-10 text-purple-500 mb-4" />
                                                <h4 className="font-bold text-white mb-2">Benchmarking</h4>
                                                <p className="text-sm text-gray-400">Real-time cost data analysis.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </section>

                    {/* 6. SPECIALIZED EPC CAPABILITIES */}
                    <section className="py-16 md:py-24 px-6 md:px-12 bg-white/5 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-400">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-16">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">Specialized Capabilities</h2>
                                    <p className="text-gray-400">Going beyond standard execution.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {specializedCapabilities.map((cap, index) => (
                                        <div key={index} className="bg-black/40 border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-all group">
                                            <cap.icon className="w-12 h-12 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
                                            <h3 className="text-xl font-bold text-white mb-3">{cap.title}</h3>
                                            <p className="text-gray-400 mb-6 text-sm">{cap.desc}</p>
                                            <div className="space-y-2">
                                                {cap.items.map((item, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                                        {item.text}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </RevealOnScroll>
                    </section>

                    {/* 7. COMPARISON SECTION */}
                    <section className="py-16 md:py-24 px-6 md:px-12 bg-black backdrop-blur-sm border-y border-white/5 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-500">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-12 md:mb-16">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2 leading-tight">Delivery Model Comparison</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                                    {/* WITHOUT MANO */}
                                    <div className="space-y-8">
                                        <div className="text-center mb-8">
                                            <h3 className="text-2xl font-bold text-red-400 mb-2">Without Integrated EPC Management</h3>
                                            <p className="text-gray-400 text-sm">Fragmented Execution & High Risk</p>
                                        </div>
                                        <div className="space-y-6">
                                            {[
                                                { label: "Design & Execution", percentage: 40, color: "bg-red-500" },
                                                { label: "Vendor Coordination", percentage: 30, color: "bg-red-500" },
                                                { label: "Procurement Speed", percentage: 50, color: "bg-red-500" },
                                                { label: "Cost Control", percentage: 45, color: "bg-red-500" },
                                                { label: "Site Mobilization", percentage: 60, color: "bg-red-500" }
                                            ].map((item, index) => (
                                                <div key={index}>
                                                    <div className="flex justify-between text-sm font-medium text-gray-400 mb-2">
                                                        <span>{item.label}</span>
                                                        <span className="text-red-400">Inefficient</span>
                                                    </div>
                                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                                        <AnimatedBar width={item.percentage} color={item.color} delay={index * 200} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 mt-8">
                                            <p className="text-red-200 text-center font-medium  text-xs md:text-sm">
                                                "Result: Unpredictable timelines and financial instability."
                                            </p>
                                        </div>
                                    </div>

                                    {/* WITH MANO */}
                                    <div className="space-y-8 relative">
                                        <div className="absolute inset-0 bg-blue-500/5 blur-3xl -z-10 rounded-full"></div>
                                        <div className="text-center mb-8">
                                            <h3 className="text-2xl font-bold text-blue-400 mb-2">With MANO EPC Services</h3>
                                            <p className="text-gray-400 text-sm">Unified, Accelerated & Optimized</p>
                                        </div>
                                        <div className="space-y-6">
                                            {[
                                                { label: "Unified Ecosystem", percentage: 100, color: "bg-blue-500" },
                                                { label: "Optimized Performance", percentage: 100, color: "bg-blue-500" },
                                                { label: "Timely Procurement", percentage: 100, color: "bg-blue-500" },
                                                { label: "Design-Site Sync", percentage: 100, color: "bg-blue-500" },
                                                { label: "Execution Governance", percentage: 100, color: "bg-blue-500" }
                                            ].map((item, index) => (
                                                <div key={index}>
                                                    <div className="flex justify-between text-sm font-medium text-gray-400 mb-2">
                                                        <span>{item.label}</span>
                                                        <span className="text-blue-400">Optimized</span>
                                                    </div>
                                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                                        <AnimatedBar width={item.percentage} color={item.color} delay={index * 200} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 mt-8">
                                            <p className="text-blue-200 text-center font-medium  text-xs md:text-sm">
                                                "Result: Accelerated delivery, optimized costs, and controlled execution."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </section>

                    {/* 8. DIGITAL EPC MANAGEMENT SYSTEMS */}
                    <section className="py-16 md:py-24 px-6 md:px-12 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-600">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-r from-blue-900/40 to-black border border-white/10 p-8 md:p-16 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-32 bg-blue-500/10 blur-[100px] rounded-full"></div>

                                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
                                    <div className="w-full lg:w-1/2">
                                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">Digital EPC Management Systems</h2>
                                        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                                            Technology-Driven Execution Monitoring. We leverage modern digital tools to track engineering approvals, procurement logistics, and site progress in real time.
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {[
                                                "EPC dashboards",
                                                "Procurement trackers",
                                                "Vendor performance analytics",
                                                "Delay forecasting models"
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
                                                    <Zap size={18} className="text-yellow-400" />
                                                    <span className="text-sm font-medium text-white">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-1/2 flex justify-center">
                                        {/* Abstract visualization of a dashboard */}
                                        <div className="w-full max-w-sm bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-2xl">
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="h-3 w-24 bg-white/20 rounded-full"></div>
                                                <div className="flex gap-2">
                                                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="h-24 bg-white/5 rounded-lg border border-white/5 flex items-end p-4 gap-2">
                                                    <div className="w-1/4 h-[40%] bg-blue-500 rounded-t-sm"></div>
                                                    <div className="w-1/4 h-[70%] bg-blue-500 rounded-t-sm"></div>
                                                    <div className="w-1/4 h-[50%] bg-blue-500 rounded-t-sm"></div>
                                                    <div className="w-1/4 h-[90%] bg-blue-400 rounded-t-sm"></div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="h-16 bg-white/5 rounded-lg"></div>
                                                    <div className="h-16 bg-white/5 rounded-lg"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </section>

                    {/* 9. WHY MANO FOR EPC */}
                    <section className="py-16 md:py-24 px-6 md:px-12 bg-white/5 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-700">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-16">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Why MANO for EPC Services?</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { title: "Integrated Expertise", desc: "Seamless engineering & execution.", icon: Layers },
                                        { title: "Cost Intelligence", desc: "Data-driven procurement savings.", icon: Coins },
                                        { title: "Vendor Ecosystem", desc: "Strong global supplier network.", icon: Globe },
                                        { title: "Tech-Driven", desc: "Transparent reporting frameworks.", icon: Database }
                                    ].map((item, i) => (
                                        <div key={i} className="text-center p-8 rounded-2xl border border-white/10 hover:bg-white/5 transition-all">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 mx-auto flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-900/20">
                                                <item.icon size={32} />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                            <p className="text-gray-400">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </RevealOnScroll>
                    </section>

                    {/* 10. PROJECT TYPES */}
                    <ProjectTypes
                        title="Industries We Support"
                        items={[
                            {
                                name: "Residential Mega Developments",
                                desc: "High-rise townships & communities.",
                                image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Commercial IT Parks",
                                desc: "Grade-A office spaces & tech parks.",
                                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Industrial Plants",
                                desc: "Manufacturing & production units.",
                                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Logistics & Warehousing",
                                desc: "Supply chain infrastructure.",
                                image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Hospitality & Mixed-Use",
                                desc: "Luxury hotels & lifestyle centers.",
                                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&h=600&auto=format&fit=crop"
                            }
                        ]}
                    />

                    {/* 11. PROCESS FLOW */}
                    <section className="py-16 md:py-24 px-6 md:px-12 bg-black relative overflow-hidden animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-900">
                        {/* Background Decor */}
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-900/50 to-transparent"></div>

                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-12 md:mb-20">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">EPC Delivery <span className="text-blue-500">Process Flow</span></h2>
                                    <div className="h-1 w-24 bg-blue-500/30 mx-auto rounded-full"></div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {processFlow.map((step, index) => (
                                        <div key={index} className="group relative p-8 md:p-12 rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-xl overflow-hidden hover:to-blue-600/10 transition-all duration-500">
                                            {/* Top Line Accent */}
                                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                                            {/* Number Watermark */}
                                            <div className="absolute top-4 right-6 text-7xl font-black text-white/[0.03] group-hover:text-blue-500/[0.05] transition-colors pointer-events-none select-none font-mono">
                                                {String(index + 1).padStart(2, '0')}
                                            </div>

                                            {/* Icon & Content */}
                                            <div className="relative z-10">
                                                <div className="w-14 h-14 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500 shadow-[0_0_20px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                                                    <step.icon size={28} strokeWidth={1.5} />
                                                </div>

                                                <h3 className="text-lg font-bold text-white mb-3 pr-8 group-hover:text-blue-400 transition-colors">
                                                    {step.title}
                                                </h3>

                                                {/* Decoration Lines */}
                                                <div className="flex gap-1 mt-6 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                                                    <div className="h-1 w-1 bg-blue-500 rounded-full"></div>
                                                    <div className="h-1 w-1 bg-blue-500 rounded-full"></div>
                                                    <div className="h-1 w-12 bg-blue-500 rounded-full"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </RevealOnScroll>
                    </section>

                    {/* 12. TRUST STATEMENT */}
                    <section className="py-16 md:py-24 px-6 md:px-12 text-center animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-1000">
                        <div className="max-w-4xl mx-auto p-8 md:p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:to-blue-600/10 hover:border-blue-500/30 transition-all duration-500 backdrop-blur-md group">
                            <p className="text-xl md:text-3xl font-medium text-white leading-relaxed group-hover:text-blue-100 transition-colors">
                                "Developers and infrastructure leaders trust MANO Project Consultants for delivering integrated EPC consultancy solutions that ensure speed, cost control, and execution reliability."
                            </p>
                        </div>
                    </section>

                    {/* 13. CTA */}
                    <section className="py-16 md:py-24 relative overflow-hidden animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-1000">
                        <div className="absolute inset-0 bg-blue-900/20"></div>
                        <div className="max-w-6xl mx-auto px-6 md:px-12 text-center relative z-10">
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">Integrate Engineering, Procurement & Execution Seamlessly.</h2>
                            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                                Partner with MANO Project Consultants for structured EPC delivery with measurable performance outcomes.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-6">
                                <div className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
                                    <RainbowButton>
                                        <span className="flex items-center text-lg font-semibold px-4">
                                            Start Your EPC Project <ChevronRight className="ml-2 w-5 h-5" />
                                        </span>
                                    </RainbowButton>
                                </div>

                            </div>
                        </div>
                    </section>
                    <ContactModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        initialService="EPC Solutions"
                    />
                </>
            )}
        </div>
    );
};

export default EPCTablet;

