import { useState, useEffect, useRef } from 'react';
import {
    ChevronRight, Calendar, Clock, ClipboardList, Layers,
    Activity, Users, TrendingUp, FastForward, ShieldAlert, Ruler,
    Flag, Truck, ShieldCheck, Zap, CheckCircle,
    HardHat, FileText, ListOrdered, Link as LinkIcon, Target, BarChart2,
    Gauge, Wrench, MessageSquare, AlertCircle, Award, DollarSign,
    Shield, RefreshCw, Layout
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



const ProjectExecutionTablet = () => {
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const coreServices = [
        {
            title: "Execution Planning & Coordination",
            desc: "Establishing clear execution strategies that align planning, design, and site activities.",
            items: [
                { text: "Execution methodology definition", icon: FileText },
                { text: "Work sequencing & coordination", icon: ListOrdered },
                { text: "Interface management", icon: LinkIcon },
                { text: "Milestone alignment", icon: Target }
            ],
            icon: ClipboardList
        },
        {
            title: "Site Monitoring & Progress Control",
            desc: "Continuous monitoring to track progress, identify deviations, and maintain execution momentum.",
            items: [
                { text: "Daily & weekly progress tracking", icon: Calendar },
                { text: "Schedule variance analysis", icon: BarChart2 },
                { text: "Productivity monitoring", icon: Gauge },
                { text: "Corrective action implementation", icon: Wrench }
            ],
            icon: Activity
        },
        {
            title: "Stakeholder & Contractor Management",
            desc: "Ensuring seamless coordination among contractors, consultants, and project stakeholders.",
            items: [
                { text: "Contractor coordination", icon: HardHat },
                { text: "Communication management", icon: MessageSquare },
                { text: "Issue resolution", icon: AlertCircle },
                { text: "Performance evaluation", icon: Award }
            ],
            icon: Users
        },
        {
            title: "Time & Cost Control During Execution",
            desc: "Maintaining strict control over time and cost parameters throughout execution.",
            items: [
                { text: "Schedule control", icon: Clock },
                { text: "Cost impact assessment", icon: DollarSign },
                { text: "Delay mitigation strategies", icon: Shield },
                { text: "Recovery planning", icon: RefreshCw }
            ],
            icon: TrendingUp
        }
    ];

    const specializedServices = [
        {
            title: "Schedule Recovery & Acceleration",
            desc: "Intervention strategies to recover lost time and restore project momentum.",
            items: [
                { text: "Delay analysis", icon: AlertCircle },
                { text: "Fast-tracking techniques", icon: FastForward },
                { text: "Resource reallocation", icon: Users },
                { text: "Revised execution sequencing", icon: Layers }
            ],
            icon: FastForward
        },
        {
            title: "Execution Risk Management",
            desc: "Identifying execution-stage risks and implementing preventive controls.",
            items: [
                { text: "Risk identification", icon: ShieldAlert },
                { text: "Impact assessment", icon: Activity },
                { text: "Mitigation planning", icon: ShieldCheck },
                { text: "Continuous monitoring", icon: HardHat }
            ],
            icon: ShieldAlert
        },
        {
            title: "Design-to-Site Alignment",
            desc: "Ensuring construction execution aligns fully with approved designs and specifications.",
            items: [
                { text: "Drawing coordination", icon: Layers },
                { text: "Change impact evaluation", icon: RefreshCw },
                { text: "Constructability reviews", icon: Ruler },
                { text: "Site clarification management", icon: MessageSquare }
            ],
            icon: Ruler
        }
    ];

    const processFlow = [
        { title: "Execution Strategy Finalization", icon: Flag },
        { title: "Site Mobilization & Coordination", icon: Truck },
        { title: "Progress Monitoring & Control", icon: Activity },
        { title: "Risk & Issue Management", icon: ShieldCheck },
        { title: "Schedule Recovery (if required)", icon: Zap },
        { title: "Execution Completion & Handover Support", icon: CheckCircle }
    ];

    return (
        <div className="min-h-screen bg-blue-pattern text-white overflow-x-hidden font-sans selection:bg-blue-500/30">
            {/* 1. HERO SECTION */}
            <PageHero
                title="Project"
                subtitle="Execution"
                description="Project Execution as per Drawing, Schedule of Planning and Methods"
                images={[
                    `${import.meta.env.BASE_URL}project-execution-1.webp`,
                    `${import.meta.env.BASE_URL}project-execution-2.webp`,
                    `${import.meta.env.BASE_URL}project-execution-3.webp`
                ]}
                bgImage={`${import.meta.env.BASE_URL}project-execution-hero.webp`}
                badgeText="Execution Excellence"
                scrollTargetId="content"
                layout="split-reverse"
                showContactButton={false}
                stats={{
                    mainValue: "100%",
                    mainLabel: "Quality",
                    satisfaction: "95%",
                    grid: [
                        { value: "30%", label: "Faster" },
                        { value: "0", label: "Failures" },
                        { value: "100%", label: "Safe" }
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
                            <div className="grid grid-cols-2 gap-8 text-center lg:divide-x divide-white/10">
                                <div className="p-4">
                                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-2"><CountUp end={95} suffix="%" /></h3>
                                    <p className="text-gray-400 text-sm uppercase tracking-wider">On-Time Project Delivery Rate</p>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-2"><CountUp end={90} suffix="%" />+</h3>
                                    <p className="text-gray-400 text-sm uppercase tracking-wider">Schedule Adherence Across Projects</p>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-2"><CountUp end={30} suffix="%" /></h3>
                                    <p className="text-gray-400 text-sm uppercase tracking-wider">Reduction in Execution Delays</p>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">Zero</h3>
                                    <p className="text-gray-400 text-sm uppercase tracking-wider">Critical Execution Failures</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="py-16 md:py-24 px-6 md:px-12 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-100">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-16">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2 leading-tight">Core Project Execution Services</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {[
                                        {
                                            title: "Site Mobilization & Supervision",
                                            desc: "Deployment of supervision teams and management of site activities.",
                                            items: [
                                                "Deployment of construction supervision team on site.",
                                                "Management, Coordination and checking of all construction activities on site."
                                            ],
                                            icon: HardHat
                                        },
                                        {
                                            title: "Planning & Interface",
                                            desc: "On-site planning and managing contractor interfaces.",
                                            items: [
                                                "Project planning and construction monitoring on site.",
                                                "Planning and managing of Contractor interfaces."
                                            ],
                                            icon: Layers
                                        },
                                        {
                                            title: "Quality & Material Control",
                                            desc: "Supervising quality of works and coordinating material supply.",
                                            items: [
                                                "Supervise Quality of works being executed on site.",
                                                "Co-ordinate with Store and purchase department for Supply of material as required."
                                            ],
                                            icon: ShieldCheck
                                        },
                                        {
                                            title: "Progress Reporting",
                                            desc: "Maintaining daily progress records and reporting mechanisms.",
                                            items: [
                                                "Maintain Daily Progress and Reporting mechanism on site."
                                            ],
                                            icon: ClipboardList
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
                                                    <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wide">Includes:</h4>
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

                    {/* 5. COMPARISON SECTION - CENTRAL AXIS STYLE */}
                    <section className="py-16 md:py-24 px-6 md:px-12 relative overflow-hidden animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-300">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-12 md:mb-16">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2 leading-tight">Why Structured Project Execution Matters</h2>
                                </div>

                                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                                    {/* Central Axis Line (Visible only on LG screens) */}
                                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2"></div>
                                    <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black border border-white/20 items-center justify-center z-10 text-gray-500 font-bold text-xs ring-4 ring-black">VS</div>

                                    {/* WITHOUT MANO (RED) */}
                                    <div className="space-y-6 text-right lg:pr-12 relative group">
                                        <div className="absolute inset-0 bg-red-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
                                        <h3 className="text-2xl font-bold text-red-500 mb-6">Without Professional Execution</h3>

                                        <div className="space-y-6">
                                            {[
                                                { text: "Frequent delays & missed deadlines", icon: Clock },
                                                { text: "Uncontrolled budget overruns", icon: DollarSign },
                                                { text: "Safety hazards & accidents", icon: ShieldAlert },
                                                { text: "Coordination failures between teams", icon: Users },
                                                { text: "Low build quality & rework", icon: Wrench }
                                            ].map((item, index) => (
                                                <div key={index} className="flex items-center justify-end gap-4 p-4 rounded-xl bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-300">
                                                    <span className="text-gray-400 font-medium">{item.text}</span>
                                                    <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                                                        <item.icon size={20} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-red-300 font-medium text-sm mt-6 italic">
                                            "Result: Chaos, higher costs, and unpredictable outcomes."
                                        </p>
                                    </div>

                                    {/* WITH MANO (BLUE) */}
                                    <div className="space-y-6 text-left lg:pl-12 relative group">
                                        <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
                                        <h3 className="text-2xl font-bold text-blue-500 mb-6">With MANO Execution Services</h3>

                                        <div className="space-y-6">
                                            {[
                                                { text: "Guaranteed on-time delivery", icon: CheckCircle },
                                                { text: "Strict adherence to budget", icon: DollarSign },
                                                { text: "Zero-accident safety protocols", icon: ShieldCheck },
                                                { text: "Full team synchronization", icon: Users },
                                                { text: "Premium quality assurance", icon: Award }
                                            ].map((item, index) => (
                                                <div key={index} className="flex items-center justify-start gap-4 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-300">
                                                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500 shrink-0">
                                                        <item.icon size={20} />
                                                    </div>
                                                    <span className="text-gray-200 font-medium">{item.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-blue-300 font-medium text-sm mt-6 italic">
                                            "Result: Predictable success, efficiency, and peace of mind."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </section>

                    {/* DIGITAL ERP SECTION */}
                    <RevealOnScroll>
                        <DigitalERPSection
                            title={`Specialized <span class="text-blue-500">Execution ERP</span> <br /> Monitoring Systems`}
                            description="Our specialized ERP tracks daily site activities, resource utilization, and work-flow performance to ensure seamless on-ground execution and zero delays."
                            features={[
                                { title: "Daily Progress Monitoring", icon: Activity },
                                { title: "Workflow Performance Analytics", icon: BarChart2 },
                                { title: "Resource Utilization Trackers", icon: Users },
                                { title: "Site Activity Dashboards", icon: Layout },
                            ]}
                        />
                    </RevealOnScroll>

                    {/* 6. WHY MANO */}
                    <section className="py-16 md:py-24 px-6 md:px-12 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-400">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                                <div>
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-6 mb-8 leading-tight">
                                        Why MANO for <span className="text-blue-500 block sm:inline lg:block">Project Execution?</span>
                                    </h2>
                                    <div className="space-y-8">
                                        {[
                                            { title: "On-Site Leadership", text: "Expert supervision that drives project discipline and contractor accountability.", icon: HardHat },
                                            { title: "Quality Discipline", text: "Strict adherence to methodology and material standards on the ground.", icon: ShieldCheck },
                                            { title: "Interface Management", text: "Seamlessly coordinating design, procurement, and site activities.", icon: Layers },
                                            { title: "Daily Progress Tracking", text: "Real-time visibility into site performance against planned timelines.", icon: Activity },
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
                                                <span className="text-4xl font-bold text-white mb-2">Zero</span>
                                                <span className="text-sm text-gray-400">Critical Failures</span>
                                            </div>
                                            <div className="h-40 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-6 flex flex-col justify-center">
                                                <span className="text-white text-lg font-bold">Quality<br />Assured</span>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="h-40 rounded-2xl bg-[#111] border border-white/10 p-6 flex flex-col justify-center">
                                                <Activity className="w-10 h-10 text-blue-500 mb-4" />
                                                <span className="text-gray-300 font-medium">Safety First</span>
                                            </div>
                                            <div className="h-64 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 flex flex-col justify-end">
                                                <span className="text-4xl font-bold text-white mb-2">100%</span>
                                                <span className="text-sm text-gray-400">Timely Milestones</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </section>

                    {/* 7. PROJECT TYPES */}
                    <ProjectTypes
                        title="Project Types We Execute"
                        items={[
                            {
                                name: "Residential & High-Rise",
                                desc: "Complex housing societies and high-rise developments.",
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
                                name: "Infrastructure & Institutional",
                                desc: "Roads, campuses, and public infrastructure.",
                                image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=800&h=600&auto=format&fit=crop"
                            }
                        ]}
                    />

                    {/* 8. PROCESS FLOW */}
                    <section className="py-24 px-6 bg-black relative overflow-hidden animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-600">
                        {/* Background Decor */}
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-900/50 to-transparent"></div>

                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-12 md:mb-20">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Project Execution <span className="text-blue-500">Process Flow</span></h2>
                                    <div className="h-1 w-24 bg-blue-500/30 mx-auto rounded-full"></div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {processFlow.map((step, index) => (
                                        <div key={index} className="group relative p-6 rounded-2xl border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all shadow-lg backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 hover:to-blue-600/10 group h-full">
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

                    {/* 9. TRUST STATEMENT */}
                    <section className="py-16 md:py-24 px-6 md:px-12 text-center animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-700">
                        <div className="max-w-4xl mx-auto p-8 md:p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:to-blue-600/10 hover:border-blue-500/30 transition-all duration-500 backdrop-blur-md group">
                            <p className="text-xl md:text-3xl font-medium text-white leading-relaxed group-hover:text-blue-100 transition-colors">
                                "MANO Project Consultants is trusted for delivering disciplined, execution-focused project management that ensures predictability, accountability, and successful outcomes on site."
                            </p>
                        </div>
                    </section>

                    {/* 10. CTA */}
                    <section className="py-16 md:py-24 relative overflow-hidden animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-800">
                        <div className="absolute inset-0 bg-blue-900/20"></div>
                        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">Execute with Precision. <br /> Deliver with Confidence.</h2>
                            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                                Partner with MANO Project Consultants to ensure flawless execution and timely project delivery.
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
                initialService="Project Execution"
            />
        </div >
    );
};

export default ProjectExecutionTablet;

