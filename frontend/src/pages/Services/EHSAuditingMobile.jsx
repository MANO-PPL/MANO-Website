import { useState, useEffect, useRef } from 'react';
import {
    ChevronRight, Shield, ShieldCheck, AlertTriangle, HardHat,
    CheckCircle, BarChart2, FileText, Search, Users, Activity,
    Target, Siren, BookOpen, ClipboardList, Zap, HeartPulse,
    Factory, BarChart3, Layout
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

const EHSAuditingMobile = () => {
    const [isContactOpen, setIsContactOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const coreServices = [
        {
            title: "Workplace Safety Evaluation",
            desc: "Comprehensive site inspections to identify hazards, unsafe behaviors, and system gaps.",
            items: [
                { text: "Safety walkthroughs", icon: HardHat },
                { text: "Hazard identification", icon: AlertTriangle },
                { text: "Unsafe act & condition reporting", icon: Siren },
                { text: "Emergency readiness checks", icon: Zap }
            ],
            icon: Shield
        },
        {
            title: "Regulatory & Compliance Audits",
            desc: "Ensuring your project aligns with national, local, and industry safety regulations.",
            items: [
                { text: "Regulatory compliance assessment", icon: BookOpen },
                { text: "Documentation & permit verification", icon: FileText },
                { text: "Legal requirement mapping", icon: Target },
                { text: "Audit compliance scoring", icon: CheckCircle }
            ],
            icon: ClipboardList
        },
        {
            title: "EHS Risk Assessment & Control",
            desc: "Identifying risk exposures and implementing preventive and corrective measures.",
            items: [
                { text: "Job Safety Analysis (JSA)", icon: Search },
                { text: "Work-at-height risk checks", icon: Activity },
                { text: "Environmental impact assessment", icon: Factory },
                { text: "Control measure recommendations", icon: ShieldCheck }
            ],
            icon: AlertTriangle
        },
        {
            title: "Safety Management System",
            desc: "Creating and deploying structured safety systems to ensure long-term compliance.",
            items: [
                { text: "SOP development", icon: FileText },
                { text: "Safety checklists & documentation", icon: ClipboardList },
                { text: "Safety communication frameworks", icon: Users },
                { text: "Safety culture development", icon: HeartPulse }
            ],
            icon: BarChart2
        }
    ];

    const specializedSupport = [
        {
            title: "EHS Training & Awareness",
            desc: "Empowering workforce and contractors with knowledge and best practices.",
            items: [
                { text: "Site-specific safety training", icon: HardHat },
                { text: "Hazard communication (HAZCOM)", icon: Siren },
                { text: "PPE training & safety drills", icon: Shield },
                { text: "Emergency response training", icon: Zap }
            ],
            icon: Users
        },
        {
            title: "Accident Investigation & RCA",
            desc: "Determining causes of incidents to prevent recurrence.",
            items: [
                { text: "Incident reporting & analysis", icon: AlertTriangle },
                { text: "Root cause identification", icon: Search },
                { text: "Corrective & preventive actions", icon: CheckCircle },
                { text: "Safety improvement plans", icon: Activity }
            ],
            icon: Search
        },
        {
            title: "Environmental Compliance",
            desc: "Ensuring minimal environmental impact and adherence to sustainability norms.",
            items: [
                { text: "Waste management audits", icon: Factory },
                { text: "Pollution control checks", icon: Activity },
                { text: "Environmental monitoring", icon: BarChart2 },
                { text: "Sustainable site practices", icon: Target }
            ],
            icon: Factory
        }
    ];

    const processFlow = [
        { title: "Pre-Audit Review & Requirement Understanding", icon: Search },
        { title: "On-Site Safety Inspection & Hazard Identification", icon: AlertTriangle },
        { title: "Regulatory Compliance Assessment", icon: ClipboardList },
        { title: "Risk Scoring & Recommendation Report", icon: BarChart2 },
        { title: "Training & Preventive Action Implementation", icon: HardHat },
        { title: "Follow-Up Audit & Compliance Confirmation", icon: CheckCircle }
    ];

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

    return (
        <div className="min-h-screen bg-blue-pattern text-white overflow-x-hidden font-sans selection:bg-blue-500/30">
            {/* 1. HERO SECTION */}
            <div className="[&>div]:!min-h-[72vh] landscape:[&>div]:!min-h-[88vh] [&>div]:sm:!min-h-screen">
                <PageHero
                    title="Environment, Health & Safety"
                    subtitle="Service & Audit"
                    description="Prepare, Monitor and Control of Environment, Health & Safety Plan, Matrix and Report"
                    headingClassName="text-5xl landscape:text-4xl landscape:leading-tight sm:text-7xl"
                    images={[
                        `${import.meta.env.BASE_URL}quality-control-hero.webp`,
                        `${import.meta.env.BASE_URL}qa-audit-hero.webp`,
                        `${import.meta.env.BASE_URL}ehs-audit-hero.webp`
                    ]}
                    bgImage={`${import.meta.env.BASE_URL}ehs-audit-hero.webp`}
                    badgeText="Environment, Health & Safety Service & Audit"
                    scrollTargetId="content"
                    layout="masonry-reverse-3"
                    showContactButton={false}
                    stats={{
                        mainValue: "Zero",
                        mainLabel: "Major Incidents",
                        satisfaction: "100%",
                        grid: [
                            { value: "95%", label: "Compliance Ratio" },
                            { value: "300+", label: "Audits Done" },
                            { value: "100%", label: "Risk Free" }
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
                                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-1.5"><CountUp end={70} suffix="%" /></h3>
                                    <p className="text-gray-400 text-[11px] sm:text-sm uppercase tracking-wider">Reduction in Risks</p>
                                </div>
                                <div className="p-2.5">
                                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-1.5"><CountUp end={95} suffix="%" /></h3>
                                    <p className="text-gray-400 text-[11px] sm:text-sm uppercase tracking-wider">Compliance Rate</p>
                                </div>
                                <div className="p-2.5">
                                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-1.5"><CountUp end={300} suffix="+" /></h3>
                                    <p className="text-gray-400 text-[11px] sm:text-sm uppercase tracking-wider">Audits Conducted</p>
                                </div>
                                <div className="p-2.5">
                                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-1.5">Zero</h3>
                                    <p className="text-gray-400 text-[11px] sm:text-sm uppercase tracking-wider">Major Incidents</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="py-10 md:py-24 px-4 md:px-12 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-100">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto px-0 md:px-6">
                                <div className="text-center mb-8 md:mb-16">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2 leading-tight">Core Environment, Health & Safety Services</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                                    {[
                                        {
                                            title: "Safety Standards",
                                            desc: "Site-wide safety standard maintenance.",
                                            items: [
                                                "Ensuring that all safety standards are maintained on site."
                                            ],
                                            icon: ShieldCheck
                                        },
                                        {
                                            title: "EHS Training",
                                            desc: "Regular safety talks and awareness sessions.",
                                            items: [
                                                "Conducting Tool Box talk."
                                            ],
                                            icon: Users
                                        },
                                        {
                                            title: "Inspections & Reporting",
                                            desc: "EHS walks and detailed reporting.",
                                            items: [
                                                "Conducting EHS Walk and submitting reports."
                                            ],
                                            icon: ClipboardList
                                        },
                                        {
                                            title: "Statutory Compliance",
                                            desc: "Ensuring contractor legal compliance.",
                                            items: [
                                                "Monitoring if all necessary statutory requirements are being met by the contractors."
                                            ],
                                            icon: BookOpen
                                        }
                                    ].map((service, index) => (
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
                                                                <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 mt-0.5 text-blue-500 shrink-0" />
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

                    {/* 5. COMPARISON SECTION - CENTRAL AXIS STYLE */}
                    <section className="py-10 md:py-24 px-4 md:px-12 relative overflow-hidden animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-300">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-8 md:mb-16">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2 leading-tight">Why Professional EHS Audits Are Critical</h2>
                                </div>

                                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-24 items-start">
                                    {/* Central Axis Line (Visible only on LG screens) */}
                                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2"></div>
                                    <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black border border-white/20 items-center justify-center z-10 text-gray-500 font-bold text-xs ring-4 ring-black">VS</div>

                                    {/* WITHOUT MANO (RED) */}
                                    <div className="space-y-4 sm:space-y-6 text-right lg:pr-12 relative group">
                                        <div className="absolute inset-0 bg-red-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-red-500 mb-4 sm:mb-6">Without Proper EHS Audit</h3>

                                        <div className="space-y-3 sm:space-y-6">
                                            {[
                                                { text: "High risk of accidents & injuries", icon: AlertTriangle },
                                                { text: "Frequent regulatory violations", icon: Siren },
                                                { text: "Unsafe work practices", icon: HardHat },
                                                { text: "Poor contractor safety performance", icon: Users },
                                                { text: "Increased project delays due to incidents", icon: Activity }
                                            ].map((item, index) => (
                                                <div key={index} className="flex items-center justify-end gap-3 p-3 rounded-xl bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-300">
                                                    <span className="text-sm sm:text-base text-gray-400 font-medium">{item.text}</span>
                                                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                                                        <item.icon size={18} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-red-300 font-medium text-xs sm:text-sm mt-4 sm:mt-6 italic leading-relaxed">
                                            "Result: Dangerous work conditions, legal penalties, and disrupted progress."
                                        </p>
                                    </div>

                                    {/* WITH MANO (BLUE) */}
                                    <div className="space-y-4 sm:space-y-6 text-left lg:pl-12 relative group">
                                        <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-blue-500 mb-4 sm:mb-6">With MANO EHS Services</h3>

                                        <div className="space-y-3 sm:space-y-6">
                                            {[
                                                { text: "Proactive hazard identification & control", icon: ShieldCheck },
                                                { text: "Strong compliance with EHS regulations", icon: BookOpen },
                                                { text: "Improved worker safety & morale", icon: HeartPulse },
                                                { text: "Minimal disruptions & zero major incidents", icon: CheckCircle },
                                                { text: "Documented, transparent, audit-ready", icon: FileText }
                                            ].map((item, index) => (
                                                <div key={index} className="flex items-center justify-start gap-3 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-300">
                                                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500 shrink-0">
                                                        <item.icon size={18} />
                                                    </div>
                                                    <span className="text-sm sm:text-base text-gray-200 font-medium">{item.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-blue-300 font-medium text-xs sm:text-sm mt-4 sm:mt-6 italic leading-relaxed">
                                            "Result: Safe, compliant, and incident-free project environments."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </section>

                    {/* DIGITAL ERP SECTION */}
                    <RevealOnScroll>
                        <DigitalERPSection
                            title={`Specialized <span class="text-blue-500">Safety ERP</span> <br /> Monitoring Systems`}
                            description="We utilize a comprehensive EHS ERP to track site safety performance, hazard identification, and incident reporting, fostering a zero-accident project culture."
                            features={[
                                { title: "Safety Incident Dashboards", icon: BarChart3 },
                                { title: "Compliance Ratio Analytics", icon: ShieldCheck },
                                { title: "Hazard Mitigation Trackers", icon: AlertTriangle },
                                { title: "Site Inspection Reports", icon: Layout },
                            ]}
                        />
                    </RevealOnScroll>

                    {/* 6. WHY MANO */}
                    <section className="py-10 md:py-24 px-4 md:px-12 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-400">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center">
                                <div>
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-3 mb-5 leading-tight">
                                        Why MANO for <span className="text-blue-500 block sm:inline lg:block">Environment, Health & Safety Service & Audit?</span>
                                    </h2>
                                    <div className="space-y-4 sm:space-y-8">
                                        {[
                                            { title: "Zero Incident Culture", text: "Proactive safety management that makes site safety a core project value.", icon: ShieldCheck },
                                            { title: "Regulatory Compliance", text: "Ensuring all statutory and legal EHS requirements are met and documented.", icon: ClipboardList },
                                            { title: "Constant Awareness", text: "Regular training and inspections that maintain a vigilant safety mindset.", icon: HardHat },
                                            { title: "Risk Elimination", text: "Systematic hazard identification and mitigation to prevent site accidents.", icon: ShieldCheck },
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
                                                <span className="text-3xl sm:text-4xl font-bold text-white mb-1.5 sm:mb-2">Zero</span>
                                                <span className="text-sm text-gray-400">Accidents</span>
                                            </div>
                                            <div className="h-32 sm:h-40 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-4 sm:p-6 flex flex-col justify-center">
                                                <span className="text-white text-base sm:text-lg font-bold">Safety<br />Compliant</span>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="h-32 sm:h-40 rounded-2xl bg-[#111] border border-white/10 p-4 sm:p-6 flex flex-col justify-center">
                                                <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500 mb-3 sm:mb-4" />
                                                <span className="text-sm sm:text-base text-gray-300 font-medium">Hazard Clean</span>
                                            </div>
                                            <div className="h-52 sm:h-64 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-4 sm:p-6 flex flex-col justify-end">
                                                <span className="text-3xl sm:text-4xl font-bold text-white mb-1.5 sm:mb-2">100%</span>
                                                <span className="text-sm text-gray-400">Secure Environment</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </section>

                    {/* 7. INDUSTRIES */}
                    <ProjectTypes
                        compactMobile
                        title="Industries We Support"
                        items={[
                            {
                                name: "Construction & Infrastructure",
                                desc: "Ensuring safety in high-risk zones.",
                                image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Industrial & Manufacturing",
                                desc: "Factory safety and hazard controls.",
                                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Commercial Complexes",
                                desc: "Occupant safety and fire readiness.",
                                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Logistics & Warehousing",
                                desc: "Safe material handling and operations.",
                                image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Institutional & Healthcare",
                                desc: "Strict hygiene and safety protocols.",
                                image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&h=600&auto=format&fit=crop"
                            }
                        ]}
                    />

                    {/* 8. PROCESS FLOW */}
                    <section className="py-12 md:py-24 px-4 md:px-12 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-600">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-8 md:mb-20">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-3 leading-tight">EHS Audit Process Flow</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                                    {processFlow.map((step, index) => (
                                        <div key={index} className="group relative p-4 sm:p-8 rounded-2xl border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all shadow-lg backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 hover:to-blue-600/10">
                                            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 text-5xl sm:text-6xl font-bold text-white/5 group-hover:text-blue-500/10 transition-colors pointer-events-none">
                                                {String(index + 1).padStart(2, '0')}
                                            </div>
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 sm:mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                                <step.icon size={20} />
                                            </div>
                                            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 relative z-10">{step.title}</h3>
                                            <div className="h-1 w-12 bg-gray-800 rounded group-hover:w-full group-hover:bg-blue-500 transition-all duration-500"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </RevealOnScroll>
                    </section>

                    {/* 9. TRUST STATEMENT */}
                    <section className="py-10 md:py-24 px-4 md:px-12 text-center animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-700">
                        <div className="max-w-4xl mx-auto p-4 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:to-blue-600/10 hover:border-blue-500/30 transition-all duration-500 backdrop-blur-md group">
                            <p className="text-base sm:text-xl md:text-3xl font-medium text-white leading-relaxed group-hover:text-blue-100 transition-colors">
                                "Organizations trust MANO Project Consultants for ensuring safe, compliant, and risk-free working environments through professional EHS audits and safety management systems."
                            </p>
                        </div>
                    </section>

                    {/* 10. CTA */}
                    <section className="py-10 md:py-24 relative overflow-hidden animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-800">
                        <div className="absolute inset-0 bg-blue-900/20"></div>
                        <div className="max-w-4xl mx-auto px-4 md:px-12 text-center relative z-10">
                            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-5 sm:mb-6 leading-tight">Safety First. Compliance Always.</h2>
                            <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-10 max-w-2xl mx-auto">
                                Partner with MANO Project Consultants to build safer, compliant, and incident-free project environments.
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
                initialService="EHS Audits"
            />
        </div >
    );
};

export default EHSAuditingMobile;
