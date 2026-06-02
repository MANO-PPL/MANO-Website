import { useState, useEffect, useRef } from 'react';
import {
    ChevronRight, Shield, BookOpen, ClipboardCheck, Factory,
    BarChart2, ShieldCheck, Users, Activity, Target, Search,
    FileText, Layers, CheckCircle, AlertTriangle, Layout, BarChart3, Clock
} from 'lucide-react';
import RainbowButton from '../../components/RainbowButton';
import ContactModal from '../../components/ContactModal';
import PageHero from '../../components/HeroSections/PageHero';
import DigitalERPSection from '../../components/DigitalERPSection';
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

const QAQCAndAuditingDesktop = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);

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

        return () => {
            removeListeners();
        };
    }, []);

    const [chartVisible, setChartVisible] = useState(false);
    const chartRef = useRef(null);

    useEffect(() => {
        if (!isLoaded) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setChartVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        if (chartRef.current) observer.observe(chartRef.current);
        return () => observer.disconnect();
    }, [isLoaded]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const coreServices = [
        {
            title: "QA System Development",
            desc: "Designing standardized QA frameworks that align with industry norms and client requirements.",
            items: [
                { text: "Quality manuals & frameworks", icon: BookOpen },
                { text: "Method statement preparation", icon: FileText },
                { text: "SOPs development", icon: Layers },
                { text: "QA dashboards & reporting", icon: BarChart2 }
            ],
            icon: Shield
        },
        {
            title: "Internal Quality Audits",
            desc: "Comprehensive audits to measure adherence to approved processes and standards.",
            items: [
                { text: "Process audits", icon: Activity },
                { text: "Non-conformance detection", icon: AlertTriangle },
                { text: "Audit scoring & grading", icon: Target },
                { text: "Corrective action plans", icon: CheckCircle }
            ],
            icon: ClipboardCheck
        },
        {
            title: "Vendor & Material Audits",
            desc: "Ensuring materials and vendors meet predefined specifications and performance criteria.",
            items: [
                { text: "Vendor capability assessments", icon: Users },
                { text: "Material quality verification", icon: Factory },
                { text: "Compliance with specs", icon: FileText },
                { text: "Supplier audit reports", icon: BarChart2 }
            ],
            icon: Factory
        },
        {
            title: "Workmanship & Performance",
            desc: "Assessing the consistency, accuracy, and durability of onsite execution.",
            items: [
                { text: "Workmanship inspections", icon: Search },
                { text: "Tolerance & alignment checks", icon: Target },
                { text: "Finishing & installation audits", icon: Layers },
                { text: "Corrective action follow-ups", icon: CheckCircle }
            ],
            icon: ShieldCheck
        }
    ];

    const specializedServices = [
        {
            title: "ISO & Regulatory Compliance",
            desc: "Ensuring your project meets local, national, and international quality standards.",
            items: [
                { text: "ISO audit preparation", icon: BookOpen },
                { text: "Documentation compliance", icon: FileText },
                { text: "Statutory requirement mapping", icon: Layers },
                { text: "Certification support", icon: Shield }
            ],
            icon: Target
        },
        {
            title: "Root Cause Analysis & CAPA",
            desc: "Identifying underlying causes of defects and implementing sustainable corrective actions.",
            items: [
                { text: "Non-conformance mapping", icon: AlertTriangle },
                { text: "Root cause evaluation", icon: Search },
                { text: "Corrective & preventive actions", icon: CheckCircle },
                { text: "Closure verification", icon: Activity }
            ],
            icon: Search
        },
        {
            title: "Digital QA Reporting",
            desc: "Real-time visibility into quality performance through structured reporting.",
            items: [
                { text: "QA dashboards", icon: BarChart2 },
                { text: "Daily/weekly quality reports", icon: FileText },
                { text: "Audit summaries", icon: ClipboardCheck },
                { text: "Compliance scorecards", icon: Target }
            ],
            icon: BarChart2
        }
    ];

    const processFlow = [
        { title: "Define Quality Standards & Framework", icon: BookOpen },
        { title: "Conduct Audits & Identifications", icon: Search },
        { title: "Issue Non-Conformance Reports (NCRs)", icon: AlertTriangle },
        { title: "Root Cause Analysis & CAPA Planning", icon: Activity },
        { title: "Monitor Corrective Implementation", icon: ShieldCheck },
        { title: "Final Re-Audit & Compliance Closure", icon: CheckCircle }
    ];

    return (
        <div className="min-h-screen bg-blue-pattern text-white overflow-x-hidden font-sans selection:bg-blue-500/30">
            {/* Navbar */}
            <nav className="absolute top-6 left-0 right-0 z-50 flex items-center justify-center pointer-events-none">

            </nav>

            {/* 1. HERO SECTION */}
            <PageHero
                title="Quality Assurance &"
                subtitle="Quality Control & Auditing"
                description="Prepare, Monitor and Control of Methodology, Quality Assurance & Quality Control Matrix, Assurance Plan, Check List and Snagging"
                images={[
                    `${import.meta.env.BASE_URL}qa-audit-hero.webp`,
                    `${import.meta.env.BASE_URL}quality-control-hero.webp`,
                    `${import.meta.env.BASE_URL}ehs-audit-hero.webp`,
                    `${import.meta.env.BASE_URL}project-execution-hero.webp`
                ]}
                bgImage={`${import.meta.env.BASE_URL}qa-audit-hero.webp`}
                badgeText="Quality Assurance & Quality Control & Audit"
                scrollTargetId="content"
                layout="quad-grid"
                showContactButton={false}
                stats={{
                    mainValue: "100%",
                    mainLabel: "Compliance",
                    satisfaction: "99%",
                    grid: [
                        { value: "0", label: "Defects" },
                        { value: "500+", label: "Audits" },
                        { value: "10x", label: "Return on Investment" }
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
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center lg:divide-x divide-white/10">
                                <div className="p-4">
                                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-2"><CountUp end={92} suffix="%" /></h3>
                                    <p className="text-gray-400 text-sm uppercase tracking-wider">Reduction in Rework</p>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-2"><CountUp end={98} suffix="%" /></h3>
                                    <p className="text-gray-400 text-sm uppercase tracking-wider">Compliance Accuracy</p>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-2"><CountUp end={400} suffix="+" /></h3>
                                    <p className="text-gray-400 text-sm uppercase tracking-wider">QA/QC Audits</p>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-2"><CountUp end={90} suffix="%" /></h3>
                                    <p className="text-gray-400 text-sm uppercase tracking-wider">Faster Resolution</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* 3. CORE SERVICES */}
                    <section className="py-16 md:py-24 px-6 md:px-12 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-100">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-16">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2 leading-tight">Core Quality Assurance & Quality Control Services</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {[
                                        {
                                            title: "System Setup & Compliance",
                                            desc: " Establishing quality control systems and ensuring benchmark compliance.",
                                            items: [
                                                "Set up a Quality Control and monitoring system.",
                                                "Check if quality of materials & workmanship is consistent with benchmarks.",
                                                "Monitor compliance to design and specifications during execution."
                                            ],
                                            icon: Shield
                                        },
                                        {
                                            title: "Testing & Inspections",
                                            desc: "Rigorous testing and verification of work quality.",
                                            items: [
                                                "Check all critical tests and inspections (site & off-site) are carried out.",
                                                "Check that product guarantees are available."
                                            ],
                                            icon: ClipboardCheck
                                        },
                                        {
                                            title: "Monitoring & Meetings",
                                            desc: "Continuous quality monitoring through regular meetings.",
                                            items: [
                                                "Conduct periodic “quality meetings” to maintain pre-set quality standards."
                                            ],
                                            icon: Users
                                        },
                                        {
                                            title: "Defect Management",
                                            desc: "Identification and rectification of defects and snags.",
                                            items: [
                                                "Inspect completed works and recommend corrective action as required.",
                                                "Ensuring the rectification of defects pointed out by Client or Architects."
                                            ],
                                            icon: ShieldCheck
                                        }
                                    ].map((service, index) => (
                                        <div key={index} className="group relative p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:to-blue-600/10 hover:border-blue-500/30 transition-all duration-500 overflow-hidden animated-white-border">
                                            {/* Large Background Icon */}
                                            <div className="absolute -bottom-10 -right-10 text-white/5 group-hover:text-blue-500/10 transition-colors duration-500 pointer-events-none transform rotate-12">
                                                <service.icon size={180} />
                                            </div>

                                            <div className="relative z-10">
                                                <div className="w-14 h-14 rounded-xl mb-6 bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.1)]">
                                                    <service.icon className="w-7 h-7 text-blue-400 group-hover:text-white transition-colors" />
                                                </div>

                                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{service.title}</h3>
                                                <p className="text-gray-400 mb-8 leading-relaxed lg:h-14">{service.desc}</p>

                                                <div className="bg-black/20 rounded-xl p-6 border border-white/5 group-hover:border-white/10 transition-colors">
                                                    <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wide">Key Activities:</h4>
                                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        {service.items.map((item, idx) => (
                                                            <li key={idx} className="flex items-start text-sm text-gray-400">
                                                                <CheckCircle className="w-4 h-4 mr-2 text-blue-500 mt-1 shrink-0" />
                                                                <span>{item}</span>
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

                    {/* 5. COMPARISON SECTION (DONUT CHART STYLE) */}
                    <section className="py-16 md:py-24 px-6 md:px-12 relative z-10 overflow-hidden animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-300">
                        <div className="max-w-7xl mx-auto relative">
                            <RevealOnScroll>
                                <div className="text-center mb-12 md:mb-16">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2 leading-tight">Why Quality Assurance & Audits Matter</h2>
                                </div>
                            </RevealOnScroll>

                            <div ref={chartRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                {/* LEFT: RED DONUT (Risk) */}
                                <RevealOnScroll>
                                    <div className="bg-gradient-to-br from-red-900/10 to-transparent p-8 rounded-3xl border border-red-500/20 text-center relative overflow-hidden group hover:border-red-500/40 transition-all duration-500">
                                        <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-colors duration-500"></div>

                                        <div className="relative z-10 flex flex-col items-center">
                                            <h3 className="text-2xl font-bold text-red-500 mb-6">Without QA & Audit</h3>

                                            {/* Horizontal Bar Chart Visual - Red (Risk) */}
                                            <div className="w-full max-w-xs mb-8">
                                                <div className="flex justify-between items-end mb-2">
                                                    <span className="text-5xl font-bold text-white drop-shadow-xl tracking-tighter">80%</span>
                                                    <span className="text-sm text-red-300 font-bold uppercase tracking-widest pb-2">Risk Level</span>
                                                </div>
                                                <div className="h-6 w-full bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm border border-gray-600/30">
                                                    <div
                                                        className="h-full bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.5)] relative overflow-hidden"
                                                        style={{
                                                            width: chartVisible ? '80%' : '0%',
                                                            transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
                                                        }}
                                                    >
                                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-shimmer"></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <ul className="space-y-4 text-left w-full max-w-sm px-6">
                                                <li className="flex items-center text-gray-300 font-medium"><AlertTriangle className="w-5 h-5 text-red-500 mr-3 shrink-0" /> Frequent defects & hidden issues</li>
                                                <li className="flex items-center text-gray-300 font-medium"><Activity className="w-5 h-5 text-red-500 mr-3 shrink-0" /> High rework costs (&gt;15%)</li>
                                                <li className="flex items-center text-gray-300 font-medium"><FileText className="w-5 h-5 text-red-500 mr-3 shrink-0" /> No audit trail</li>
                                            </ul>
                                        </div>
                                    </div>
                                </RevealOnScroll>

                                {/* RIGHT: BLUE DONUT (Quality) */}
                                <RevealOnScroll>
                                    <div className="bg-gradient-to-br from-blue-900/20 to-transparent p-10 rounded-[2.5rem] border border-blue-500/20 text-center relative overflow-hidden group hover:border-blue-500/50 transition-all duration-500 shadow-2xl shadow-blue-900/10">
                                        <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors duration-500"></div>

                                        <div className="relative z-10 flex flex-col items-center">
                                            <h3 className="text-3xl font-bold text-blue-400 mb-8 tracking-tight">With MANO QA</h3>

                                            {/* Horizontal Bar Chart Visual - Blue (Quality) */}
                                            <div className="w-full max-w-xs mb-8">
                                                <div className="flex justify-between items-end mb-2">
                                                    <span className="text-5xl font-bold text-white drop-shadow-xl tracking-tighter">98%</span>
                                                    <span className="text-sm text-blue-300 font-bold uppercase tracking-widest pb-2">Quality Score</span>
                                                </div>
                                                <div className="h-6 w-full bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm border border-gray-600/30">
                                                    <div
                                                        className="h-full bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)] relative overflow-hidden"
                                                        style={{
                                                            width: chartVisible ? '98%' : '0%',
                                                            transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
                                                        }}
                                                    >
                                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-shimmer"></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <ul className="space-y-4 text-left w-full max-w-sm px-6">
                                                <li className="flex items-center text-gray-200 font-medium"><ShieldCheck className="w-5 h-5 text-blue-400 mr-3 shrink-0" /> Zero-defect handover</li>
                                                <li className="flex items-center text-gray-200 font-medium"><Target className="w-5 h-5 text-blue-400 mr-3 shrink-0" /> 98% Compliance rate</li>
                                                <li className="flex items-center text-gray-200 font-medium"><CheckCircle className="w-5 h-5 text-blue-400 mr-3 shrink-0" /> Audit-ready records</li>
                                            </ul>
                                        </div>
                                    </div>
                                </RevealOnScroll>
                            </div>
                        </div>
                    </section>

                    {/* DIGITAL ERP SECTION */}
                    <RevealOnScroll>
                        <DigitalERPSection
                            title={`Specialized <span class="text-blue-500">Quality ERP</span> <br /> Monitoring Systems`}
                            description="Our digital ERP platform provides real-time visibility into quality performance, defect tracking, and non-conformance resolution, ensuring every benchmark is met with transparency."
                            features={[
                                { title: "Quality Score Dashboards", icon: BarChart3 },
                                { title: "Non-Conformance Trackers", icon: Activity },
                                { title: "Audit Performance Analytics", icon: Target },
                                { title: "Compliance Scorecards", icon: ShieldCheck },
                            ]}
                        />
                    </RevealOnScroll>

                    {/* 6. WHY MANO */}
                    <section className="py-16 md:py-24 px-6 md:px-12 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-400">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                                <div>
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-6 mb-8 leading-tight">
                                        Why MANO for <span className="text-blue-500 block sm:inline lg:block">Quality Assurance & Quality Control?</span>
                                    </h2>
                                    <div className="space-y-8">
                                        {[
                                            { title: "Benchmark Excellence", text: "Setting uncompromising standards that define project success.", icon: Target },
                                            { title: "Zero Compromise", text: "Stringent monitoring to ensure no deviation from approved methodology.", icon: ShieldCheck },
                                            { title: "Proactive Snagging", text: "Identifying and resolving defects long before the handover phase.", icon: Search },
                                            { title: "Compliance Reporting", text: "Comprehensive data-backed audits that guarantee regulatory alignment.", icon: FileText },
                                        ].map((item, index) => (
                                            <div key={index} className="flex gap-4 group rounded-xl p-4 transition-all hover:bg-white/5 border border-transparent hover:border-white/10 animated-white-border">
                                                <div className="w-12 h-12 rounded-full border border-blue-500/30 bg-blue-500/10 flex items-center justify-center shrink-0 text-blue-400">
                                                    <item.icon className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                                                    <p className="text-gray-400">{item.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none"></div>
                                    <div className="relative z-10 grid grid-cols-2 gap-4">
                                        <div className="space-y-4 mt-8">
                                            <div className="h-64 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 flex flex-col justify-end">
                                                <span className="text-4xl font-bold text-white mb-2">100%</span>
                                                <span className="text-sm text-gray-400">Compliance Rate</span>
                                            </div>
                                            <div className="h-40 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-6 flex flex-col justify-center">
                                                <span className="text-white text-lg font-bold">Error<br />Free</span>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="h-40 rounded-2xl bg-[#111] border border-white/10 p-6 flex flex-col justify-center">
                                                <Activity className="w-10 h-10 text-blue-500 mb-4" />
                                                <span className="text-gray-300 font-medium">High Benchmarks</span>
                                            </div>
                                            <div className="h-64 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 flex flex-col justify-end">
                                                <span className="text-4xl font-bold text-white mb-2">Total</span>
                                                <span className="text-sm text-gray-400">Snag-Free Handover</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </section>

                    {/* 7. INDUSTRIES */}
                    <ProjectTypes
                        title="Industries We Support"
                        items={[
                            {
                                name: "Residential & Commercial",
                                desc: "High-finish quality standards.",
                                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Industrial Units",
                                desc: "Structural integrity and durability.",
                                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Corporate Offices",
                                desc: "Premium interior fit-outs.",
                                image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Hospitality & Retail",
                                desc: "Aesthetics and guest experience focus.",
                                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Institutional Projects",
                                desc: "Long-term reliability and compliance.",
                                image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=800&h=600&auto=format&fit=crop"
                            }
                        ]}
                    />

                    {/* 8. PROCESS FLOW */}
                    <section className="py-16 md:py-24 px-6 md:px-12 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-600">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-12 md:mb-20">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-4 leading-tight">QA & Audit Process Flow</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {processFlow.map((step, index) => (
                                        <div key={index} className="group relative p-8 rounded-2xl border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all shadow-lg backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 hover:to-blue-600/10">
                                            <div className="absolute top-6 right-6 text-6xl font-bold text-white/5 group-hover:text-blue-500/10 transition-colors pointer-events-none">
                                                {String(index + 1).padStart(2, '0')}
                                            </div>
                                            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                                <step.icon size={24} />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2 relative z-10">{step.title}</h3>
                                            <div className="h-1 w-12 bg-gray-800 rounded group-hover:w-full group-hover:bg-blue-500 transition-all duration-500"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </RevealOnScroll>
                    </section>

                    {/* 9. TRUST STATEMENT */}
                    <section className="py-16 md:py-24 px-6 md:px-12 text-center animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-700">
                        <div className="max-w-4xl mx-auto p-8 md:p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:to-blue-600/10 hover:border-blue-500/30 transition-all duration-500 backdrop-blur-md group">
                            <p className="text-xl md:text-3xl font-medium text-white leading-relaxed group-hover:text-blue-100 transition-colors">
                                "MANO Project Consultants is trusted for delivering structured, transparent, and results-driven Quality Assurance & Audit systems that elevate project performance and ensure long-term reliability."
                            </p>
                        </div>
                    </section>

                    {/* 10. CTA */}
                    <section className="py-16 md:py-24 relative overflow-hidden animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-800">
                        <div className="absolute inset-0 bg-blue-900/20"></div>
                        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">Quality You Can Trust. Compliance You Can Prove.</h2>
                            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                                Partner with MANO Project Consultants for robust quality assurance and audit frameworks that ensure excellence.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-6">
                                <div onClick={() => setIsContactOpen(true)}>
                                    <RainbowButton>
                                        <span className="flex items-center text-lg font-semibold px-4">
                                            Start Your Project <ChevronRight className="ml-2 w-5 h-5" />
                                        </span>
                                    </RainbowButton>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}

            <ContactModal
                isOpen={isContactOpen}
                onClose={() => setIsContactOpen(false)}
                initialService="QA / QC Audits"
            />
        </div>
    );
};

export default QAQCAndAuditingDesktop;
