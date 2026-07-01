import { useState, useEffect, useRef } from 'react';
import {
    ChevronRight, ClipboardCheck, Calculator, Package, Lightbulb, Hammer, Flag,
    Users, Activity, TrendingUp, Handshake, PenTool, ShieldAlert, FileText,
    CheckCircle, ListChecks, Target, BarChart2,
    Layout, CheckSquare, Clock, ShieldCheck, Layers,
} from 'lucide-react';
import RainbowButton from '../../components/RainbowButton';
import ContactForm from '../../components/ContactForm';
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

const AnimatedBar = ({ children, className, widthClass, isVisible }) => {
    return (
        <div
            className={`${className} transition-all duration-[3000ms] ease-out ${isVisible ? widthClass : 'w-[0px]'}`}
        >
            <div className="w-full">
                {children}
            </div>
        </div>
    );
};

const ProjectManagementMobile = () => {
    const [isLoaded, setIsLoaded] = useState(true);

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
    const [isContactOpen, setIsContactOpen] = useState(false);
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
            title: "End-to-End Project Coordination",
            desc: "Ensuring flawless communication, clarity, and synergy between all teams.",
            items: [
                { text: "Stakeholder communication", icon: Users },
                { text: "Coordination between design, QS, contracts & site", icon: Activity },
                { text: "Issue escalation & closure", icon: ShieldAlert },
                { text: "Progress & milestone reviews", icon: ListChecks }
            ],
            icon: Users
        },
        {
            title: "Project Monitoring & Control",
            desc: "Tracking real-time project performance against planned timelines and budgets.",
            items: [
                { text: "Performance dashboards", icon: BarChart2 },
                { text: "Delay identification", icon: Clock },
                { text: "Progress verification", icon: CheckCircle },
                { text: "Key Performance Indicator-driven reporting", icon: TrendingUp }
            ],
            icon: Activity
        },
        {
            title: "Cost, Time & Scope Control",
            desc: "Maintaining project discipline across all critical parameters.",
            items: [
                { text: "Time–cost–scope alignment", icon: Target },
                { text: "Impact assessment", icon: Hammer },
                { text: "Change control support", icon: PenTool },
                { text: "Performance forecasting", icon: Lightbulb }
            ],
            icon: Calculator
        },
        {
            title: "Contractor & Vendor Management",
            desc: "Building accountability and consistent delivery from contracted parties.",
            items: [
                { text: "Contractor performance evaluation", icon: ClipboardCheck },
                { text: "Vendor coordination", icon: Handshake },
                { text: "Compliance enforcement", icon: ShieldAlert },
                { text: "Issue diagnosis & resolution", icon: Users }
            ],
            icon: Handshake
        }
    ];

    const specializedServices = [
        {
            title: "Design Coordination Management",
            desc: "Ensuring all designs align with execution requirements and are delivered on time.",
            items: [
                { text: "Drawing reviews", icon: PenTool },
                { text: "Change impact tracking", icon: Activity },
                { text: "Constructability checks", icon: Hammer },
                { text: "Design–site alignment", icon: Layout }
            ],
            icon: PenTool
        },
        {
            title: "Risk & Issue Management",
            desc: "Proactive strategies to prevent disruptions and minimize project uncertainty.",
            items: [
                { text: "Risk detection", icon: ShieldAlert },
                { text: "Mitigation planning", icon: Target },
                { text: "Issue log management", icon: ListChecks },
                { text: "Contingency execution", icon: Flag }
            ],
            icon: ShieldAlert
        },
        {
            title: "Project Reporting & Documentation",
            desc: "Clear, structured, data-backed reporting for transparency and decision support.",
            items: [
                { text: "Daily/weekly reports", icon: FileText },
                { text: "Management Information System dashboards", icon: BarChart2 },
                { text: "Client review decks", icon: CheckSquare },
                { text: "Project close-out documentation", icon: Package }
            ],
            icon: FileText
        }
    ];

    const processFlow = [
        { title: "Initiation & Requirement Understanding", icon: Lightbulb },
        { title: "Planning Integration & Scope Alignment", icon: Target },
        { title: "Execution Oversight & Coordination", icon: Activity },
        { title: "Performance Monitoring & Reporting", icon: BarChart2 },
        { title: "Change & Risk Management", icon: ShieldAlert },
        { title: "Final Delivery & Project Close-Out", icon: CheckCircle }
    ];

    return (
        <div className="min-h-screen bg-blue-pattern text-white overflow-x-hidden font-sans selection:bg-blue-500/30">
            {/* 1. HERO SECTION */}
            <div className="[&>div]:!min-h-[72vh] landscape:[&>div]:!min-h-[88vh] [&>div]:sm:!min-h-screen">
                <PageHero
                    title="Project"
                    subtitle="Management"
                    description="Driving coordinated, efficient, and predictable project delivery through strategic leadership and disciplined oversight."
                    headingClassName="text-5xl landscape:text-4xl landscape:leading-tight sm:text-7xl"
                    images={[
                        `${import.meta.env.BASE_URL}project-management-hero.webp`,
                        `${import.meta.env.BASE_URL}project-planning-hero-1.webp`,
                        `${import.meta.env.BASE_URL}project-planning-hero-2.webp`,
                        `${import.meta.env.BASE_URL}project-execution-hero.webp`,
                        `${import.meta.env.BASE_URL}contract-management-hero.webp`
                    ]}
                    bgImage={`${import.meta.env.BASE_URL}project-management-hero.webp`}
                    badgeText="Project Leadership"
                    scrollTargetId="content"
                    layout="mosaic-5"
                    showContactButton={false}
                    stats={{
                        mainValue: "35%",
                        mainLabel: "Higher Efficiency",
                        satisfaction: "100%",
                        grid: [
                            { value: "100%", label: "Clarity" },
                            { value: "Real-time", label: "Data" },
                            { value: "Total", label: "Control" }
                        ]
                    }}
                />
            </div>

            <div id="content"></div>


            {isLoaded && (
                <>

                    {/* 2. VALUE METRICS STRIP */}
                    <section className="relative z-20 -mt-24 pb-10 pt-24 border-b border-white/5 bg-gradient-to-b from-transparent via-black/80 to-black backdrop-blur-sm animate-in fade-in duration-1000"
                        style={{
                            maskImage: "linear-gradient(to bottom, transparent, black 20%)",
                            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%)"
                        }}
                    >
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center lg:divide-x divide-white/10">
                                <div className="p-2.5">
                                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-1.5"><CountUp end={40} suffix="%" /></h3>
                                    <p className="text-gray-400 text-[11px] sm:text-sm uppercase tracking-wider">Faster Decision Cycles</p>
                                </div>
                                <div className="p-2.5">
                                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-1.5"><CountUp end={85} suffix="%" /></h3>
                                    <p className="text-gray-400 text-[11px] sm:text-sm uppercase tracking-wider">Reduction in Coordination Delays</p>
                                </div>
                                <div className="p-2.5">
                                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-1.5"><CountUp end={95} suffix="%" /></h3>
                                    <p className="text-gray-400 text-[11px] sm:text-sm uppercase tracking-wider">Milestone Achievement Accuracy</p>
                                </div>
                                <div className="p-2.5">
                                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-1.5"><CountUp end={90} suffix="%" />+</h3>
                                    <p className="text-gray-400 text-[11px] sm:text-sm uppercase tracking-wider">Multi-Stakeholder Alignment Score</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 3. CORE SERVICES */}
                    <section className="py-10 md:py-24 px-4 md:px-12 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-100">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto px-0 md:px-6">
                                <div className="text-center mb-8 md:mb-20">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2 leading-tight">Key Deliverables</h2>
                                    <p className="text-sm sm:text-base text-gray-400 mt-3 sm:mt-4 max-w-2xl mx-auto">Ensuring clarity and control throughout the project lifecycle.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                                    {coreServices.map((service, index) => (
                                        <div key={index} className="group relative p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:to-blue-600/10 hover:border-blue-500/30 transition-all duration-500 overflow-hidden animated-white-border">
                                            {/* Large Background Icon */}
                                            <div className="absolute -bottom-10 -right-10 text-white/5 group-hover:text-blue-500/10 transition-colors duration-500 pointer-events-none transform rotate-12">
                                                <service.icon size={180} />
                                            </div>

                                            <div className="relative z-10">
                                                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl mb-4 sm:mb-6 bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.1)]">
                                                    <service.icon className="w-5 h-5 sm:w-7 sm:h-7 text-blue-400 group-hover:text-white transition-colors" />
                                                </div>

                                                <h3 className="text-lg sm:text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{service.title}</h3>
                                                <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-8 leading-relaxed h-auto sm:h-14">{service.desc}</p>

                                                <div className="bg-black/20 rounded-xl p-4 sm:p-6 border border-white/5 group-hover:border-white/10 transition-colors">
                                                    <h4 className="text-xs sm:text-sm font-semibold text-gray-300 mb-3 sm:mb-4 uppercase tracking-wide">Includes:</h4>
                                                    <ul className="grid grid-cols-1 gap-2.5 sm:gap-3">
                                                        {service.items.map((item, idx) => (
                                                            <li key={idx} className="flex items-start text-xs sm:text-sm text-gray-400">
                                                                <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 mt-0.5 text-blue-500 shrink-0" />
                                                                {item.text}
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

                    {/* 4. SPECIALIZED SERVICES */}
                    <section className="py-10 md:py-24 px-4 md:px-12 bg-white/[0.02] animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-200">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto">
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-4 sm:pb-12 mb-5 sm:mb-8 border-b border-white/10">Specialized Project Management Services</h2>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                                    {specializedServices.map((service, index) => (
                                        <div key={index} className="group relative p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:to-blue-600/10 hover:border-blue-500/30 transition-all duration-500 overflow-hidden animated-white-border">
                                            <div className="absolute -bottom-10 -right-10 text-white/5 group-hover:text-blue-500/10 transition-colors duration-500 pointer-events-none transform rotate-12">
                                                <service.icon size={180} />
                                            </div>

                                            <div className="relative z-10">
                                                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl mb-4 sm:mb-6 bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.1)]">
                                                    <service.icon className="w-5 h-5 sm:w-7 sm:h-7 text-blue-400 group-hover:text-white transition-colors" />
                                                </div>

                                                <h3 className="text-lg sm:text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{service.title}</h3>
                                                <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-8 leading-relaxed h-auto sm:h-14">{service.desc}</p>

                                                <div className="bg-black/20 rounded-xl p-4 sm:p-6 border border-white/5 group-hover:border-white/10 transition-colors">
                                                    <h4 className="text-xs sm:text-sm font-semibold text-gray-300 mb-3 sm:mb-4 uppercase tracking-wide">Key Focus Areas:</h4>
                                                    <ul className="grid grid-cols-1 gap-2.5 sm:gap-3">
                                                        {service.items.map((item, idx) => (
                                                            <li key={idx} className="flex items-start text-xs sm:text-sm text-gray-400">
                                                                <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 mt-0.5 text-blue-500 shrink-0" />
                                                                {item.text}
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

                    {/* 5. COMPARISON SECTION (PRESERVED) */}
                    <section className="py-10 md:py-16 px-4 md:px-6 relative z-10 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-300">
                        <div className="max-w-7xl mx-auto relative">
                            {/* Blue Circular Gradient Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

                            <RevealOnScroll>
                                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-16 bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2">
                                    Why Professional Project Management Matters
                                </h2>
                            </RevealOnScroll>

                            <RevealOnScroll>
                                <div className="group relative p-3.5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-xl overflow-hidden hover:to-blue-600/10 transition-all duration-500">

                                    <h3 className="text-xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-10 pb-1.5 sm:pb-2 relative z-10 bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white text-left">Project Efficiency Comparison</h3>

                                    <div className="space-y-3 sm:space-y-6 relative z-10">
                                        <div className="rounded-xl border border-red-500/25 bg-red-900/15 px-3 py-3.5 sm:px-4 sm:py-4">
                                            <div className="mb-2.5 flex items-center justify-between gap-2.5">
                                                <span className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap pr-2 text-[11px] sm:text-sm font-semibold tracking-[0.04em] text-red-100/90">Without Professional Management</span>
                                                <span className="shrink-0 whitespace-nowrap text-base sm:text-lg font-bold text-red-100">60 days</span>
                                            </div>
                                            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                                                <div className="h-full w-[42%] rounded-full bg-gradient-to-r from-red-500/70 to-red-400/80"></div>
                                            </div>
                                        </div>

                                        <div className="rounded-xl border border-blue-500/40 bg-blue-600/15 px-3 py-3.5 shadow-[0_0_20px_rgba(37,99,235,0.2)] sm:px-4 sm:py-4">
                                            <div className="mb-2.5 flex items-center justify-between gap-2.5">
                                                <span className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap pr-2 text-xs sm:text-base font-bold text-white">With MANO Consultants</span>
                                                <span className="shrink-0 whitespace-nowrap text-2xl sm:text-3xl font-extrabold text-white leading-none">30 days</span>
                                            </div>
                                            <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                                                <div className="h-full w-[88%] rounded-full bg-gradient-to-r from-blue-500 to-blue-300"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        </div>
                    </section>

                    {/* DIGITAL ERP SECTION */}
                    <RevealOnScroll>
                        <DigitalERPSection
                            title={`Specialized <span class="text-blue-500">Project ERP</span> <br /> Management Systems`}
                            description="We leverage a specialized ERP for real-time project management tracking, ensuring every milestone, budget, and stakeholder interaction is documented and optimized for efficiency."
                            features={[
                                { title: "Milestone Progress Dashboards", icon: BarChart2 },
                                { title: "Stakeholder Communication Logs", icon: Users },
                                { title: "KPI & Performance Trackers", icon: TrendingUp },
                                { title: "Resource Allocation Analytics", icon: Layers },
                            ]}
                        />
                    </RevealOnScroll>

                    {/* 6. WHY MANO */}
                    <section className="py-10 md:py-24 px-4 md:px-12 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-400">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center">
                                <div>
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-3 mb-5 leading-tight">
                                        Why MANO for <span className="text-blue-500 block sm:inline lg:block">Project Management?</span>
                                    </h2>
                                    <div className="space-y-4 sm:space-y-8">
                                        {[
                                            { title: "Strategic Oversight", text: "Big-picture management that ensures all project components move in harmony.", icon: Target },
                                            { title: "Resource Optimization", text: "Expert allocation of manpower and materials to maximize productivity.", icon: Users },
                                            { title: "Risk Mitigation", text: "Proactive identification and neutralisation of potential project bottlenecks.", icon: ShieldCheck },
                                            { title: "Seamless Integration", text: "Bridging the gap between design, procurement, and execution teams.", icon: Layers },
                                        ].map((item, index) => (
                                            <div key={index} className="flex gap-3 sm:gap-4 group rounded-xl p-3 sm:p-4 transition-all hover:bg-white/5 border border-transparent hover:border-white/10 animated-white-border">
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-blue-500/30 bg-blue-500/10 flex items-center justify-center shrink-0 text-blue-400">
                                                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                                </div>
                                                <div>
                                                    <h4 className="text-lg sm:text-xl font-bold text-white mb-1.5 sm:mb-2">{item.title}</h4>
                                                    <p className="text-sm sm:text-base text-gray-400">{item.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none"></div>
                                    <div className="relative z-10 grid grid-cols-2 gap-3">
                                        <div className="space-y-3 mt-6">
                                            <div className="h-52 sm:h-64 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-4 sm:p-6 flex flex-col justify-end">
                                                <span className="text-3xl sm:text-4xl font-bold text-white mb-1.5 sm:mb-2">100%</span>
                                                <span className="text-sm text-gray-400">Reliability</span>
                                            </div>
                                            <div className="h-32 sm:h-40 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-4 sm:p-6 flex flex-col justify-center">
                                                <span className="text-white text-base sm:text-lg font-bold">Zero<br />Delays</span>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="h-32 sm:h-40 rounded-2xl bg-[#111] border border-white/10 p-4 sm:p-6 flex flex-col justify-center">
                                                <Activity className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500 mb-3 sm:mb-4" />
                                                <span className="text-sm sm:text-base text-gray-300 font-medium">Quality Guaranteed</span>
                                            </div>
                                            <div className="h-52 sm:h-64 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-4 sm:p-6 flex flex-col justify-end">
                                                <span className="text-3xl sm:text-4xl font-bold text-white mb-1.5 sm:mb-2">Total</span>
                                                <span className="text-sm text-gray-400">Handover Ready</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </section>

                    {/* 7. PROJECT TYPES */}
                    <ProjectTypes
                        compactMobile
                        title="Project Types We Manage"
                        items={[
                            {
                                name: "Residential High-Rise & Luxury",
                                desc: "Complex housing societies and premium developments.",
                                image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Commercial & Corporate",
                                desc: "Office buildings, IT parks, and retail spaces.",
                                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Industrial & Manufacturing",
                                desc: "Factories, plants, and large-scale industrial units.",
                                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Hospitality Projects",
                                desc: "Luxury hotels, resorts, and guest houses.",
                                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Institutional & Infrastructure",
                                desc: "Campuses, public infrastructure, and roads.",
                                image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=800&h=600&auto=format&fit=crop"
                            }
                        ]}
                    />

                    {/* 8. PROCESS FLOW - Horizontal Glowing Timeline */}
                    <section className="py-12 md:py-24 px-4 md:px-6 overflow-x-hidden animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-600">
                        <div className="max-w-7xl mx-auto">
                            <RevealOnScroll>
                                <div className="text-center mb-8 md:mb-24">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 sm:mt-4 leading-tight">Project Management Process Flow</h2>
                                </div>
                            </RevealOnScroll>

                            <div className="relative">
                                {/* Connecting Line (Desktop) */}
                                <div className="hidden md:block absolute top-[2.5rem] left-0 w-full h-1 bg-gradient-to-r from-blue-900 via-blue-500 to-blue-900 opacity-30"></div>

                                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 sm:gap-8 relative z-10">
                                    {processFlow.map((step, i) => (
                                        <RevealOnScroll key={i}>
                                            <div className="flex flex-col items-center text-center group">
                                                {/* Number Node */}
                                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black border-2 border-blue-500/30 flex items-center justify-center text-xl sm:text-2xl font-bold text-blue-500 mb-4 sm:mb-8 group-hover:border-blue-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300 relative z-10 box-content">
                                                    {i + 1}
                                                    <div className="absolute inset-2 rounded-full border border-white/10"></div>
                                                </div>

                                                {/* Content */}
                                                <div className="relative p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 w-full backdrop-blur-md group-hover:to-blue-600/10 group-hover:border-blue-500/30 transition-all duration-300 min-h-[120px] sm:min-h-[140px] flex items-center justify-center">
                                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white/10"></div>
                                                    <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-300 transition-colors leading-tight">{step.title}</h3>
                                                </div>
                                            </div>
                                        </RevealOnScroll>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 9. TRUST STATEMENT */}
                    <section className="py-10 md:py-24 px-4 md:px-12 text-center animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-700">
                        <div className="max-w-4xl mx-auto p-4 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:to-blue-600/10 hover:border-blue-500/30 transition-all duration-500 backdrop-blur-md group">
                            <p className="text-base sm:text-xl md:text-3xl font-medium text-white leading-relaxed group-hover:text-blue-100 transition-colors">
                                "MANO is trusted by developers, contractors, and institutions for delivering structured, high-performance project management backed by discipline, clarity, and accountability."
                            </p>
                        </div>
                    </section>

                    <section className="py-10 md:py-24 relative overflow-hidden animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-800">
                        <div className="absolute inset-0 bg-blue-900/20"></div>
                        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
                            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-5 sm:mb-6 leading-tight">Lead Your Project Toward Certainty.</h2>
                            <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-10 max-w-2xl mx-auto">
                                Partner with MANO Consultants to manage your project with precision and confidence.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-6">
                                <div onClick={() => setIsContactOpen(true)}>
                                    <RainbowButton buttonClassName="px-3 py-2 sm:px-8 sm:py-4 text-xs sm:text-lg">
                                        <span className="flex items-center text-xs sm:text-lg font-semibold px-0.5 sm:px-4">
                                            Start Your Project <ChevronRight className="ml-1.5 w-3.5 h-3.5 sm:ml-2 sm:w-5 sm:h-5" />
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
                initialService="Project Management"
            />
        </div>
    );
};

export default ProjectManagementMobile;

