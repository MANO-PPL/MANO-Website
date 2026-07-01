import { useState, useEffect, useRef } from 'react';
import {
    ChevronRight, FileText, Gavel, ShieldCheck, AlertTriangle, Scale,
    Briefcase, GitPullRequest, Search, CheckCircle, TrendingUp,
    FileSignature, ClipboardCheck, ScrollText, BadgeCheck, Users,
    Handshake, Shield, BarChart2,
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

const ContractManagementMobile = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const coreServices = [
        {
            title: "Contract Strategy & Structuring",
            desc: "Developing robust contract structures that balance risk, responsibility, and commercial objectives.",
            items: [
                { text: "Contract type selection", icon: FileSignature },
                { text: "Risk allocation strategy", icon: ShieldCheck },
                { text: "Scope and responsibility definition", icon: FileText },
                { text: "Commercial terms formulation", icon: Scale }
            ],
            icon: FileText
        },
        {
            title: "Tendering & Bid Evaluation",
            desc: "Ensuring objective, transparent, and technically sound tender evaluation processes.",
            items: [
                { text: "Technical bid evaluation", icon: Search },
                { text: "Commercial bid analysis", icon: TrendingUp },
                { text: "Vendor comparison and benchmarking", icon: Users },
                { text: "Recommendation and award support", icon: CheckCircle }
            ],
            icon: Scale
        },
        {
            title: "Contract Administration",
            desc: "Active administration to ensure contractual obligations are met during execution.",
            items: [
                { text: "Contract compliance monitoring", icon: ClipboardCheck },
                { text: "Progress certification", icon: BadgeCheck },
                { text: "Payment administration", icon: FileText },
                { text: "Contract correspondence management", icon: ScrollText }
            ],
            icon: ClipboardCheck
        },
        {
            title: "Variation & Change Control",
            desc: "Managing scope changes systematically to avoid cost escalation and disputes.",
            items: [
                { text: "Variation identification and assessment", icon: Search },
                { text: "Cost and time impact analysis", icon: TrendingUp },
                { text: "Change approval coordination", icon: CheckCircle },
                { text: "Contract amendment documentation", icon: FileSignature }
            ],
            icon: GitPullRequest
        }
    ];

    const specializedServices = [
        {
            title: "Claims Management",
            desc: "Professional handling of claims to protect client interests and ensure fair outcomes.",
            items: [
                { text: "Claim identification and documentation", icon: Search },
                { text: "Delay and disruption analysis", icon: AlertTriangle },
                { text: "Claim negotiation support", icon: Users },
                { text: "Settlement assistance", icon: CheckCircle }
            ],
            icon: AlertTriangle
        },
        {
            title: "Dispute Avoidance & Resolution Support",
            desc: "Reducing disputes through proactive documentation and structured resolution methods.",
            items: [
                { text: "Dispute prevention strategies", icon: ShieldCheck },
                { text: "Contractual interpretation", icon: FileText },
                { text: "Mediation and arbitration support", icon: Gavel },
                { text: "Expert advisory services", icon: Briefcase }
            ],
            icon: Gavel
        },
        {
            title: "Compliance & Documentation Control",
            desc: "Maintaining accurate, audit-ready contractual documentation.",
            items: [
                { text: "Contract document control", icon: FileText },
                { text: "Regulatory and statutory compliance", icon: Scale },
                { text: "Audit preparation and support", icon: ClipboardCheck },
                { text: "Record management systems", icon: ScrollText }
            ],
            icon: ShieldCheck
        }
    ];

    const processFlow = [
        { title: "Contract Review & Strategy Development", icon: Search },
        { title: "Tendering & Award Support", icon: Scale },
        { title: "Contract Administration & Monitoring", icon: ClipboardCheck },
        { title: "Variation & Claims Management", icon: GitPullRequest },
        { title: "Dispute Resolution Support", icon: Gavel },
        { title: "Contract Closure & Final Settlement", icon: CheckCircle }
    ];

    const [isLoaded, setIsLoaded] = useState(true);
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

    return (
        <div className="min-h-screen bg-blue-pattern text-white overflow-x-hidden font-sans selection:bg-blue-500/30">
            {/* 1. HERO SECTION */}
            <div className="[&>div]:!min-h-[72vh] landscape:[&>div]:!min-h-[88vh] [&>div]:sm:!min-h-screen">
                <PageHero
                    title="Contract"
                    subtitle="Management"
                    description="Quantity Surveying, Bill of Quantities, Tender Preparation, Tender Floating, Comparisons, Negotiations & Finalisation of Vendors"
                    headingClassName="text-5xl landscape:text-4xl landscape:leading-tight sm:text-7xl"
                    images={[
                        `${import.meta.env.BASE_URL}contract-hero-1.webp`,
                        `${import.meta.env.BASE_URL}contract-hero-2.webp`,
                        `${import.meta.env.BASE_URL}contract-hero-3.webp`
                    ]}
                    bgImage={`${import.meta.env.BASE_URL}contract-management-hero.webp`}
                    badgeText="Contract Management"
                    scrollTargetId="content"
                    layout="split"
                    showContactButton={false}
                    stats={{
                        mainValue: "12+",
                        mainLabel: "Years Exp",
                        satisfaction: "100%",
                        grid: [
                            { value: "500+", label: "Contracts" },
                            { value: "100%", label: "Protection" },
                            { value: "95%", label: "Compliance" }
                        ]
                    }}
                />
            </div>

            <div id="content"></div>

            {isLoaded && (
                <>
                    {/* 2. STATS STRIP */}
                    <section className="relative z-20 -mt-24 pb-10 pt-24 border-b border-white/5 bg-gradient-to-b from-transparent via-black/80 to-black backdrop-blur-sm animate-in fade-in duration-1000"
                        style={{
                            maskImage: "linear-gradient(to bottom, transparent, black 20%)",
                            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%)"
                        }}
                    >
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center lg:divide-x divide-white/10">
                                <div className="p-2.5">
                                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-1.5"><CountUp end={12} />+</h3>
                                    <p className="text-gray-400 text-[11px] sm:text-sm uppercase tracking-wider">Years of Contract Expertise</p>
                                </div>
                                <div className="p-2.5">
                                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-1.5"><CountUp end={500} />+</h3>
                                    <p className="text-gray-400 text-[11px] sm:text-sm uppercase tracking-wider text-balance">Contracts Reviewed & Administered</p>
                                </div>
                                <div className="p-2.5">
                                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-1.5"><CountUp end={100} />+</h3>
                                    <p className="text-gray-400 text-[11px] sm:text-sm uppercase tracking-wider text-balance">Projects Commercially Managed</p>
                                </div>
                                <div className="p-2.5">
                                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-1.5"><CountUp end={95} />%</h3>
                                    <p className="text-gray-400 text-[11px] sm:text-sm uppercase tracking-wider text-balance">Dispute Avoidance Success Rate</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="py-10 md:py-24 px-4 md:px-12 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-100">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-8 md:mb-16">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2 leading-tight">Core Contract Management Services</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                                    {[
                                        {
                                            title: "BOQ & Tender Preparation",
                                            desc: "Comprehensive preparation of Bill of Quantities and tender documents.",
                                            items: [
                                                "Prepare BOQ and tender as per drawings received from concerned consultants.",
                                                "Identifying cost-saving opportunities without compromising on quality or scope.",
                                                "Prepare tender document including terms, scope, and technical specifications."
                                            ],
                                            icon: FileText
                                        },
                                        {
                                            title: "Tender Process Management",
                                            desc: "Managing the entire tender lifecycle from floating to evaluation.",
                                            items: [
                                                "Reviewing tenders based on cost, compliance, and technical capability.",
                                                "Send out pre-qualification notices to shortlisted contractors.",
                                                "Conduct pre-bid meetings with prospective contractors.",
                                                "Evaluate tender and prepare techno-commercial comparative statements."
                                            ],
                                            icon: Search
                                        },
                                        {
                                            title: "Negotiation & Finalization",
                                            desc: "Expert negotiation to ensure alignment with project goals.",
                                            items: [
                                                "Negotiating with selected bidder to finalize terms and pricing.",
                                                "Assist client in finalization of contractors for different disciplines."
                                            ],
                                            icon: Users
                                        },
                                        {
                                            title: "Contract Documentation",
                                            desc: "Finalizing legal and commercial documentation for execution.",
                                            items: [
                                                "Preparation of final contract documents based on techno-commercial discussions.",
                                                "Preparation of amendment orders according to corrections in management."
                                            ],
                                            icon: Scale
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
                                                <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-8 leading-relaxed lg:h-14">{service.desc}</p>

                                                <div className="bg-black/20 rounded-xl p-4 sm:p-6 border border-white/5 group-hover:border-white/10 transition-colors">
                                                    <h4 className="text-xs sm:text-sm font-semibold text-gray-300 mb-3 sm:mb-4 uppercase tracking-wide">Key Activities:</h4>
                                                    <ul className="grid grid-cols-1 gap-2.5 sm:gap-3">
                                                        {service.items.map((item, idx) => (
                                                            <li key={idx} className="flex items-start text-xs sm:text-sm text-gray-400">
                                                                <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-blue-500 mt-1 shrink-0" />
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
                            title={`Specialized <span class="text-blue-500">Contract ERP</span> <br /> Compliance Systems`}
                            description="Our digital ERP ensures 100% compliance tracking, claim management, and risk mitigation through a centralized and audit-ready contract management portal."
                            features={[
                                { title: "Compliance Tracking Dashboards", icon: BarChart2 },
                                { title: "Claim Management Systems", icon: Gavel },
                                { title: "Risk Mitigation Analytics", icon: ShieldCheck },
                                { title: "Digital Document Repository", icon: ScrollText },
                            ]}
                        />
                    </RevealOnScroll>

                    {/* 5. WHY MANO */}
                    <section className="py-10 md:py-24 px-4 md:px-12 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-300">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center">
                                <div>
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-3 mb-5 leading-tight">
                                        Why MANO for <span className="text-blue-500 block sm:inline lg:block">Contract Management?</span>
                                    </h2>
                                    <div className="space-y-4 sm:space-y-8">
                                        {[
                                            { title: "Watertight Documentation", text: "Creating robust contracts that leave no room for ambiguity or disputes.", icon: ShieldCheck },
                                            { title: "Risk Mitigation", text: "Proactive identification and elimination of contractual risks.", icon: AlertTriangle },
                                            { title: "Vendor Alignment", text: "Ensuring all parties are strictly aligned with project objectives.", icon: Handshake },
                                            { title: "Financial Protection", text: "Securing your interests through detailed clauses and compliance.", icon: Shield },
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
                                                <span className="text-sm text-gray-400">Legal Disputes</span>
                                            </div>
                                            <div className="h-32 sm:h-40 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-4 sm:p-6 flex flex-col justify-center">
                                                <span className="text-white text-base sm:text-lg font-bold">Total<br />Compliance</span>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="h-32 sm:h-40 rounded-2xl bg-[#111] border border-white/10 p-4 sm:p-6 flex flex-col justify-center">
                                                <Scale className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500 mb-3 sm:mb-4" />
                                                <span className="text-sm sm:text-base text-gray-300 font-medium">Risk Minimized</span>
                                            </div>
                                            <div className="h-52 sm:h-64 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-4 sm:p-6 flex flex-col justify-end">
                                                <span className="text-3xl sm:text-4xl font-bold text-white mb-1.5 sm:mb-2">100%</span>
                                                <span className="text-sm text-gray-400">Financial Protection</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </section>

                    {/* COMPARISON SECTION */}
                    <section className="py-10 md:py-24 px-4 md:px-12 bg-white/5 backdrop-blur-sm border-y border-white/5 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-400">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-8 md:mb-16">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2 leading-tight">Impact of Professional Management</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-12">
                                    {/* WITHOUT MANO */}
                                    <div className="space-y-5 sm:space-y-8">
                                        <div className="text-center mb-4 sm:mb-8">
                                            <h3 className="text-xl sm:text-2xl font-bold text-red-400 mb-1.5">Without Professional Management</h3>
                                            <p className="text-gray-400 text-xs sm:text-sm">Increased Risk & Financial Exposure</p>
                                        </div>
                                        <div className="space-y-4 sm:space-y-6">
                                            {[
                                                { label: "Risk of Disputes", percentage: 85, color: "bg-red-500" },
                                                { label: "Uncontrolled Variations", percentage: 70, color: "bg-red-500" },
                                                { label: "Compliance Gaps", percentage: 60, color: "bg-red-500" },
                                                { label: "Delayed Payments", percentage: 75, color: "bg-red-500" }
                                            ].map((item, index) => (
                                                <div key={index}>
                                                    <div className="flex justify-between text-xs sm:text-sm font-medium text-gray-400 mb-1.5">
                                                        <span>{item.label}</span>
                                                        <span className="text-red-400">High Risk</span>
                                                    </div>
                                                    <div className="h-1.5 sm:h-2 bg-white/5 rounded-full overflow-hidden">
                                                        <AnimatedBar width={item.percentage} color={item.color} delay={index * 200} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/20 mt-4 sm:mt-8">
                                            <p className="text-red-200 text-center font-medium text-[11px] sm:text-xs md:text-sm leading-relaxed">
                                                "Result: High possibility of financial loss, delays, and legal complications."
                                            </p>
                                        </div>
                                    </div>

                                    {/* WITH MANO */}
                                    <div className="space-y-5 sm:space-y-8 relative">
                                        <div className="absolute inset-0 bg-blue-500/5 blur-3xl -z-10 rounded-full"></div>
                                        <div className="text-center mb-4 sm:mb-8">
                                            <h3 className="text-xl sm:text-2xl font-bold text-blue-400 mb-1.5">With MANO Services</h3>
                                            <p className="text-gray-400 text-xs sm:text-sm">Secure, Compliant & Controlled</p>
                                        </div>
                                        <div className="space-y-4 sm:space-y-6">
                                            {[
                                                { label: "Clear, Enforceable Contracts", percentage: 100, color: "bg-blue-500" },
                                                { label: "Controlled Variations", percentage: 95, color: "bg-blue-500" },
                                                { label: "Document Discipline", percentage: 100, color: "bg-blue-500" },
                                                { label: "Proactive Dispute Avoidance", percentage: 90, color: "bg-blue-500" }
                                            ].map((item, index) => (
                                                <div key={index}>
                                                    <div className="flex justify-between text-xs sm:text-sm font-medium text-gray-400 mb-1.5">
                                                        <span>{item.label}</span>
                                                        <span className="text-blue-400">Optimized</span>
                                                    </div>
                                                    <div className="h-1.5 sm:h-2 bg-white/5 rounded-full overflow-hidden">
                                                        <AnimatedBar width={item.percentage} color={item.color} delay={index * 200} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 mt-4 sm:mt-8">
                                            <p className="text-blue-200 text-center font-medium text-[11px] sm:text-xs md:text-sm leading-relaxed">
                                                "Result: Legally secure, financially protected, and smoothly managed projects."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </section>

                    {/* 6. PROJECT TYPES */}
                    <ProjectTypes
                        compactMobile
                        title="Project Types We Support"
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
                    <section className="py-12 md:py-24 px-4 md:px-12 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-600">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-8 md:mb-20">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-3 leading-tight">Contract Management Process Flow</h2>
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

                    {/* 8. TRUST STATEMENT */}
                    <section className="py-10 md:py-24 px-4 md:px-12 text-center animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-700">
                        <div className="max-w-4xl mx-auto p-4 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:to-blue-600/10 hover:border-blue-500/30 transition-all duration-500 backdrop-blur-md group">
                            <p className="text-base sm:text-xl md:text-3xl font-medium text-white leading-relaxed group-hover:text-blue-100 transition-colors">
                                "MANO Project Consultants is trusted by developers, contractors, and institutions for delivering disciplined, transparent, and enforceable contract management solutions that safeguard project success."
                            </p>
                        </div>
                    </section>

                    {/* 9. CTA */}
                    <section className="py-10 md:py-24 relative overflow-hidden animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-800">
                        <div className="absolute inset-0 bg-blue-900/20"></div>
                        <div className="max-w-4xl mx-auto px-4 md:px-12 text-center relative z-10">
                            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-5 sm:mb-6 leading-tight">Protect Your Contracts. <br /> Protect Your Projects.</h2>
                            <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-10 max-w-2xl mx-auto">
                                Partner with MANO Project Consultants for structured, transparent, and risk-controlled contract management.
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
                initialService="Contract Management"
            />
        </div >
    );
};

export default ContractManagementMobile;
