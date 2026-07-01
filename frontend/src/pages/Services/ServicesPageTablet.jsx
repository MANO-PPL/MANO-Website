import React, { useState, useEffect, useRef } from 'react';

import {
    ChevronRight, Briefcase, Calculator, TrendingUp, ShieldCheck,
    FileText, Shield, Hammer, Map, Layout, Zap, Users, BarChart,
    CheckCircle, Truck, Factory, Building, HardHat, ClipboardCheck,
    Calendar, Activity, GitPullRequest, LineChart, CheckSquare, Layers, Clock, ClipboardList,
    Ruler, AlertTriangle, Package, Settings, Scale, ScrollText, Microscope
} from 'lucide-react';
import { Link } from 'react-router-dom';
import RainbowButton from '../../components/RainbowButton';
import ContactModal from '../../components/ContactModal';
import ServiceHero from '../../components/HeroSections/ServiceHero';
import { useCompany } from '../../context/CompanyContext';
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



const ServicesPageTablet = () => {
    const { brand, isEPC } = useCompany();
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

        // Fallback timer
        const timer = setTimeout(() => {
            setIsLoaded(true);
            removeListeners();
        }, 1500);

        return () => {
            removeListeners();
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // const { isPMC, isEPC } = useCompany();

    const coreServices = [
        {
            title: "Project Planning",
            desc: "Strategic planning and scheduling using CPM & PERT techniques to establish a strong project foundation.",
            icon: Map,
            items: [
                { text: "Master project scheduling", icon: Calendar },
                { text: "Resource & manpower histograms", icon: Users },
                { text: "MSP & CPM/PERT logic", icon: Layers },
                { text: "Site logistics & methodology", icon: FileText }
            ],
            link: "/services/project-planning"
        },
        {
            title: "Project Management",
            desc: "End-to-end management ensuring complete alignment between design, cost, quality, and timelines.",
            icon: Briefcase,
            items: [
                { text: "Execution monitoring & control", icon: Activity },
                { text: "Stakeholder coordination", icon: Users },
                { text: "Progress tracking (MIS/KPI)", icon: BarChart },
                { text: "Change management", icon: GitPullRequest }
            ],
            link: "/services/project-management"
        },
        {
            title: "Project Execution",
            desc: "Structured execution leadership that translates complex plans into on-ground action with precision.",
            icon: Hammer,
            items: [
                { text: "On-site execution leadership", icon: HardHat },
                { text: "Quality & timeline discipline", icon: ShieldCheck },
                { text: "Interface management", icon: Layers },
                { text: "Daily progress tracking", icon: Clock }
            ],
            link: "/services/project-execution"
        },
        {
            title: "Cost Consultancy",
            desc: "Accurate cost planning and financial control to ensure projects deliver maximum value within budget.",
            icon: Calculator,
            items: [
                { text: "Cost estimation & budgeting", icon: Calculator },
                { text: "Value engineering", icon: LineChart },
                { text: "Rate analysis & material control", icon: ClipboardList },
                { text: "Cash flow forecasting", icon: CheckSquare }
            ],
            link: "/services/cost-consultancy"
        }
    ];

    const specializedServices = [
        {
            title: "Contract Management",
            desc: "Protecting project interests through robust contracts, tender evaluation, and proactive risk mitigation.",
            items: [
                { text: "Contract strategy & drafting", icon: ScrollText },
                { text: "Tender & vendor finalization", icon: Scale },
                { text: "Claims management", icon: AlertTriangle },
                { text: "Dispute avoidance", icon: ShieldCheck }
            ],
            icon: Scale,
            link: "/services/contract-management"
        },
        {
            title: "Quality Assurance & Audit",
            desc: "Ensuring uncompromised excellence through structured quality frameworks and rigorous audits.",
            items: [
                { text: "QA/QC matrix & assurance plans", icon: ClipboardCheck },
                { text: "Process compliance audits", icon: CheckCircle },
                { text: "Material quality control", icon: Package },
                { text: "Snagging & handover closure", icon: Layers }
            ],
            icon: ShieldCheck,
            link: "/services/qa-audit"
        },
        {
            title: "Quantity Survey & Billing Service & Auditing",
            desc: "Ensuring financial transparency and accuracy through detailed quantity verification and billing audits.",
            items: [
                { text: "Quantity verification (JMRS)", icon: Ruler },
                { text: "Billing audits & certification", icon: FileText },
                { text: "No overbilling assurance", icon: ShieldCheck },
                { text: "Financial reconciliation", icon: Calculator }
            ],
            icon: FileText,
            link: "/services/qs-billing-audit"
        },
        {
            title: "Environment, Health & Safety Service & Audit",
            desc: "Maintaining zero-incident sites through rigorous EHS compliance, training, and safety management systems.",
            items: [
                { text: "Safety audits & risk assessment", icon: HardHat },
                { text: "Regulatory compliance", icon: FileText },
                { text: "Zero-accident culture", icon: Activity },
                { text: "Safety management training", icon: Shield }
            ],
            icon: Shield,
            link: "/services/ehs-audit"
        }
    ];

    const deliveryModel = [
        { step: "01", title: "Requirement Analysis", icon: Layout },
        { step: "02", title: "Planning & Strategy", icon: Map },
        { step: "03", title: "Execution & Monitoring", icon: Briefcase },
        { step: "04", title: "Quality & Audits", icon: ShieldCheck },
        { step: "05", title: "Reporting & Optimization", icon: BarChart },
        { step: "06", title: "Successful Closure", icon: CheckCircle }
    ];

    return (
        <div className="min-h-screen bg-blue-pattern text-white overflow-x-hidden font-sans selection:bg-blue-500/30">
            {/* 1. HERO SECTION */}
            <ServiceHero />

            {isLoaded && (
                <>



                    {/* 3. CORE SERVICES */}
                    {isEPC ? (
                        /* EPC SPECIFIC VIEW - ONE MAIN SERVICE */
                        <section id="core-services" className="py-16 md:py-24 px-6 md:px-12 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-100">
                            <RevealOnScroll>
                                <div className="max-w-7xl mx-auto">
                                    <div className="text-center mb-16">
                                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2 leading-tight">Our Specialized Service</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
                                        <Link to={`/${brand.toLowerCase()}/services/epc`} className="group relative p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:to-blue-600/10 hover:border-blue-500/30 transition-all duration-500 overflow-hidden block animated-white-border">
                                            <div className="absolute -bottom-10 -right-10 text-white/5 group-hover:text-blue-500/10 transition-colors duration-500 pointer-events-none transform rotate-12">
                                                <Hammer size={180} />
                                            </div>
                                            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                                                <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                                    <Hammer className="w-12 h-12 text-blue-400 group-hover:text-white transition-colors" />
                                                </div>
                                                <div className="text-center md:text-left">
                                                    <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">EPC Solutions</h3>
                                                    <p className="text-gray-400 mb-6 leading-relaxed text-lg">Comprehensive Engineering, Procurement, and Construction services delivering turnkey infrastructure solutions.</p>
                                                    <div className="inline-flex items-center text-blue-400 hover:text-white font-bold text-lg transition-colors group/link">
                                                        Explore Solution
                                                        <ChevronRight className="w-5 h-5 ml-2 group-hover/link:translate-x-1 transition-transform" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        </section>
                    ) : (
                        /* PMC DEFAULT VIEW */
                        <>
                            <section id="core-services" className="py-16 md:py-24 px-6 md:px-12 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-100">
                                <RevealOnScroll>
                                    <div className="max-w-7xl mx-auto">
                                        <div className="text-center mb-16">
                                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2 leading-tight">Our Core Services</h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {coreServices.map((service, index) => (
                                                <Link to={`/${brand.toLowerCase()}${service.link}`} key={index} className="group relative p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:to-blue-600/10 hover:border-blue-500/30 transition-all duration-500 overflow-hidden block animated-white-border">
                                                    <div className="absolute -bottom-10 -right-10 text-white/5 group-hover:text-blue-500/10 transition-colors duration-500 pointer-events-none transform rotate-12">
                                                        <service.icon size={180} />
                                                    </div>

                                                    <div className="relative z-10">
                                                        <div className="w-14 h-14 rounded-xl mb-6 bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.1)]">
                                                            <service.icon className="w-7 h-7 text-blue-400 group-hover:text-white transition-colors" />
                                                        </div>

                                                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{service.title}</h3>
                                                        <p className="text-gray-400 mb-8 leading-relaxed h-14">{service.desc}</p>

                                                        <div className="bg-black/20 rounded-xl p-6 mb-8 border border-white/5 group-hover:border-white/10 transition-colors">
                                                            <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wide">Includes:</h4>
                                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                                {service.items.map((item, idx) => (
                                                                    <li key={idx} className="flex items-center text-sm text-gray-400">
                                                                        <item.icon className="w-4 h-4 mr-2 text-blue-500" />
                                                                        {item.text}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        <div className="inline-flex items-center text-blue-400 hover:text-white font-medium transition-colors group/link">
                                                            Explore Solution
                                                            <ChevronRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </RevealOnScroll>
                            </section>

                            <section className="py-16 md:py-24 px-6 md:px-12 bg-white/[0.02] animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-200">
                                <RevealOnScroll>
                                    <div className="max-w-7xl mx-auto">
                                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-6 sm:pb-12 mb-8 border-b border-white/10 leading-tight">Specialized Services</h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {specializedServices.map((service, index) => (
                                                <Link to={`/${brand.toLowerCase()}${service.link}`} key={index} className="group relative p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:to-blue-600/10 hover:border-blue-500/30 transition-all duration-500 overflow-hidden block animated-white-border">
                                                    <div className="absolute -bottom-10 -right-10 text-white/5 group-hover:text-blue-500/10 transition-colors duration-500 pointer-events-none transform rotate-12">
                                                        <service.icon size={180} />
                                                    </div>

                                                    <div className="relative z-10">
                                                        <div className="w-14 h-14 rounded-xl mb-6 bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.1)]">
                                                            <service.icon className="w-7 h-7 text-blue-400 group-hover:text-white transition-colors" />
                                                        </div>

                                                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{service.title}</h3>
                                                        <p className="text-gray-400 mb-8 leading-relaxed h-14">{service.desc}</p>

                                                        <div className="bg-black/20 rounded-xl p-6 border border-white/5 group-hover:border-white/10 transition-colors">
                                                            <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wide">Key Focus Areas:</h4>
                                                            <ul className="grid grid-cols-1 gap-3">
                                                                {service.items.map((item, idx) => (
                                                                    <li key={idx} className="flex items-center text-sm text-gray-400">
                                                                        <item.icon className="w-4 h-4 mr-2 text-blue-500 shrink-0" />
                                                                        {item.text}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </RevealOnScroll>
                            </section>
                        </>
                    )}

                    {/* 4. DIGITAL ERP SECTION (PMC ONLY) */}
                    {!isEPC && (
                        <RevealOnScroll>
                            <DigitalERPSection />
                        </RevealOnScroll>
                    )}

                    {/* 5. WHY CHOOSE MANO */}
                    <section className="py-16 md:py-24 px-6 md:px-12 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-300">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                                <div>
                                    <span className="text-blue-500 font-semibold tracking-wider text-sm uppercase mb-4 block">Service Philosophy</span>
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-4 sm:pb-6 mb-8 leading-tight">
                                        Why Choose <span className="text-blue-500 block sm:inline lg:block">MANO Consultants?</span>
                                    </h2>
                                    <div className="space-y-8">
                                        {[
                                            { title: "End-to-End Expertise", text: "From concept to completion, our services cover every project phase under one roof." },
                                            { title: "Data-Driven Decisions", text: "We rely on analytics, structured methodologies, and proven frameworks to deliver predictable outcomes." },
                                            { title: "Transparency & Accountability", text: "Clear reporting, cost clarity, and measurable progress tracking at every stage." },
                                            { title: "Quality-Focused Delivery", text: "Strict quality controls and audits ensure excellence without compromise." },
                                        ].map((item, index) => (
                                            <div key={index} className="flex gap-4">
                                                <div className="w-12 h-12 rounded-full border border-blue-500/30 bg-blue-500/10 flex items-center justify-center shrink-0 text-blue-400 font-bold">
                                                    {index + 1}
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
                                                <span className="text-sm text-gray-400">Process Adherence</span>
                                            </div>
                                            <div className="h-40 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-6 flex flex-col justify-center">
                                                <span className="text-white text-lg font-bold">Industry<br />Leaders</span>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="h-40 rounded-2xl bg-[#111] border border-white/10 p-6 flex flex-col justify-center">
                                                <ShieldCheck className="w-10 h-10 text-blue-500 mb-4" />
                                                <span className="text-gray-300 font-medium">ISO Certified Processes</span>
                                            </div>
                                            <div className="h-64 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 flex flex-col justify-end">
                                                <span className="text-4xl font-bold text-white mb-2">24/7</span>
                                                <span className="text-sm text-gray-400">Project Monitoring</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </section>

                    {/* 6. INDUSTRIES SERVED */}
                    <ProjectTypes
                        title="Industries We Serve"
                        items={[
                            {
                                name: "Residential Developments",
                                desc: "High-rise apartments, townships, and luxury villas.",
                                image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Commercial & Corporate",
                                desc: "Office parks, IT campuses, and retail complexes.",
                                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Industrial Projects",
                                desc: "Factories, warehouses, and logistic hubs.",
                                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Hospitality & Mixed-Use",
                                desc: "Hotels, resorts, and integrated developments.",
                                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Infrastructure",
                                desc: "Roads, bridges, and public infrastructure.",
                                image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=800&h=600&auto=format&fit=crop"
                            }
                        ]}
                    />

                    {/* 7. SERVICE DELIVERY MODEL */}
                    <section className="py-16 md:py-24 px-6 md:px-12 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-500">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-16 md:mb-20">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-4 leading-normal">Service Delivery Model</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {deliveryModel.map((step, index) => (
                                        <div key={index} className="group relative p-8 rounded-2xl border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all shadow-lg backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 hover:to-blue-600/10 animated-white-border">
                                            <div className="absolute top-6 right-6 text-6xl font-bold text-white/5 group-hover:text-blue-500/10 transition-colors pointer-events-none">
                                                {step.step}
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

                    {/* 8. TRUST STATEMENT */}
                    <section className="py-16 md:py-24 px-6 md:px-12 text-center animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-600">
                        <div className="max-w-4xl mx-auto p-8 md:p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:to-blue-600/10 hover:border-blue-500/30 transition-all duration-500 backdrop-blur-md group">
                            <p className="text-xl md:text-3xl font-medium text-white leading-relaxed group-hover:text-blue-100 transition-colors">
                                "Trusted by developers, corporations, and institutions across India for delivering reliable, transparent, and results-driven consulting services."
                            </p>
                        </div>
                    </section>

                    {/* 9. CTA */}
                    <section className="py-16 md:py-24 relative overflow-hidden animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-700">
                        <div className="absolute inset-0 bg-blue-900/20"></div>
                        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">Ready to Elevate Your Project?</h2>
                            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                                Partner with MANO Project Consultants to plan smarter, execute better, and achieve guaranteed project success.
                            </p>
                            <div className="flex justify-center">
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
                initialService="General Inquiry"
            />
        </div>
    );
};

export default ServicesPageTablet;
