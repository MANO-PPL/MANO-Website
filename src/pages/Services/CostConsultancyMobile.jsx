import { useState, useEffect, useRef } from 'react';
import {
    ChevronRight, Calculator, TrendingUp, Handshake, ShieldAlert,
    BarChart2, Coins, FileText, CheckCircle, PieChart,
    Banknote, Percent, LineChart, FileSpreadsheet, Scale, CheckSquare,
    Search, Activity, Target, AlertTriangle, ListChecks, Package, Lightbulb,
    Layers, BarChart3,
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

const CostConsultancyMobile = () => {
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const coreServices = [
        {
            title: "Cost Estimation & Budgeting",
            desc: "Accurate, data-driven estimations based on materials, manpower, methodology, and market trends.",
            items: [
                { text: "Pre-contract estimations", icon: Calculator },
                { text: "Detailed cost breakdowns", icon: PieChart },
                { text: "Budget allocation", icon: Coins },
                { text: "Rate analysis", icon: LineChart }
            ],
            icon: Calculator
        },
        {
            title: "BOQ Preparation & Verification",
            desc: "Comprehensive BOQ creation and validation to ensure transparency and accuracy.",
            items: [
                { text: "Quantity take-offs", icon: FileSpreadsheet },
                { text: "Itemized costing", icon: ListChecks },
                { text: "BOQ audits", icon: CheckSquare },
                { text: "Specification-based costing", icon: FileText }
            ],
            icon: FileText
        },
        {
            title: "Cost Monitoring & Control",
            desc: "Tracking cost performance to prevent overruns and maintain financial discipline.",
            items: [
                { text: "Budget tracking", icon: Target },
                { text: "Cost variance analysis", icon: TrendingUp },
                { text: "Cash flow forecasting", icon: BarChart2 },
                { text: "Cost optimization", icon: Percent }
            ],
            icon: Activity
        },
        {
            title: "Billing Verification & Certification",
            desc: "Ensuring every bill raised by contractors is accurate, justified, and compliant.",
            items: [
                { text: "Contractor billing audits", icon: FileText },
                { text: "Quantity cross-checking", icon: CheckCircle },
                { text: "Payment recommendations", icon: Banknote },
                { text: "Cost compliance checks", icon: ShieldAlert }
            ],
            icon: CheckCircle
        }
    ];

    const specializedServices = [
        {
            title: "Value Engineering (VE)",
            desc: "Improving project value by optimizing costs without affecting quality.",
            items: [
                { text: "Material optimization", icon: Package },
                { text: "Methodology comparison", icon: Scale },
                { text: "Life-cycle cost evaluation", icon: Handshake },
                { text: "Alternative design proposals", icon: Lightbulb }
            ],
            icon: TrendingUp
        },
        {
            title: "Cost Risk Management",
            desc: "Identifying potential cost risks and creating mitigation strategies.",
            items: [
                { text: "Cost impact analysis", icon: AlertTriangle },
                { text: "Market fluctuation assessment", icon: TrendingUp },
                { text: "Risk allocation", icon: ShieldAlert },
                { text: "Contingency planning", icon: Target }
            ],
            icon: ShieldAlert
        },
        {
            title: "Financial Reporting & Management Information System Dashboards",
            desc: "Real-time financial visibility for stakeholders.",
            items: [
                { text: "Cost performance dashboards", icon: BarChart2 },
                { text: "Forecasting reports", icon: LineChart },
                { text: "Periodic Management Information System summaries", icon: FileText },
                { text: "Budget vs. actual tracking", icon: PieChart }
            ],
            icon: BarChart2
        }
    ];

    const processFlow = [
        { title: "Initial Cost Studying & Requirement Understanding", icon: Search },
        { title: "Detailed Estimation & BOQ Preparation", icon: FileSpreadsheet },
        { title: "Budget Freeze & Cash Flow Planning", icon: Coins },
        { title: "Cost Monitoring & Reporting", icon: Activity },
        { title: "Billing Verification & Certification", icon: CheckCircle },
        { title: "Final Cost Reconciliation & Closure", icon: Handshake }
    ];

    return (
        <div className="min-h-screen bg-blue-pattern text-white overflow-x-hidden font-sans selection:bg-blue-500/30">
            {/* 1. HERO SECTION */}
            <div className="[&>div]:!min-h-[72vh] landscape:[&>div]:!min-h-[88vh] [&>div]:sm:!min-h-screen">
                <PageHero
                    title="Cost"
                    subtitle="Consultancy"
                    description="Prepare, Monitor and Control of Bill of Quantities & Budget, Rate Analysis"
                    headingClassName="text-5xl landscape:text-4xl landscape:leading-tight sm:text-7xl"
                    images={[
                        `${import.meta.env.BASE_URL}cost-consultancy-hero.webp`,
                        `${import.meta.env.BASE_URL}qs-billing-hero.webp`,
                        `${import.meta.env.BASE_URL}contract-management-hero.webp`
                    ]}
                    bgImage={`${import.meta.env.BASE_URL}cost-consultancy-hero.webp`}
                    badgeText="Cost Consultancy"
                    scrollTargetId="content"
                    layout="triptych-3"
                    showContactButton={false}
                    stats={{
                        mainValue: "15%",
                        mainLabel: "Cost Saving",
                        satisfaction: "100%",
                        grid: [
                            { value: "0", label: "Overrun" },
                            { value: "100%", label: "Accuracy" },
                            { value: "ROI", label: "Return on Investment Focused" }
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
                                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-1.5"><CountUp end={95} suffix="%" />+</h3>
                                    <p className="text-gray-400 text-[11px] sm:text-sm uppercase tracking-wider">Cost Accuracy</p>
                                </div>
                                <div className="p-2.5">
                                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-1.5"><CountUp end={45} suffix="%" /></h3>
                                    <p className="text-gray-400 text-[11px] sm:text-sm uppercase tracking-wider">Cost Reduction</p>
                                </div>
                                <div className="p-2.5">
                                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-1.5"><CountUp end={500} suffix="+" /></h3>
                                    <p className="text-gray-400 text-[11px] sm:text-sm uppercase tracking-wider">Bill of Quantities Delivered</p>
                                </div>
                                <div className="p-2.5">
                                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-1.5"><CountUp end={99} suffix="%" /></h3>
                                    <p className="text-gray-400 text-[11px] sm:text-sm uppercase tracking-wider">Error-Free Billing</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="py-10 md:py-24 px-4 md:px-12 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-100">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-8 md:mb-16">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2 leading-tight">Core Cost Consultancy Services</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                                    {[
                                        {
                                            title: "Budget Verification",
                                            desc: "Initial verification and certification of project budgets.",
                                            items: [
                                                "Verify and Certify the initial Bill of Quantities and Budget."
                                            ],
                                            icon: Calculator
                                        },
                                        {
                                            title: "Detailed Estimation",
                                            desc: "Comprehensive Bill of Quantities preparation based on drawings.",
                                            items: [
                                                "Prepare a detailed Bill of Quantities based on Good for Construction (GFC) drawings."
                                            ],
                                            icon: FileText
                                        },
                                        {
                                            title: "Rate Analysis",
                                            desc: "Detailed rate analysis for extra items.",
                                            items: [
                                                "Rate Analysis with backup for new items of work/extra items for the project."
                                            ],
                                            icon: LineChart
                                        },
                                        {
                                            title: "Material Reconciliation",
                                            desc: "Tracking and reconciliation of all major materials.",
                                            items: [
                                                "Material reconciliation for all major building materials."
                                            ],
                                            icon: CheckSquare
                                        }
                                    ].map((service, index) => (
                                        <div key={index} className="group relative p-4 sm:p-8 rounded-2xl border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all shadow-lg backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 hover:to-blue-600/10 animated-white-border">
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
                                                    <h4 className="text-xs sm:text-sm font-semibold text-gray-300 mb-3 sm:mb-4 uppercase tracking-wide">Key Service:</h4>
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

                    {/* 5. COMPARISON SECTION */}
                    <section className="py-10 md:py-24 px-4 md:px-12 bg-white/5 backdrop-blur-sm border-y border-white/5 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-300">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-8 md:mb-16">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2 leading-tight">Why Professional Cost Consultancy Matters</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-12">
                                    {/* WITHOUT MANO */}
                                    <div className="space-y-5 sm:space-y-8">
                                        <div className="text-center mb-4 sm:mb-8">
                                            <h3 className="text-xl sm:text-2xl font-bold text-red-400 mb-1.5">Without Professional Cost Consultancy</h3>
                                            <p className="text-gray-400 text-xs sm:text-sm">Escalated Costs & Financial Inefficiencies</p>
                                        </div>
                                        <div className="space-y-4 sm:space-y-6">
                                            {[
                                                { label: "Inaccurate Estimations", percentage: 85, color: "bg-red-500" },
                                                { label: "Poor Cost Monitoring", percentage: 80, color: "bg-red-500" },
                                                { label: "Unverified Bills", percentage: 90, color: "bg-red-500" },
                                                { label: "Lack of Transparency", percentage: 75, color: "bg-red-500" },
                                                { label: "High-Cost Risks", percentage: 85, color: "bg-red-500" }
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
                                                "Result: Escalated costs, disputes, and financial inefficiencies."
                                            </p>
                                        </div>
                                    </div>

                                    {/* WITH MANO */}
                                    <div className="space-y-5 sm:space-y-8 relative">
                                        <div className="absolute inset-0 bg-blue-500/5 blur-3xl -z-10 rounded-full"></div>
                                        <div className="text-center mb-4 sm:mb-8">
                                            <h3 className="text-xl sm:text-2xl font-bold text-blue-400 mb-1.5">With MANO Cost Consultancy Services</h3>
                                            <p className="text-gray-400 text-xs sm:text-sm">Cost-Efficient & Financially Secured</p>
                                        </div>
                                        <div className="space-y-4 sm:space-y-6">
                                            {[
                                                { label: "Accurate Estimations", percentage: 100, color: "bg-blue-500" },
                                                { label: "Continuous Monitoring", percentage: 100, color: "bg-blue-500" },
                                                { label: "Verified Bills", percentage: 100, color: "bg-blue-500" },
                                                { label: "Optimized Choices", percentage: 100, color: "bg-blue-500" },
                                                { label: "Predictable Cash Flow", percentage: 100, color: "bg-blue-500" }
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
                                                "Result: Cost-efficient, transparent, and financially secured projects."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </section>

                    {/* DIGITAL ERP SECTION */}
                    <RevealOnScroll>
                        <DigitalERPSection
                            title={`Specialized <span class="text-blue-500">Cost ERP</span> <br /> Analytics Systems`}
                            description="We leverage specialized cost ERP modules to track budget vs. actuals, predict cash flow requirements, and optimize resource spending across the project lifecycle."
                            features={[
                                { title: "Financial Performance Dashboards", icon: BarChart3 },
                                { title: "Cash-Flow Prediction Models", icon: TrendingUp },
                                { title: "Budget Variance Analytics", icon: PieChart },
                                { title: "Cost-Saving Trackers", icon: Coins },
                            ]}
                        />
                    </RevealOnScroll>

                    {/* 6. WHY MANO */}
                    <section className="py-10 md:py-24 px-4 md:px-12 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-400">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center">
                                <div>
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-3 mb-5 leading-tight">
                                        Why MANO for <span className="text-blue-500 block sm:inline lg:block">Cost Consultancy?</span>
                                    </h2>
                                    <div className="space-y-4 sm:space-y-8">
                                        {[
                                            { title: "Financial Precision", text: "Drilling down into every line item to ensure absolute budget accuracy.", icon: Calculator },
                                            { title: "Value Engineering", text: "Identifying cost-saving opportunities without compromising on quality.", icon: TrendingUp },
                                            { title: "Material Control", text: "Strict monitoring of material consumption against planned benchmarks.", icon: Layers },
                                            { title: "Rate Analysis Experts", text: "Deep market knowledge that secures the best value for your investments.", icon: Search },
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
                                                <span className="text-sm text-gray-400">Traceable Costs</span>
                                            </div>
                                            <div className="h-32 sm:h-40 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-4 sm:p-6 flex flex-col justify-center">
                                                <span className="text-white text-base sm:text-lg font-bold">Total<br />Transparency</span>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="h-32 sm:h-40 rounded-2xl bg-[#111] border border-white/10 p-4 sm:p-6 flex flex-col justify-center">
                                                <Calculator className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500 mb-3 sm:mb-4" />
                                                <span className="text-sm sm:text-base text-gray-300 font-medium">Data-Driven</span>
                                            </div>
                                            <div className="h-52 sm:h-64 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-4 sm:p-6 flex flex-col justify-end">
                                                <span className="text-3xl sm:text-4xl font-bold text-white mb-1.5 sm:mb-2">Zero</span>
                                                <span className="text-sm text-gray-400">Leakage</span>
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
                        title="Project Types We Support"
                        items={[
                            {
                                name: "Residential & Commercial",
                                desc: "High-rise apartments to retail complexes.",
                                image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Industrial & Manufacturing",
                                desc: "Factories and production facilities.",
                                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Corporate & Office Spaces",
                                desc: "Modern workspaces and IT parks.",
                                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Hospitality Projects",
                                desc: "Hotels, resorts, and leisure centers.",
                                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Institutional & Infrastructure",
                                desc: "Educational campuses and public works.",
                                image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=800&h=600&auto=format&fit=crop"
                            }
                        ]}
                    />

                    {/* 8. PROCESS FLOW */}
                    <section className="py-12 md:py-24 px-4 md:px-6 bg-black relative overflow-hidden animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-600">
                        {/* Background Decor */}
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-900/50 to-transparent"></div>

                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-8 md:mb-20">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">Cost Consultancy <span className="text-blue-500">Process</span></h2>
                                    <div className="h-1 w-24 bg-blue-500/30 mx-auto rounded-full"></div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                    {processFlow.map((step, index) => (
                                        <div key={index} className="group relative p-4 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-xl overflow-hidden hover:to-blue-600/10 transition-all duration-500">
                                            {/* Top Line Accent */}
                                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                                            {/* Number Watermark */}
                                            <div className="absolute top-3 sm:top-4 right-4 sm:right-6 text-5xl sm:text-7xl font-black text-white/[0.03] group-hover:text-blue-500/[0.05] transition-colors pointer-events-none select-none font-mono">
                                                {String(index + 1).padStart(2, '0')}
                                            </div>

                                            {/* Icon & Content */}
                                            <div className="relative z-10">
                                                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 sm:mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500 shadow-[0_0_20px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                                                    <step.icon size={20} strokeWidth={1.5} />
                                                </div>

                                                <h3 className="text-base sm:text-lg font-bold text-white mb-3 pr-8 group-hover:text-blue-400 transition-colors">
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
                    <section className="py-10 md:py-24 px-4 md:px-12 text-center animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-700">
                        <div className="max-w-4xl mx-auto p-4 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:to-blue-600/10 hover:border-blue-500/30 transition-all duration-500 backdrop-blur-md group">
                            <p className="text-base sm:text-xl md:text-3xl font-medium text-white leading-relaxed group-hover:text-blue-100 transition-colors">
                                "Companies trust MANO Project Consultants for delivering precise, transparent, and accountable Cost Consultancy that protects their financial interests throughout the project lifecycle."
                            </p>
                        </div>
                    </section>

                    {/* 10. CTA */}
                    <section className="py-10 md:py-24 relative overflow-hidden animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-800">
                        <div className="absolute inset-0 bg-blue-900/20"></div>
                        <div className="max-w-4xl mx-auto px-4 md:px-12 text-center relative z-10">
                            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-5 sm:mb-6 leading-tight">Control Costs. Improve Value.</h2>
                            <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-10 max-w-2xl mx-auto">
                                Partner with MANO Project Consultants for accurate, transparent, and optimized project costing.
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
                initialService="Cost Consultancy"
            />
        </div >
    );
};

export default CostConsultancyMobile;

