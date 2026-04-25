import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, Clock, Users, Target, CheckCircle, ArrowRight, Leaf, Linkedin, Briefcase, TrendingUp, ShieldCheck, Lightbulb, MessageSquare, UserCheck, Hexagon, Triangle, Command, Ghost, Gem, Cpu } from 'lucide-react';
import RainbowButton from '../../components/RainbowButton';
import AboutHero from '../../components/HeroSections/AboutHero';



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
        });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [end, duration]);

    return <span ref={ref}>{count}</span>;
};

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

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {children}
        </div>
    );
};

import { useCompany } from '../../context/CompanyContext';
import ContactForm from '../../components/ContactForm';




const AboutUsMobile = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-blue-pattern text-white overflow-x-hidden font-sans selection:bg-blue-500/30">

            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
            `}</style>

            {/* Navbar (Duplicated for consistency, ideally should be a reuseable component) */}
            {/* Navbar (Duplicated for consistency, ideally should be a reuseable component) */}
            {/* Moved to Global Navbar component */}

            {/* Hero Section */}
            <AboutHero showStatsCard={false} />

            {/* Projects Managed Card Section */}
            <section className="relative py-8 px-5 overflow-hidden border-t border-white/5 bg-gradient-to-b from-black/90 to-blue-950/20">
                <RevealOnScroll>
                    <div className="max-w-4xl mx-auto">
                        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl shadow-2xl animated-white-border">
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 h-44 w-44 rounded-full bg-white/5 blur-3xl pointer-events-none" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
                                        <Briefcase className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold tracking-tight text-white">100+</div>
                                        <div className="text-xs text-zinc-400">Projects Managed</div>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-zinc-400">Timely Completion</span>
                                        <span className="text-white font-medium">95%</span>
                                    </div>
                                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800/50">
                                        <div className="h-full w-[95%] rounded-full bg-gradient-to-r from-white to-blue-500" />
                                    </div>
                                </div>

                                <div className="h-px w-full bg-white/10 mb-4" />

                                <div className="flex justify-between items-center text-center gap-2">
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="text-lg font-bold text-white">12+</span>
                                        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">Years</span>
                                    </div>
                                    <div className="w-px h-7 bg-white/10" />
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="text-lg font-bold text-white">50+</span>
                                        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">Experts</span>
                                    </div>
                                    <div className="w-px h-7 bg-white/10" />
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="text-lg font-bold text-white">100%</span>
                                        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">Commitment</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>



            {/* About The Company Section */}
            <section className="relative py-8 px-5 overflow-hidden bg-gradient-to-b from-black to-blue-950/20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.1)_0,rgba(0,0,0,0)_50%)] pointer-events-none"></div>
                <RevealOnScroll>
                    <div className="max-w-6xl mx-auto relative z-10">
                        <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2">About The Company</h2>

                        <div className="space-y-3">
                            {[
                                "MANO Projects Pvt. Ltd. is a multi disciplinary Construction & Management firm established in September 2010 by Mr. Mugilan Muthaiah and Mrs. Amirthavalli Mugilan, having its head office in Mumbai.",
                                "Our firm consists of young, qualified, committed, disciplined and dynamic professionals offering innovative management ideas and wide range of Project Management Consultancy, Planning, Budgeting and Quality control services & Contracting.",
                                "With over 25+ reputed clients and 90+ projects, we have successfully established ourselves in Maharashtra, Gujarat, Goa, Kerala, Karnataka, Andhra Pradesh, Madhya Pradesh & Telangana."
                            ].map((text, index) => (
                                <div key={index} className="group relative p-4 rounded-xl border border-white/10 hover:border-blue-500/30 transition-all shadow-lg overflow-hidden backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 hover:to-blue-600/10 animated-white-border">
                                    <div className="flex gap-3 items-start relative z-10">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                                                <Leaf className="w-4 h-4 text-white" />
                                            </div>
                                            <div className="w-[2px] h-full min-h-[35px] bg-gradient-to-b from-blue-600 to-transparent opacity-50"></div>
                                        </div>
                                        <div className="pt-1">
                                            <p className="text-gray-300 leading-relaxed text-sm font-light">
                                                {text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* Why MANO Project Consultants? */}
            <section className="relative py-8 px-5 overflow-hidden border-t border-white/5 bg-gradient-to-b from-black via-blue-950/10 to-black">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
                <RevealOnScroll>
                    <div className="max-w-6xl mx-auto relative z-10">
                        <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2">Why MANO Project Consultants Private Limited?</h2>

                        <div className="grid grid-cols-1 gap-3">
                            {[
                                {
                                    title: "End-to-End Project Expertise",
                                    desc: "From feasibility to final handover, we ensure comprehensive management, evaluation, and control at every step.",
                                    icon: Briefcase
                                },
                                {
                                    title: "Efficient Scheduling & Budgeting",
                                    desc: "We specialize in scheduling using CPM & PERT, ensuring cost-effective and timely completion.",
                                    icon: TrendingUp
                                },
                                {
                                    title: "Quality Assurance & Transparency",
                                    desc: "We follow strict QA/QC procedures to maintain consistency and transparency across all stages of execution.",
                                    icon: ShieldCheck
                                }
                            ].map((feature, i) => (
                                <div key={i} className="group relative p-4 rounded-xl border border-white/10 hover:border-blue-500/30 transition-all shadow-lg overflow-hidden backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 hover:to-blue-600/10 animated-white-border">
                                    <div className="relative z-10 flex gap-3 items-start">
                                        <div className="w-9 h-9 rounded-full bg-blue-600/20 flex items-center justify-center shrink-0 border border-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                                            <feature.icon className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-semibold mb-2 text-gray-200">{feature.title}</h3>
                                            <p className="text-gray-400 font-light text-sm mb-3">{feature.desc}</p>
                                            <div className="flex items-center text-sm font-medium text-blue-500 group-hover:text-blue-400 transition-colors cursor-pointer">
                                                Explore More
                                                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* Punctual in Time */}
            <section className="relative py-8 px-5 text-center overflow-hidden border-t border-white/5 bg-gradient-to-b from-black to-blue-950/30">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
                <RevealOnScroll>
                    <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center gap-4">
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-1">Punctual in Time</h2>
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-1">Particular in Commitment</h2>
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-1">
                            <CountUp end={90} />%+ Client Satisfaction Rate
                        </h2>

                        <h2 className="mt-10 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-4">CORE VALUES</h2>
                        <div className="grid grid-cols-1 gap-3 w-full max-w-6xl mx-auto">
                            {[
                                { name: 'Stakeholder Focus', desc: 'We are committed to fostering strong values, ethical practices, and a clear vision that balances the interests of all stakeholders.', icon: Target },
                                { name: 'Sustainability', desc: 'We actively promote social responsibility by contributing toward a pollution-free and sustainable environment.', icon: Leaf },
                                { name: 'Integrity & Transparency', desc: 'Integrity is at the core of our character—guided by strong business ethics, transparency, and clearly defined standards of professional conduct.', icon: ShieldCheck },
                                { name: 'Collective Ownership', desc: 'We believe in collective ownership, encouraging accountability, collaboration, and shared responsibility across all assigned projects.', icon: Users }
                            ].map((item, index) => (
                                <div
                                    key={item.name}
                                    className="group relative p-4 rounded-xl border border-white/10 backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 hover:to-blue-600/10 hover:border-blue-500/30 transition-all duration-300 flex flex-col items-start gap-2 shadow-lg overflow-hidden animated-white-border text-left"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-blue-500/50 group-hover:bg-blue-600/20 transition-all duration-300 relative z-10">
                                        <item.icon className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                                    </div>
                                    <div className="relative z-10">
                                        <h3 className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">{item.name}</h3>
                                        <p className="text-gray-400 text-xs leading-relaxed font-light mt-1">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* Vision & Mission */}
            {/* Vision & Mission */}
            <section className="relative py-8 px-5 overflow-hidden bg-gradient-to-b from-black via-blue-950/10 to-black border-t border-white/5">
                <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>
                <RevealOnScroll>
                    <div className="max-w-6xl mx-auto space-y-4 relative z-10">
                        {/* Vision Card */}
                        <div className="group relative p-5 rounded-2xl border border-white/10 overflow-hidden shadow-2xl hover:border-blue-500/30 transition-all backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 hover:to-blue-600/10 animated-white-border">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-900/10 blur-[80px] rounded-full pointer-events-none"></div>
                            <div className="flex gap-3 items-start relative z-10">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                                        <Leaf className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="w-[2px] h-full min-h-[36px] bg-gradient-to-b from-blue-600 to-transparent opacity-50"></div>
                                </div>
                                <div className="flex-1 pt-1">
                                    <h3 className="text-xl font-bold mb-3 text-white">Vision</h3>
                                    <ul className="space-y-2">
                                        {[
                                            "To become a significant force in the real estate sector through the development of self-owned real estate and industrial projects.",
                                            "To be recognized for excellence through a team of highly competent engineers who earn client trust by delivering complex projects within timelines.",
                                            "To position MANO as a trusted partner that contributes to the prosperity and diligence of associated organizations.",
                                            "To achieve a milestone of 6 million sq. ft. of construction by FY 2025–26, with a projected turnover of ₹50 crore."
                                        ].map((item, i) => (
                                            <li key={i} className="flex gap-4 items-start group/item">
                                                <div className="mt-1 w-5 h-5 rounded-full bg-blue-900/50 flex items-center justify-center border border-blue-500/50 group-hover/item:bg-blue-600 group-hover/item:border-blue-600 transition-colors">
                                                    <CheckCircle className="w-3 h-3 text-white" />
                                                </div>
                                                <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Mission Card */}
                        <div className="group relative p-5 rounded-2xl border border-white/10 overflow-hidden shadow-2xl hover:border-blue-500/30 transition-all backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 hover:to-blue-600/10 animated-white-border">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-900/10 blur-[80px] rounded-full pointer-events-none"></div>
                            <div className="flex gap-3 items-start relative z-10">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                                        <Leaf className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="w-[2px] h-full min-h-[36px] bg-gradient-to-b from-blue-600 to-transparent opacity-50"></div>
                                </div>
                                <div className="flex-1 pt-1">
                                    <h3 className="text-xl font-bold mb-3 text-white">Mission</h3>
                                    <ul className="space-y-2">
                                        {[
                                            "To ensure timely and reliable payments to all staff, subcontractors, and suppliers, enabling seamless project execution.",
                                            "To drive innovation by leveraging the creativity and potential of young talent.",
                                            "To empower and upskill newcomers through training in emerging technologies, ensuring productive and future-ready outcomes.",
                                            "To strictly adhere to Standard Operating Procedures (SOPs) to enhance efficiency and accelerate progress toward our goals.",
                                            "To build long-lasting client relationships by delivering exceptional stakeholder value in an environment rooted in trust and mutual respect."
                                        ].map((item, i) => (
                                            <li key={i} className="flex gap-4 items-start group/item">
                                                <div className="mt-1 w-5 h-5 rounded-full bg-blue-900/50 flex items-center justify-center border border-blue-500/50 group-hover/item:bg-blue-600 group-hover/item:border-blue-600 transition-colors">
                                                    <CheckCircle className="w-3 h-3 text-white" />
                                                </div>
                                                <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* Team Section */}
            <section id="team" className="relative py-8 px-5 overflow-hidden border-t border-white/5">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
                <RevealOnScroll>
                    <div className="max-w-7xl mx-auto text-left">
                        <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2">About The Team</h2>

                        <div className="space-y-8">
                            {[
                                {
                                    name: "Mr. Mugilan Muthaiah",
                                    role: "Founder & CEO",
                                    expertise: ["Construction Management", "NICMAR Alumni", "Strategic Leadership"],
                                    bio: "With a Post Graduate program in Construction Management from NICMAR Pune and Civil Engineering background, he has worked with reputed companies across various projects. A specialist in Residential, Retail, and Hospitality projects with a clear vision and successful leadership.",
                                    ps: "Committed to integrity, transparency, and client satisfaction."
                                },
                                {
                                    name: "Mrs. Amirthavalli Mugilan",
                                    role: "Board of Director",
                                    expertise: ["Office Administration", "Vendor Management", "HR & Coordination"],
                                    bio: "Studied Graduate in Business Administration, she has sound experience in office administration pertaining to the construction field. Her role involves entire office administration, vendor management, HR, and interdependent coordination with all stakeholders.",
                                    ps: "Driving operational excellence and organizational growth."
                                },
                                {
                                    name: "Mr. N Subramanian",
                                    role: "Project Director",
                                    expertise: ["Large Scale Projects", "Hospitality & Commercial", "Infrastructure"],
                                    bio: "Holds a strong experience of more than 25+ years into management of large scale construction projects. He has worked at various top-level management positions in highly esteemed companies. He has completed more than 80 Lakh sq. ft of construction at various sites across India.",
                                    ps: "Expert in Residential, Retail, and Hospitality typologies."
                                }
                            ].map((leader, index) => (
                                <div key={index} className="flex flex-col gap-4 items-stretch">
                                    <div className="w-full relative z-10 shrink-0">
                                        <div className="absolute top-[-10px] left-4 right-4 h-full bg-[#111] border border-white/10 rounded-2xl -z-10 scale-[0.98] transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-[1.02] group-hover:bg-[#151515]"></div>
                                        <div className="absolute top-[-20px] left-8 right-8 h-full bg-[#0a0a0a] border border-white/5 rounded-2xl -z-20 scale-[0.96] transition-all duration-500 group-hover:-translate-y-4 group-hover:scale-[0.98] group-hover:bg-[#111]"></div>

                                        <div className="h-full p-4 rounded-xl border border-white/10 flex flex-col gap-4 backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 relative overflow-hidden transition-all duration-500 hover:border-blue-500/30 hover:to-blue-600/10 hover:shadow-lg animated-white-border">
                                            <div className="relative z-10">
                                                <div className="flex justify-between items-start mb-6">
                                                    <div className="flex gap-4 items-center">
                                                        <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
                                                            <Users className="w-6 h-6 text-blue-400" />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-base font-bold text-white">{leader.name}</h3>
                                                            <p className="text-gray-500 text-sm">{leader.role}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="p-3 rounded-xl bg-[#0a0a0a] border border-white/5 mt-auto">
                                                    <h4 className="text-sm font-semibold text-gray-200 mb-3">Expertise</h4>
                                                    <ul className="space-y-2 text-sm text-gray-400">
                                                        {leader.expertise.map((exp, i) => (
                                                            <li key={i} className="flex items-center gap-2">
                                                                <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                                                                {exp}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full p-4 rounded-xl border border-white/10 backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 relative flex flex-col justify-center min-h-[210px] transition-all duration-500 hover:border-blue-500/30 hover:to-blue-600/10 hover:shadow-lg animated-white-border">
                                        <div className="relative z-10">
                                            <p className="text-gray-300 leading-relaxed text-sm font-light mb-4 italic">
                                                "{leader.bio}"
                                            </p>

                                            <div className="mt-8 flex items-center gap-3">
                                                <div className="w-8 h-px bg-blue-500/50"></div>
                                                <p className="text-sm text-blue-400 font-medium">
                                                    {leader.ps}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Team Grid (Brief list) */}
                        <div className="mt-10">
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-bold text-white mb-3">Our Engineering Strength</h3>
                                <p className="text-gray-400 text-sm px-2">A dedicated team of 50+ young, dynamic & qualified engineers mentored by industry leaders.</p>
                            </div>

                            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 py-4 backdrop-blur-xl">
                                <div
                                    className="relative flex overflow-hidden group"
                                    style={{
                                        maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                                        WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
                                    }}
                                >
                                    <div className="animate-marquee flex gap-3 whitespace-nowrap px-3 group-hover:[animation-play-state:paused]">
                                        {[
                                            "Mrs. Gayathri Segar (M Arch)",
                                            "Mr. Raj Narayanan (BE- Civil)",
                                            "Mr. Sanjeev Gupta (BE Civil Head - Billing)",
                                            "Miss. Priyal Singh (BA–Administration & HR)",
                                            "Mr. Syed Arshal Qazi (BE Civil)",
                                            "Mr. Nikhil Dangle (BE Civil)",
                                            "Mr. Harshad Padwal (BD)",
                                            "Mr. Manoj Kumar (BE Civil)",
                                            "Miss. Hemlata Jople (BE Civil)",
                                            "Mr. Surya Senthilkumar (BE Civil)",
                                            "Miss. Riya Jadhav (BE Civil)",
                                            "Mr. Tanush Parab (BE Civil)",
                                            // Duplicate for seamless loop
                                            "Mrs. Gayathri Segar (M Arch)",
                                            "Mr. Raj Narayanan (BE- Civil)",
                                            "Mr. Sanjeev Gupta (BE Civil Head - Billing)",
                                            "Miss. Priyal Singh (BA–Administration & HR)",
                                            "Mr. Syed Arshal Qazi (BE Civil)",
                                            "Mr. Nikhil Dangle (BE Civil)",
                                            "Mr. Harshad Padwal (BD)",
                                            "Mr. Manoj Kumar (BE Civil)",
                                            "Miss. Hemlata Jople (BE Civil)",
                                            "Mr. Surya Senthilkumar (BE Civil)",
                                            "Miss. Riya Jadhav (BE Civil)",
                                            "Mr. Tanush Parab (BE Civil)"
                                        ].map((member, i) => (
                                            <div key={i} className="flex-shrink-0 px-5 py-2.5 rounded-xl border border-white/5 bg-white/5 text-center transition-all hover:bg-blue-600/10 hover:border-blue-500/30">
                                                <p className="text-xs text-gray-300 font-medium whitespace-nowrap">{member}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* Contact Form */}
            <section id="contact-section" className="relative px-5 py-8 overflow-hidden bg-gradient-to-t from-blue-950/20 to-black border-t border-white/5">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>
                <RevealOnScroll>
                    <h2 className="text-2xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2">Ready to Start Your Project?</h2>

                    <div className="max-w-3xl mx-auto space-y-3">
                        <ContactForm />
                    </div>
                </RevealOnScroll>
            </section>


        </div >
    );
};

export default AboutUsMobile;
