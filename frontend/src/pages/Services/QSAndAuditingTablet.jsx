
import { useState, useEffect, useRef } from 'react';

import {
    Calculator, FileCheck, CreditCard, TrendingUp,
    CheckCircle, AlertTriangle, FileText, Layers, ShieldCheck, Users,
    ClipboardCheck, BadgeCheck, Scale, Landmark, Target,
    ChevronRight, BarChart3, Layout, Activity
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

const QSAndAuditingTablet = () => {
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
            title: "Quantity Take-Off & Verification",
            description: "Accurate measurement and verification of executed quantities based on drawings, specifications, and site progress.",
            icon: Calculator,
            details: ["Quantity extraction from drawings", "Cross-site verification", "Variation quantity checks", "Joint measurement records"]
        },
        {
            title: "Billing Audit & Verification",
            description: "Ensuring contractor bills are accurate, justified, and aligned with actual work done.",
            icon: FileCheck,
            details: ["RA bill verification", "Final bill certification", "Material reconciliation", "Rate compliance checks"]
        },
        {
            title: "BOQ Review & Cost Cross-Checks",
            description: "Ensuring contractual BOQs are complete, accurate, and aligned with market & project requirements.",
            icon: ClipboardCheck,
            details: ["BOQ audit", "Item validation", "Rate analysis", "Value engineering review"]
        },
        {
            title: "Financial Compliance & Documentation",
            description: "Maintaining audit-ready billing and cost records.",
            icon: FileText,
            details: ["Billing documentation", "Audit report preparation", "Compliance mapping", "Payment recommendations"]
        }
    ];

    const specializedServices = [
        {
            title: "Variation & Change Order Validation",
            description: "Independent verification of cost and quantity impact for variations to prevent scope creep.",
            keyFocus: [
                { text: "VO quantity checks", icon: Calculator },
                { text: "Cost impact evaluations", icon: TrendingUp },
                { text: "Change approval documentation", icon: FileText },
                { text: "Commercial justification reports", icon: FileCheck }
            ],
            icon: Target
        },
        {
            title: "Cost Reconciliation & Financial Closure",
            description: "Ensuring financial alignment between contractors, consultants, and clients at project closeout.",
            keyFocus: [
                { text: "Material reconciliation", icon: Layers },
                { text: "Debit-credit note verification", icon: CreditCard },
                { text: "Final cost summary", icon: TrendingUp },
                { text: "Closeout compliance", icon: CheckCircle }
            ],
            icon: Scale
        },
        {
            title: "Contract & Billing Compliance Support",
            description: "Ensuring bills follow all contractual, technical, and statutory conditions.",
            keyFocus: [
                { text: "Specification compliance", icon: FileCheck },
                { text: "Rate appropriateness", icon: Calculator },
                { text: "Tax & statutory compliance", icon: Landmark },
                { text: "Payment certification alignment", icon: BadgeCheck }
            ],
            icon: ShieldCheck
        }
    ];

    const timelineSteps = [
        "Drawing & Document Review",
        "Site Measurement & Verification",
        "Billing Audit",
        "Variation & Rate Validation",
        "Compliance & Reconciliation Reports",
        "Final Certification & Financial Closure"
    ];

    return (
        <div className="min-h-screen bg-blue-pattern text-white selection:bg-blue-500/30 font-sans">
            {/* 1. HERO SECTION */}
            <PageHero
                title="Quantity Survey &"
                subtitle="Billing Service & Auditing"
                description="Prepare, Monitor and Control of Joint Measurements, Verification of Bill"
                images={[
                    `${import.meta.env.BASE_URL}qs-billing-hero.webp`,
                    `${import.meta.env.BASE_URL}qs-detail-3.webp`,
                    `${import.meta.env.BASE_URL}qs-detail-4.webp`
                ]}
                bgImage={`${import.meta.env.BASE_URL}qs-billing-hero.webp`}
                badgeText="Quantity Survey & Billing Service & Auditing"
                scrollTargetId="content"
                layout="split"
                showContactButton={false}
                stats={{
                    mainValue: "98%",
                    mainLabel: "Billing Accuracy",
                    satisfaction: "100%",
                    grid: [
                        { value: "70%", label: "Less Overbilling" },
                        { value: "400+", label: "Audits" },
                        { value: "95%", label: "Qty Verified" }
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
                                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-2"><CountUp end={98} suffix="%" /></h3>
                                    <p className="text-gray-400 text-sm uppercase tracking-wider">Billing Accuracy After Audit</p>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-2"><CountUp end={70} suffix="%" /></h3>
                                    <p className="text-gray-400 text-sm uppercase tracking-wider">Reduction in Overbilling</p>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-2"><CountUp end={400} suffix="+" /></h3>
                                    <p className="text-gray-400 text-sm uppercase tracking-wider">Audits Completed</p>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-2"><CountUp end={95} suffix="%" /></h3>
                                    <p className="text-gray-400 text-sm uppercase tracking-wider">Quantity Verification Accuracy</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="py-16 md:py-24 px-6 md:px-12 relative animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-100">
                        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-16">
                                    <span className="text-blue-500 font-bold tracking-widest uppercase text-sm">Comprehensive Expertise</span>
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 leading-tight">Core Quantity Survey & Billing Services</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {[
                                        {
                                            title: "Joint Measurements",
                                            description: "Accurate measurement verification at site.",
                                            icon: Calculator,
                                            details: ["Checking and Certification of Joint Measurement Record Sheets (JMRS) at site."]
                                        },
                                        {
                                            title: "Bill Verification",
                                            description: "Comprehensive verification of all bills.",
                                            icon: FileCheck,
                                            details: ["Verification and certification of RA Bills and Final bills."]
                                        },
                                        {
                                            title: "Contract Closure",
                                            description: "Assisting in the final closure of contracts.",
                                            icon: ShieldCheck,
                                            details: ["Assist The Client in closing the contracts of individual packages."]
                                        },
                                        {
                                            title: "Material Reconciliation",
                                            description: "Tracking material usage against plan.",
                                            icon: Layers,
                                            details: ["Material reconciliation for all major building materials."]
                                        }
                                    ].map((service, index) => (
                                        <div key={index} className="group relative p-8 rounded-2xl border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all shadow-lg backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 hover:to-blue-600/10 animated-white-border">
                                            {/* Large Background Icon */}
                                            <div className="absolute -bottom-10 -right-10 text-white/5 group-hover:text-blue-500/10 transition-colors duration-500 pointer-events-none transform rotate-12">
                                                <service.icon size={180} />
                                            </div>

                                            <div className="relative z-10">
                                                <div className="w-16 h-16 rounded-2xl mb-8 bg-blue-600/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                                                    <service.icon className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors" />
                                                </div>

                                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">{service.title}</h3>
                                                <p className="text-gray-400 mb-8 leading-relaxed text-lg">{service.description}</p>

                                                <div className="bg-black/30 rounded-xl p-6 border border-white/5 backdrop-blur-sm">
                                                    <h4 className="text-sm font-semibold text-blue-400 mb-4 uppercase tracking-wide">Key Service:</h4>
                                                    <ul className="grid grid-cols-1 gap-3">
                                                        {service.details.map((detail, idx) => (
                                                            <li key={idx} className="flex items-start text-sm text-gray-300">
                                                                <CheckCircle className="w-4 h-4 mr-3 text-blue-500 shrink-0 mt-0.5" />
                                                                {detail}
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

                    {/* 5. COMPARISON BAR - Mandatory Dual Bar Layout */}
                    <section className="py-16 md:py-24 px-6 md:px-12 relative overflow-hidden animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-300">
                        <div className="max-w-7xl mx-auto">
                            <RevealOnScroll>
                                <div className="text-center mb-12 md:mb-16">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 leading-tight">Why Quantity Survey & Billing Audits Are Essential</h2>
                                </div>
                            </RevealOnScroll>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
                                {/* LEFT: RED BAR (Without QS) */}
                                <RevealOnScroll>
                                    <div className="h-full bg-gradient-to-b from-red-950/30 to-black p-10 rounded-[2.5rem] border border-red-500/20 text-center relative overflow-hidden group hover:border-red-500/50 transition-all duration-500 flex flex-col">
                                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>

                                        <div className="relative z-10 flex flex-col h-full">
                                            <div className="mb-8 p-4 bg-red-500/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto border border-red-500/20">
                                                <AlertTriangle className="w-10 h-10 text-red-500" />
                                            </div>
                                            <h3 className="text-3xl font-bold text-red-500 mb-8">Without Proper QS & Billing Audit</h3>

                                            <ul className="space-y-5 text-left w-full pl-4 grow">
                                                <li className="flex items-start text-gray-300 text-lg"><span className="text-red-500 mr-3 text-xl">✕</span> Overbilling & inflated quantities</li>
                                                <li className="flex items-start text-gray-300 text-lg"><span className="text-red-500 mr-3 text-xl">✕</span> Financial leakages & hidden costs</li>
                                                <li className="flex items-start text-gray-300 text-lg"><span className="text-red-500 mr-3 text-xl">✕</span> Incorrect measurement records</li>
                                                <li className="flex items-start text-gray-300 text-lg"><span className="text-red-500 mr-3 text-xl">✕</span> Hidden discrepancies in bills</li>
                                                <li className="flex items-start text-gray-300 text-lg"><span className="text-red-500 mr-3 text-xl">✕</span> No commercial transparency</li>
                                            </ul>

                                            <div className="mt-8 pt-8 border-t border-red-500/20">
                                                <p className="text-red-400 font-bold text-xl uppercase tracking-wide">Result: Uncontrolled costs and inaccurate project financials.</p>
                                            </div>
                                        </div>
                                    </div>
                                </RevealOnScroll>

                                {/* RIGHT: BLUE BAR (With QS) */}
                                <RevealOnScroll>
                                    <div className="h-full bg-gradient-to-b from-blue-950/30 to-black p-8 md:p-10 rounded-[2.5rem] border border-blue-500/30 text-center relative overflow-hidden group hover:border-blue-400 transition-all duration-500 flex flex-col shadow-[0_0_50px_rgba(37,99,235,0.1)]">
                                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

                                        <div className="relative z-10 flex flex-col h-full">
                                            <div className="mb-6 md:mb-8 p-4 bg-blue-500/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                                                <CheckCircle className="w-10 h-10 text-blue-400" />
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-bold text-blue-400 mb-6 md:mb-8">With MANO QS & Billing Audit Services</h3>

                                            <ul className="space-y-4 md:space-y-5 text-left w-full pl-4 grow">
                                                <li className="flex items-start text-gray-100 text-base md:text-lg"><BadgeCheck className="w-6 h-6 text-blue-400 mr-3 shrink-0" /> Verified quantities</li>
                                                <li className="flex items-start text-gray-100 text-base md:text-lg"><BadgeCheck className="w-6 h-6 text-blue-400 mr-3 shrink-0" /> Transparent payments</li>
                                                <li className="flex items-start text-gray-100 text-base md:text-lg"><BadgeCheck className="w-6 h-6 text-blue-400 mr-3 shrink-0" /> Error-free documentation</li>
                                                <li className="flex items-start text-gray-100 text-base md:text-lg"><BadgeCheck className="w-6 h-6 text-blue-400 mr-3 shrink-0" /> Dispute prevention</li>
                                                <li className="flex items-start text-gray-100 text-base md:text-lg"><BadgeCheck className="w-6 h-6 text-blue-400 mr-3 shrink-0" /> Total financial clarity</li>
                                            </ul>

                                            <div className="mt-8 pt-8 border-t border-blue-500/30 bg-blue-500/5 -mx-8 md:-mx-10 -mb-8 md:-mb-10 p-8 md:p-10">
                                                <p className="text-blue-300 font-bold text-lg md:text-xl uppercase tracking-wide">Result: Accurate, controlled, transparent project finances.</p>
                                            </div>
                                        </div>
                                    </div>
                                </RevealOnScroll>
                            </div>
                        </div>
                    </section>

                    {/* DIGITAL ERP SECTION */}
                    <RevealOnScroll>
                        <DigitalERPSection
                            title={`Specialized <span class="text-blue-500">Billing ERP</span> <br /> Verification Systems`}
                            description="Our digital billing ERP streamlines quantity verification and payment certification, ensuring error-free documentation and 100% transparent financial management."
                            features={[
                                { title: "Billing Accuracy Dashboards", icon: BarChart3 },
                                { title: "Quantity Verification Logs", icon: Activity },
                                { title: "Payment Trackers", icon: CreditCard },
                                { title: "Digital JMR Repositories", icon: Layout },
                            ]}
                        />
                    </RevealOnScroll>

                    {/* 6. WHY MANO - Glass Cards */}
                    <section className="py-16 md:py-24 px-6 md:px-12 bg-white/[0.02] animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-400">
                        <div className="max-w-7xl mx-auto">
                            <RevealOnScroll>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                                    <div>
                                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-6 mb-8 leading-tight">
                                            Why MANO for <span className="text-blue-500 block sm:inline lg:block">Quantity Survey & Billing Audit?</span>
                                        </h2>
                                        <div className="space-y-8">
                                            {[
                                                { title: "Accuracy in Quantity", text: "Strict validation of measurements to ensure every unit is accounted for.", icon: Target },
                                                { title: "Billing Integrity", text: "Protecting your bottom line by identifying and preventing overbilling.", icon: ShieldCheck },
                                                { title: "Financial Transparency", text: "Clear, document-backed audit trails for all project certifications.", icon: FileText },
                                                { title: "Smooth Closure", text: "Streamlining reconciliation and final account settlement process.", icon: CheckCircle },
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
                                                    <span className="text-4xl font-bold text-white mb-2">98%</span>
                                                    <span className="text-sm text-gray-400">Accuracy</span>
                                                </div>
                                                <div className="h-40 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-6 flex flex-col justify-center">
                                                    <span className="text-white text-lg font-bold">No<br />Overbilling</span>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="h-40 rounded-2xl bg-[#111] border border-white/10 p-6 flex flex-col justify-center">
                                                    <FileText className="w-10 h-10 text-blue-500 mb-4" />
                                                    <span className="text-gray-300 font-medium">Fast Certification</span>
                                                </div>
                                                <div className="h-64 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 flex flex-col justify-end">
                                                    <span className="text-4xl font-bold text-white mb-2">Qty</span>
                                                    <span className="text-sm text-gray-400">Verified</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        </div>
                    </section>

                    {/* 7. INDUSTRIES SUPPORTED */}
                    <ProjectTypes
                        title="Industries We Serve"
                        items={[
                            {
                                name: "Residential",
                                desc: "High-end apartments & townships.",
                                image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Commercial",
                                desc: "Offices, malls & business parks.",
                                image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "IT Parks",
                                desc: "Tech campuses & data centers.",
                                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Industrial",
                                desc: "Factories & warehouses.",
                                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Hospitality",
                                desc: "Hotels & resorts.",
                                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Infrastructure",
                                desc: "Roads & heavy infra.",
                                image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=800&h=600&auto=format&fit=crop"
                            }
                        ]}
                    />

                    {/* 8. PROCESS FLOW - Horizontal Glowing Timeline */}
                    <section className="py-24 px-6 overflow-x-hidden animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-600">
                        <div className="max-w-7xl mx-auto">
                            <RevealOnScroll>
                                <div className="text-center mb-16 md:mb-24">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 leading-tight">QS & Billing Audit Process Flow</h2>
                                </div>
                            </RevealOnScroll>

                            <div className="relative">
                                {/* Connecting Line (Desktop) */}
                                <div className="hidden absolute top-[2.5rem] left-0 w-full h-1 bg-gradient-to-r from-blue-900 via-blue-500 to-blue-900 opacity-30"></div>

                                <div className="grid grid-cols-3 gap-8 relative z-10">
                                    {timelineSteps.map((step, i) => (
                                        <RevealOnScroll key={i}>
                                            <div className="flex flex-col items-center text-center group">
                                                {/* Number Node */}
                                                <div className="w-20 h-20 rounded-full bg-black border-2 border-blue-500/30 flex items-center justify-center text-2xl font-bold text-blue-500 mb-8 group-hover:border-blue-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300 relative z-10 box-content">
                                                    {i + 1}
                                                    <div className="absolute inset-2 rounded-full border border-white/10"></div>
                                                </div>

                                                {/* Content */}
                                                <div className="relative p-6 rounded-2xl border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all shadow-lg backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 hover:to-blue-600/10 group w-full min-h-[140px] flex items-center justify-center">
                                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white/10"></div>
                                                    <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors leading-tight">{step}</h3>
                                                </div>
                                            </div>
                                        </RevealOnScroll>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 9. TRUST STATEMENT */}
                    <section className="py-16 md:py-24 px-6 md:px-12 text-center animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-700">
                        <div className="max-w-4xl mx-auto p-8 md:p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:to-blue-600/10 hover:border-blue-500/30 transition-all duration-500 backdrop-blur-md group">
                            <p className="text-xl md:text-3xl font-medium text-white leading-relaxed group-hover:text-blue-100 transition-colors">
                                "Top developers and contractors rely on MANO Project Consultants for precise, transparent, and dispute-free quantity and billing verification systems."
                            </p>
                        </div>
                    </section>

                    {/* 10. CTA */}
                    <section className="py-16 md:py-24 relative overflow-hidden animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-800">
                        <div className="absolute inset-0 bg-blue-900/20"></div>
                        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-blue-100 to-gray-500">Verify Quantities.</span> <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-blue-100 to-gray-500">Validate Bills.</span> <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-blue-100 to-gray-500">Protect Your Investment.</span>
                            </h2>
                            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                                Partner with MANO Project Consultants for transparent, accurate, and reliable QS & Billing Audit services.
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
                initialService="Quantity Survey & Billing Audit"
            />
        </div >
    );
};

export default QSAndAuditingTablet;

