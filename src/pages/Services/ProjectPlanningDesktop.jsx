import { useState, useEffect, useRef } from 'react';
import {
    ChevronRight, Calendar, Users, FileText, AlertTriangle, TrendingUp, Calculator,
    Shield, Briefcase, BarChart, Search, CheckCircle, Flag, Building, Factory, Hotel,
    Layers, Zap, Activity, BarChart2, Clock
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

const CountUp = ({ end, duration = 2000 }) => {
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

    return <span ref={ref}>{count}</span>;
};



const ProjectPlanningDesktop = () => {
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
            title: "Master Project Scheduling",
            desc: "Development of detailed, realistic schedules aligned with project scope, resources, and milestones.",
            items: [
                { text: "Project timeline development", icon: Calendar },
                { text: "Milestone planning", icon: Flag },
                { text: "Activity sequencing", icon: Layers },
                { text: "Schedule optimization", icon: Zap }
            ],
            icon: Calendar
        },
        {
            title: "Resource & Manpower Planning",
            desc: "Efficient allocation of manpower, equipment, and materials to prevent bottlenecks and delays.",
            items: [
                { text: "Resource loading", icon: Users },
                { text: "Workforce planning", icon: Briefcase },
                { text: "Equipment utilization", icon: Zap },
                { text: "Productivity analysis", icon: BarChart }
            ],
            icon: Users
        },
        {
            title: "Methodology & Execution Planning",
            desc: "Defining execution strategies that align construction methods with project objectives.",
            items: [
                { text: "Construction methodology planning", icon: Layers },
                { text: "Work breakdown structure (WBS)", icon: FileText },
                { text: "Sequence optimization", icon: TrendingUp },
                { text: "Constructability reviews", icon: Search }
            ],
            icon: Layers
        },
        {
            title: "Risk & Feasibility Analysis",
            desc: "Proactive identification of risks that could impact time, cost, or quality.",
            items: [
                { text: "Risk identification & ranking", icon: AlertTriangle },
                { text: "Feasibility assessments", icon: Search },
                { text: "Mitigation strategy development", icon: Shield },
                { text: "Contingency planning", icon: FileText }
            ],
            icon: AlertTriangle
        }
    ];

    const specializedServices = [
        {
            title: "CPM & PERT Scheduling",
            desc: "Advanced scheduling techniques to manage complex, time-sensitive projects.",
            items: [
                { text: "Critical path identification", icon: TrendingUp },
                { text: "Float analysis", icon: BarChart },
                { text: "Delay impact studies", icon: AlertTriangle },
                { text: "Schedule recovery planning", icon: Calendar }
            ],
            icon: TrendingUp
        },
        {
            title: "Cost-Integrated Planning",
            desc: "Aligning project schedules with budget forecasts to ensure financial control.",
            items: [
                { text: "Time-cost optimization", icon: Calculator },
                { text: "Cash flow forecasting", icon: BarChart },
                { text: "Budget-aligned scheduling", icon: FileText },
                { text: "Cost impact analysis", icon: AlertTriangle }
            ],
            icon: Calculator
        },
        {
            title: "Planning Review & Optimization",
            desc: "Independent planning reviews to improve efficiency and eliminate risks.",
            items: [
                { text: "Schedule validation", icon: CheckCircle },
                { text: "Productivity benchmarking", icon: TrendingUp },
                { text: "Planning gap analysis", icon: Search },
                { text: "Optimization recommendations", icon: Zap }
            ],
            icon: CheckCircle
        }
    ];

    const processFlow = [
        { title: "Project Requirement Analysis", icon: Search },
        { title: "Scope & Methodology Definition", icon: FileText },
        { title: "Detailed Schedule Development", icon: Calendar },
        { title: "Resource & Risk Planning", icon: Users },
        { title: "Plan Review & Optimization", icon: CheckCircle },
        { title: "Execution-Ready Planning Delivery", icon: Flag }
    ];

    return (
        <div className="min-h-screen bg-blue-pattern text-white overflow-x-hidden font-sans selection:bg-blue-500/30">
            {/* 1. HERO SECTION */}
            <PageHero
                title="Project"
                subtitle="Planning"
                description="Prepare, Monitor and Control of Macro Planning in Microsoft Project with Program Evaluation Review Technique, Prepare, Monitor and Control of Site Logistics, Material Histogram, Manpower Histogram"
                images={[
                    `${import.meta.env.BASE_URL}project-planning-hero-1.webp`,
                    `${import.meta.env.BASE_URL}project-planning-hero-2.webp`,
                    `${import.meta.env.BASE_URL}project-planning-hero-3.webp`
                ]}
                layout="split"
                bgImage={`${import.meta.env.BASE_URL}project-planning-hero.webp`}
                badgeText="CPM & PERT Planning"
                scrollTargetId="content"
                showContactButton={false}
                stats={{
                    mainValue: "500+",
                    mainLabel: "Projects Planned",
                    satisfaction: "95%",
                    grid: [
                        { value: "12+", label: "Years Exp" },
                        { value: "100%", label: "Success" },
                        { value: "24/7", label: "Support" }
                    ]
                }}
            />

            <div id="content"></div>

            {isLoaded && (
                <>
                    {/* 2. STATS STRIP */}
                    <section className="relative z-20 -mt-32 pb-16 pt-32 border-b border-white/5 bg-gradient-to-b from-transparent via-black/80 to-black backdrop-blur-sm animate-in fade-in duration-1000"
                        style={{
                            maskImage: "linear-gradient(to bottom, transparent, black 20%)",
                            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%)"
                        }}
                    >
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center lg:divide-x divide-white/10">
                                <div className="p-4">
                                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-2"><CountUp end={12} />+</h3>
                                    <p className="text-gray-400 text-sm uppercase tracking-wider">Years of Planning Expertise</p>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-2"><CountUp end={500} />+</h3>
                                    <p className="text-gray-400 text-sm uppercase tracking-wider">Project Plans Delivered</p>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-2"><CountUp end={100} />+</h3>
                                    <p className="text-gray-400 text-sm uppercase tracking-wider">Projects Successfully Planned</p>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-2"><CountUp end={95} />%</h3>
                                    <p className="text-gray-400 text-sm uppercase tracking-wider">Schedule Adherence Rate</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="py-16 md:py-24 px-6 md:px-12 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-100">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-16">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2 leading-tight">Core Planning Services</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {[
                                        {
                                            title: "Strategic Planning",
                                            desc: "Macro planning and schedule alignment using MSP & PERT.",
                                            items: [
                                                "Prepare Macro planning as per management requirement in MSP with PERT technique.",
                                                "Co-relating programme schedule prepared by contractors with Project schedule."
                                            ],
                                            icon: Calendar
                                        },
                                        {
                                            title: "Resource & Logistics",
                                            desc: "Optimizing manpower, materials, and site logistics.",
                                            items: [
                                                "Train, review, Monitor & tracking of Manpower Histogram & Material Histogram.",
                                                "Train, review, Monitor & tracking of Logistic Plan."
                                            ],
                                            icon: Users
                                        },
                                        {
                                            title: "Procurement & Systems",
                                            desc: "Managing long-lead items and commissioning schedules.",
                                            items: [
                                                "Check and track all long leads items for procurement of material & equipment.",
                                                "Prepare testing and commissioning schedule for capital Equipment & engineering systems."
                                            ],
                                            icon: Zap
                                        },
                                        {
                                            title: "Progress Monitoring",
                                            desc: "Continuous tracking, review, and reporting of project progress.",
                                            items: [
                                                "Review fortnightly progress of the contractor, compare with planned programme.",
                                                "Conduct fortnightly site meetings to monitor work & co-ordinate agencies.",
                                                "Monitor progress against timelines and advise on deviations/delays.",
                                                "Maintaining Hindrance Report to update regarding Project delaying."
                                            ],
                                            icon: CheckCircle
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
                                                    <ul className="grid grid-cols-1 gap-3">
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

                    {/* DIGITAL ERP SECTION */}
                    <RevealOnScroll>
                        <DigitalERPSection
                            title={`Specialized <span class="text-blue-500">Planning ERP</span> <br /> Control Systems`}
                            description="We use advanced ERP integration to track schedule adherence, resource histograms, and critical path performance, ensuring your project timeline is predictable and resilient."
                            features={[
                                { title: "Schedule Adherence Dashboards", icon: BarChart2 },
                                { title: "Resource Histogram Tracking", icon: Users },
                                { title: "CPM/PERT Analytics", icon: TrendingUp },
                                { title: "Timeline Prediction Models", icon: Clock },
                            ]}
                        />
                    </RevealOnScroll>

                    {/* 5. WHY MANO */}
                    <section className="py-16 md:py-24 px-6 md:px-12 bg-white/[0.02] animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-300">
                        <div className="max-w-7xl mx-auto">
                            <RevealOnScroll>
                                <div className="mb-12 md:mb-16">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">Why MANO for <span className="text-blue-500">Project Planning?</span></h2>
                                </div>
                            </RevealOnScroll>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { title: "Execution-Oriented Planning", text: "Plans designed not just to look good on paper, but to work on site.", icon: Flag },
                                    { title: "Risk-Aware Frameworks", text: "Early identification and mitigation of planning risks.", icon: AlertTriangle },
                                    { title: "Integrated Expertise", text: "Planning aligned with cost, quality, and contract management.", icon: Briefcase },
                                    { title: "Data-Driven Decisions", text: "Planning backed by analytics, benchmarks, and industry best practices.", icon: BarChart },
                                ].map((item, index) => (
                                    <RevealOnScroll key={index}>
                                        <div className="p-8 h-full rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-md hover:to-blue-600/10 hover:border-blue-500/30 transition-all duration-300 flex flex-col items-start gap-6 group animated-white-border">
                                            <div className="p-4 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.1)]">
                                                <item.icon size={32} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">{item.title}</h3>
                                                <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
                                            </div>
                                        </div>
                                    </RevealOnScroll>
                                ))}
                            </div>
                        </div>
                    </section>



                    {/* COMPARISON SECTION */}
                    <section className="py-16 md:py-24 px-6 md:px-12 bg-white/5 backdrop-blur-sm border-y border-white/5 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-400">
                        <div className="max-w-7xl mx-auto">
                            <RevealOnScroll>
                                <div className="text-center mb-12 md:mb-16">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2 leading-tight">Impact of Professional Planning</h2>
                                </div>
                            </RevealOnScroll>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
                                {/* LEFT: RED BAR (Without Planning) */}
                                <RevealOnScroll>
                                    <div className="h-full bg-gradient-to-b from-red-950/30 to-black p-10 rounded-[2.5rem] border border-red-500/20 text-center relative overflow-hidden group hover:border-red-500/50 transition-all duration-500 flex flex-col">
                                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>

                                        <div className="relative z-10 flex flex-col h-full">
                                            <div className="mb-8 p-4 bg-red-500/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto border border-red-500/20">
                                                <AlertTriangle className="w-10 h-10 text-red-500" />
                                            </div>
                                            <h3 className="text-3xl font-bold text-red-500 mb-8">Without Professional Planning</h3>

                                            <ul className="space-y-5 text-left w-full pl-4 grow">
                                                <li className="flex items-start text-gray-300 text-lg"><span className="text-red-500 mr-3 text-xl">✕</span> Frequent project delays & missed deadlines</li>
                                                <li className="flex items-start text-gray-300 text-lg"><span className="text-red-500 mr-3 text-xl">✕</span> Resource bottlenecks & inefficiency</li>
                                                <li className="flex items-start text-gray-300 text-lg"><span className="text-red-500 mr-3 text-xl">✕</span> Significant cost overruns & budget leaks</li>
                                                <li className="flex items-start text-gray-300 text-lg"><span className="text-red-500 mr-3 text-xl">✕</span> Unpredictable outcomes & high risk</li>
                                                <li className="flex items-start text-gray-300 text-lg"><span className="text-red-500 mr-3 text-xl">✕</span> Disconnected execution strategy</li>
                                            </ul>

                                            <div className="mt-8 pt-8 border-t border-red-500/20">
                                                <p className="text-red-400 font-bold text-xl uppercase tracking-wide">Result: Chaotic execution with high financial risk.</p>
                                            </div>
                                        </div>
                                    </div>
                                </RevealOnScroll>

                                {/* RIGHT: BLUE BAR (With MANO) */}
                                <RevealOnScroll>
                                    <div className="h-full bg-gradient-to-b from-blue-950/30 to-black p-10 rounded-[2.5rem] border border-blue-500/30 text-center relative overflow-hidden group hover:border-blue-400 transition-all duration-500 flex flex-col shadow-[0_0_50px_rgba(37,99,235,0.1)]">
                                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

                                        <div className="relative z-10 flex flex-col h-full">
                                            <div className="mb-8 p-4 bg-blue-500/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                                                <CheckCircle className="w-10 h-10 text-blue-400" />
                                            </div>
                                            <h3 className="text-3xl font-bold text-blue-400 mb-8">With MANO Planning Services</h3>

                                            <ul className="space-y-5 text-left w-full pl-4 grow">
                                                <li className="flex items-start text-gray-100 text-lg"><CheckCircle className="w-6 h-6 text-blue-400 mr-3 shrink-0" /> Realistic & achievable project schedules</li>
                                                <li className="flex items-start text-gray-100 text-lg"><CheckCircle className="w-6 h-6 text-blue-400 mr-3 shrink-0" /> Optimized resource allocation & utilization</li>
                                                <li className="flex items-start text-gray-100 text-lg"><CheckCircle className="w-6 h-6 text-blue-400 mr-3 shrink-0" /> Proactive risk mitigation & control</li>
                                                <li className="flex items-start text-gray-100 text-lg"><CheckCircle className="w-6 h-6 text-blue-400 mr-3 shrink-0" /> Guaranteed on-time project delivery</li>
                                                <li className="flex items-start text-gray-100 text-lg"><CheckCircle className="w-6 h-6 text-blue-400 mr-3 shrink-0" /> Seamless execution coordination</li>
                                            </ul>

                                            <div className="mt-8 pt-8 border-t border-blue-500/30 bg-blue-500/5 -mx-10 -mb-10 p-10">
                                                <p className="text-blue-300 font-bold text-xl uppercase tracking-wide">Result: Seamless execution producing predictable success.</p>
                                            </div>
                                        </div>
                                    </div>
                                </RevealOnScroll>
                            </div>
                        </div>

                    </section>
                    {/* 7. PROJECT TYPES */}
                    <ProjectTypes
                        title="Project Types We Plan For"
                        items={[
                            {
                                name: "Residential & Mixed-Use",
                                desc: "High-rise apartments, townships, and integrated developments.",
                                image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Commercial & Corporate",
                                desc: "Office parks, IT campuses, and retail complexes.",
                                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Industrial Facilities",
                                desc: "Factories, warehouses, and logistic hubs.",
                                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Hospitality Projects",
                                desc: "Hotels, resorts, and leisure destinations.",
                                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Infrastructure & Institutional",
                                desc: "Roads, bridges, public infrastructure, and institutions.",
                                image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=800&h=600&auto=format&fit=crop"
                            }
                        ]}
                    />

                    {/* 7. PROCESS FLOW */}
                    <section className="py-24 px-12 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-600">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-20">
                                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-4 leading-normal">Project Planning Process Flow</h2>
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
                    {/* 6. WHY MANO */}
                    <section className="py-16 md:py-24 px-6 md:px-12 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-400">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                                <div>
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-6 mb-8 leading-tight">
                                        Why MANO for <span className="text-blue-500 block sm:inline lg:block">Project Planning?</span>
                                    </h2>
                                    <div className="space-y-8">
                                        {[
                                            { title: "Micro-Level Detail", text: "Our plans go beyond surface level to identify every critical interface.", icon: Search },
                                            { title: "Resource Optimization", text: "Aligning equipment and labor with the project's most critical tasks.", icon: Layers },
                                            { title: "Critical Path Focus", text: "Identifying and protecting the activities that drive your completion date.", icon: TrendingUp },
                                            { title: "Data-Driven Decisions", text: "Transforming raw site data into actionable planning insights.", icon: Activity },
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
                                                <span className="text-4xl font-bold text-white mb-2">20%</span>
                                                <span className="text-sm text-gray-400">Faster Delivery</span>
                                            </div>
                                            <div className="h-40 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-6 flex flex-col justify-center">
                                                <span className="text-white text-lg font-bold">Resource<br />Balanced</span>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="h-40 rounded-2xl bg-[#111] border border-white/10 p-6 flex flex-col justify-center">
                                                <Calendar className="w-10 h-10 text-blue-500 mb-4" />
                                                <span className="text-gray-300 font-medium">100% Reliable</span>
                                            </div>
                                            <div className="h-64 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 flex flex-col justify-end">
                                                <span className="text-4xl font-bold text-white mb-2">Total</span>
                                                <span className="text-sm text-gray-400">Logistical Harmony</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </section>

                    {/* 8. TRUST STATEMENT */}
                    <section className="py-16 md:py-24 px-6 md:px-12 text-center animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-700">
                        <div className="max-w-4xl mx-auto p-8 md:p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:to-blue-600/10 hover:border-blue-500/30 transition-all duration-500 backdrop-blur-md group">
                            <p className="text-xl md:text-3xl font-medium text-white leading-relaxed group-hover:text-blue-100 transition-colors">
                                "MANO Project Consultants is trusted for delivering realistic, reliable, and execution-focused project planning solutions that enable successful project outcomes."
                            </p>
                        </div>
                    </section>

                    {/* 9. CTA */}
                    <section className="py-16 md:py-24 relative overflow-hidden animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-800">
                        <div className="absolute inset-0 bg-blue-900/20"></div>
                        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">Plan Smart. Execute with Confidence.</h2>
                            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                                Partner with MANO Project Consultants to build a strong planning foundation for your project.
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
                initialService="Project Planning"
            />
        </div>
    )
}

export default ProjectPlanningDesktop;

