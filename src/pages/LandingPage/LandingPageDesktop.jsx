import React,{ useState, useEffect, useRef } from 'react';
import { ChevronRight, Briefcase, Calculator, ShieldCheck, FileText, Shield, Hammer, Map, Clock, Handshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

import LandingHero from '../../components/HeroSections/LandingHero';
import { useCompany } from '../../context/CompanyContext';
import ContactForm from '../../components/ContactForm';
import DigitalERPSection from '../../components/DigitalERPSection';
import LazyBgDiv from '../../components/LazyBgDiv';
import OptimizedImage from '../../components/OptimizedImage';


const TestimonialsColumn = (props) => {
  const { className, testimonials, duration } = props;
  return (
    <div className={className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2)].fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <div className="group relative p-8 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all shadow-lg overflow-hidden backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 hover:to-blue-600/10 w-full max-w-sm md:max-w-md animated-white-border" key={i}>
                <div className="text-gray-300 leading-relaxed mb-6">{text}</div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-br from-blue-500/50 to-transparent">
                    <img
                      src={`${import.meta.env.BASE_URL}${image}`}
                      alt={name}
                      loading="lazy"
                      className="w-full h-full rounded-full object-cover border border-black/50"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="font-bold text-white tracking-wide">{name}</div>
                    {role && <div className="text-sm text-blue-400 font-medium">{role}</div>}
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
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
          // Ease out expose
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



export default function LandingPageDesktop() {
  const { brand, isEPC } = useCompany();
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, section: null });

  const projects = [
    { name: 'Hotel Moon Palace', images: [`${import.meta.env.BASE_URL}Hotel Moon Kinshasa/001 (3).webp`] },
    { name: 'Triveni Crown', images: [`${import.meta.env.BASE_URL}HD Picture TRIVENI Crown, Kalyan/MAIN GATE/1.option 01-crown gate 01.webp`] },
    { name: 'Ananda Residency', images: [`${import.meta.env.BASE_URL}Ananda residency/Aerial.webp`] },
    { name: '30 Juin', images: [`${import.meta.env.BASE_URL}30 Juin/Tranjio Hotel 03.webp`] },
    { name: 'Ariana Residency', images: [`${import.meta.env.BASE_URL}Ariana Residency - HD Pictures/Ariana Night View.webp`] },
    { name: 'Triveni Classics', images: [`${import.meta.env.BASE_URL}HD Picture TRIVENI Classics, Kalyan/Triveni CLASSIC (NEW view) in progress.webp`] },
    { name: 'NSCI Dome', images: [`${import.meta.env.BASE_URL}NSCI/20.webp`] },
    { name: 'NIDIMO Kamala Mill', images: [`${import.meta.env.BASE_URL}NIDIMO - Kamala mill/2025-12-19 123025 1.webp`] },
    { name: 'Golf Apartment', images: [`${import.meta.env.BASE_URL}Golf Apartment/Golf Appartment 1 .jpg.webp`] },
    { name: 'Vista Meadows', images: [`${import.meta.env.BASE_URL}Vista Meadows - Vikhroli/WhatsApp Image 2026-02-09 at 2.16.56 PM.webp`] },
  ];

  const handleMouseMove = (e) => {
    const section = e.currentTarget;
    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const sectionWidth = rect.width;

    setMousePosition({ x, section: 'projects' });

    if (x < sectionWidth * 0.3) {
      // Left side - move right (show previous)
      setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
    } else if (x > sectionWidth * 0.7) {
      // Right side - move left (show next)
      setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
    }
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, section: null });
  };

  const testimonials = [
    {
      name: 'Mr. Ketan Musale',
      role: 'Dotom Realty',
      image: 'image.webp',
      text: 'Mr. Mugilan is working with our organization on several construction projects in the Borivali area. He is associated with projects such as Ananda Residency and Ariana Residency. His working pattern and management skills are excellent. He puts in complete effort along with his team, and his setup has been a great support to our firm.'
    },
    {
      name: 'Mr. Chetan Parmar',
      role: 'Parmar Group',
      image: 'image.webp',
      text: 'I have known Mr. Mugilan for the past 15 years. He is highly passionate about his work and always strives to complete every task in a perfect manner.'
    },
    {
      name: 'Mr. Ashok Jain',
      role: 'Adity Group of Company',
      image: 'image.webp',
      text: 'He has handled our Palava Project and Oberoi Goregaon Project for the last three years, and we have found his services to be excellent. We never had to worry about billing or QS matters, as we have complete trust in him and found everything to be perfectly managed.'
    },
    {
      name: 'Manisha Satra',
      role: 'Leading Tiles Distributor Lee Tiles',
      image: 'image.webp',
      text: 'I am working with Mr. Mugilan, and I appreciate his work. He acts as a mediator in amendment situations, always caring for vendors, and he is excellent in maintaining quality and timely delivery.'
    },
    {
      name: 'Mr. Pratik Gada',
      role: 'National Ply Laminate',
      image: 'image.webp',
      text: 'With regard to Mr. Mugilan’s services, his attitude toward work is excellent, and he is a very disciplined professional. His level of expertise is extremely high, which helps him manage projects effectively under strict time constraints.'
    }
  ];

  const faqs = [
    { question: 'What is PMC (Project Management Consultants)?', answer: 'Project Management Consultants (PMC) provide end-to-end professional services that plan, coordinate, and control a project from inception to completion. At MANO, our PMC services ensure your project is delivered on time, within budget, and to the highest quality standards by managing all stakeholders, resources, and risks.' },
    { question: 'What is (Cost Consultancy)?', answer: 'Cost Consultancy involves managing the financial health of a construction project. We provide accurate cost estimation, budgeting, value engineering, and financial monitoring. Our goal is to maximize your Return on Investment (ROI) while maintaining the design intent and quality of the project.' },
    { question: 'How do you manage quality if we hire you for only QA QC Service?', answer: 'If hired specifically for QA/QC, we implement a rigorous audit-driven framework including on-site inspections, material testing verification, compliance checks, and detailed non-conformity reporting. We act as an independent third party to ensure strict adherence to project quality standards.' },
    {
      question: 'What about PMC Charges?',
      answer: `Our PMC charges vary by project type and scale:
      • Residential Tower (> 3 Lakhs Sft, < 36 Months): Per Sft basis
      • Residential Tower (< 3 Lakhs Sft): Lumpsum basis
      • Factory, Logistic Park & Infra Projects: % of Construction Cost basis
      • Interior Fitout (Short-term): Man-Month basis
      • Part Services (Budget, Audit, etc.): Fixed cost on one-time or monthly basis`
    },
    { question: 'What services does MANO Consultants provide?', answer: 'We offer comprehensive project management, construction management, quantity surveying, and Cost Consultancy services tailored to your specific project needs.' },
    { question: 'How do you ensure project quality?', answer: 'Our rigorous quality assurance processes involves regular audits, compliance checks, and adherence to international standards to ensure the highest quality deliverables.' },
    { question: 'Do you handle residential projects?', answer: 'Yes, we handle a wide range of projects including residential complexes, commercial buildings, and industrial facilities with equal expertise.' },
    { question: 'What is your project management methodology?', answer: 'We employ a hybrid approach combining agile flexibility with structured waterfall milestones to ensure timely delivery while adapting to project changes.' },
    { question: 'How can we get a quote?', answer: 'You can contact us through our form below or email us directly. We will schedule a consultation to understand your requirements and provide a detailed proposal.' },
    { question: 'Do you work internationally?', answer: 'Yes, while we are based locally, we have the capability and experience to manage and consult on projects across various international locations.' }
  ];

  // --- Smooth carousel animation refs ---
  const currentIndexRef = useRef(0); // float value
  const targetIndexRef = useRef(0);  // fractional target

  // initialize target to middle on mount
  useEffect(() => {
    targetIndexRef.current = Math.round(projects.length / 2);
  }, []);

  // animation loop: ease currentIndexRef toward targetIndexRef and update state
  useEffect(() => {
    let rafId = null;
    const step = () => {
      // simple easing
      currentIndexRef.current += (targetIndexRef.current - currentIndexRef.current) * 0.08;
      const rounded = Math.round(currentIndexRef.current) % projects.length;
      // keep in bounds positive
      const idx = ((rounded % projects.length) + projects.length) % projects.length;
      setCurrentProjectIndex(idx);
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [projects.length]);

  // --- Auto-play effect ---
  useEffect(() => {
    const interval = setInterval(() => {
      targetIndexRef.current += 1;
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-blue-pattern text-white overflow-x-hidden">
      {/* Hero Section with Navigation */}
      <LandingHero />

      {/* Why Choose Section with Gradient */}
      <section className="relative px-6 sm:px-12 py-16 sm:py-24 border-t border-white/5 bg-gradient-to-b from-black to-blue-950/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.08)_0,rgba(0,0,0,0)_100%)] pointer-events-none"></div>
        <RevealOnScroll>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-6 text-center mb-12 relative z-10">
            Why Businesses <span className="text-blue-500">Choose</span> MANO Consultants
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            With 12 years of excellence, we blend deep industry knowledge with client-centric<br className="hidden sm:block" />
            approach to deliver measurable results in every project.
          </p>
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Card 1 */}
            <div className="group relative p-8 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all shadow-lg overflow-hidden backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 hover:to-blue-600/10 animated-white-border">
              <div className="flex items-start gap-6">
                <div className="flex flex-col items-center -ml-2">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                      <path d="M12 2C13.1046 2 14 2.89543 14 4V10C14 11.1046 13.1046 12 12 12C10.8954 12 10 11.1046 10 10V4C10 2.89543 10.8954 2 12 2Z" fill="white" opacity="0.95" />
                      <path d="M6 8C7.10457 8 8 8.89543 8 10V16C8 17.1046 7.10457 18 6 18C4.89543 18 4 17.1046 4 16V10C4 8.89543 4.89543 8 6 8Z" fill="#60A5FA" opacity="0.95" />
                    </svg>
                  </div>
                  <div className="w-px h-16 bg-gradient-to-b from-blue-500/50 to-transparent mt-2 rounded"></div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 text-white">End-to-End Project Expertise</h3>
                  <div className="flex items-start gap-3 text-gray-300">
                    <span className="mt-1 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/30">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <p className="text-gray-300 leading-relaxed">From feasibility to final handover — complete lifecycle management under one roof.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative p-8 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all shadow-lg overflow-hidden backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 hover:to-blue-600/10 animated-white-border">
              <div className="flex items-start gap-6">
                <div className="flex flex-col items-center -ml-2">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C13.1046 2 14 2.89543 14 4V10C14 11.1046 13.1046 12 12 12C10.8954 12 10 11.1046 10 10V4C10 2.89543 10.8954 2 12 2Z" fill="white" opacity="0.95" />
                      <path d="M6 8C7.10457 8 8 8.89543 8 10V16C8 17.1046 7.10457 18 6 18C4.89543 18 4 17.1046 4 16V10C4 8.89543 4.89543 8 6 8Z" fill="#60A5FA" opacity="0.95" />
                    </svg>
                  </div>
                  <div className="w-px h-16 bg-gradient-to-b from-blue-500/50 to-transparent mt-2 rounded"></div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 text-white">Cost Efficiency & Transparency</h3>
                  <div className="flex items-start gap-3 text-gray-300">
                    <span className="mt-1 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/30">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <p className="text-gray-300 leading-relaxed">Accurate estimations, budgeting, and specialist cost control ensure optimal financial performance.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative p-8 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all shadow-lg overflow-hidden backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 hover:to-blue-600/10 animated-white-border">
              <div className="flex items-start gap-6">
                <div className="flex flex-col items-center -ml-2">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C13.1046 2 14 2.89543 14 4V10C14 11.1046 13.1046 12 12 12C10.8954 12 10 11.1046 10 10V4C10 2.89543 10.8954 2 12 2Z" fill="white" opacity="0.95" />
                      <path d="M6 8C7.10457 8 8 8.89543 8 10V16C8 17.1046 7.10457 18 6 18C4.89543 18 4 17.1046 4 16V10C4 8.89543 4.89543 8 6 8Z" fill="#60A5FA" opacity="0.95" />
                    </svg>
                  </div>
                  <div className="w-px h-16 bg-gradient-to-b from-blue-500/50 to-transparent mt-2 rounded"></div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 text-white">Quality-Focused Delivery</h3>
                  <div className="flex items-start gap-3 text-gray-300">
                    <span className="mt-1 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/30">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <p className="text-gray-300 leading-relaxed">Strict QA/QC processes, audits, and compliance frameworks for flawless execution.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* WHY CLIENTS TRUST US STRIP */}
      <section className="py-16 sm:py-24 border-y border-white/5 bg-white/[0.02]">
        <RevealOnScroll>
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 text-white leading-tight">
              Why <span className="text-blue-500">Clients Trust</span> Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Predictable Delivery", text: "Timely execution backed by strong planning and monitoring.", icon: Clock },
                { title: "Transparent Processes", text: "Fully documented, audit-ready systems at every step.", icon: FileText },
                { title: "Cost & Risk Control", text: "Data-driven decisions ensure optimized cost and minimized risk.", icon: ShieldCheck },
                { title: "End-to-End Support", text: "From drawings to handover — we manage everything.", icon: Handshake },
              ].map((item, index) => (
                <div key={index} className="group relative p-8 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all shadow-lg overflow-hidden backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 hover:to-blue-600/10 flex flex-col items-start h-full animated-white-border">
                  <div className="w-14 h-14 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.1)]">
                    <item.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Digital ERP Section */}
      <RevealOnScroll>
        <DigitalERPSection />
      </RevealOnScroll>

      {/* Services Section with Hex/Grid Pattern */}
      <section id="services" className="relative px-6 sm:px-12 py-16 sm:py-24 overflow-hidden border-t border-white/5 bg-gradient-to-b from-black to-blue-950/30">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>
        <RevealOnScroll>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-6">Our Services</h2>
          <div className={`max-w-7xl mx-auto ${isEPC ? 'flex justify-center' : 'grid grid-cols-1 md:grid-cols-2'} gap-8`}>
            {
              (isEPC ? [
                {
                  title: "EPC Solution",
                  desc: "End-to-end Engineering, Procurement, and Construction services for turnkey delivery.",
                  path: "/services/epc",
                  icon: Hammer,
                  bgImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000"
                }
              ] : [
                {
                  title: "Project Management",
                  desc: "Seamless execution, monitoring, and milestone-driven progress tracking.",
                  path: "/services/project-management",
                  icon: Briefcase,
                  bgImage: `${import.meta.env.BASE_URL}project-management-bg.webp`
                },
                {
                  title: "Project Planning",
                  desc: "Strategic resource planning using advanced CPM & PERT techniques for project success.",
                  path: "/services/project-planning",
                  icon: Map,
                  bgImage: `${import.meta.env.BASE_URL}project-planning-bg.webp`
                },
                {
                  title: "Project Execution",
                  desc: "On-ground leadership and structured coordination for flawless project delivery.",
                  path: "/services/project-execution",
                  icon: Hammer,
                  bgImage: `${import.meta.env.BASE_URL}project-execution-bg.webp`
                },
                {
                  title: "Cost Consultancy",
                  desc: "Expert budgeting, value engineering, and financial control to maximize project ROI.",
                  path: "/services/cost-consultancy",
                  icon: Calculator,
                  bgImage: `${import.meta.env.BASE_URL}cost-consultancy-bg.webp`
                },
                {
                  title: "Contract Management",
                  desc: "Protecting project interests through robust contracts and proactive risk mitigation.",
                  path: "/services/contract-management",
                  icon: Handshake,
                  bgImage: `${import.meta.env.BASE_URL}contract-management-bg.webp`
                },
                {
                  title: "Quality Assurance & Quality Control Audit",
                  desc: "Comprehensive quality assurance and process audits ensuring uncompromised excellence.",
                  path: "/services/qa-audit",
                  icon: ShieldCheck,
                  bgImage: `${import.meta.env.BASE_URL}qa-audit-bg.webp`
                },
                {
                  title: "Quantity Survey & Billing Service & Auditing",
                  desc: "Detailed quantity surveying and billing verification for total transparency.",
                  path: "/services/qs-billing-audit",
                  icon: FileText,
                  bgImage: `${import.meta.env.BASE_URL}qs-billing-audit-bg.webp`
                },
                {
                  title: "Environment, Health & Safety Audit",
                  desc: "Health, Safety, and Environmental audits to maintain the highest safety standards.",
                  path: "/services/ehs-audit",
                  icon: Shield,
                  bgImage: `${import.meta.env.BASE_URL}ehs-audit-bg.webp`
                }
              ]).map((service, index) => (
                <Link
                  key={index}
                  to={`/${brand.toLowerCase()}${service.path}`}
                  className={`group relative h-[420px] sm:h-[480px] rounded-3xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-500 shadow-2xl animated-white-border flex flex-col justify-end ${isEPC ? 'w-full max-w-4xl' : ''}`}
                >
                  {/* Background Image with Filter */}
                  <LazyBgDiv
                    className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110"
                    src={service.bgImage}
                  />

                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors duration-500" />

                  {/* Content Overlay (Glassmorphism) */}
                  <div className="relative z-10 p-6 m-4 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-500">
                    <div className="flex items-center gap-4 mb-0 group-hover:mb-3 transition-all duration-500">
                      <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-400 transition-all duration-300">
                        <service.icon className="w-6 h-6 text-blue-400 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                        {service.title}
                      </h3>
                    </div>

                    <div className="max-h-[120px] sm:max-h-0 sm:group-hover:max-h-[120px] overflow-hidden transition-all duration-700 ease-in-out">
                      <p className="text-gray-300 text-sm leading-relaxed mb-4 sm:mb-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-500 delay-100">
                        {service.desc}
                      </p>
                    </div>

                    <div className="flex items-center text-sm font-semibold text-blue-400 group-hover:text-white transition-colors pt-2 border-t border-transparent group-hover:border-white/10">
                      Explore Service <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </RevealOnScroll>
      </section>

      {/* Featured Projects Carousel */}
      <section className="py-16 sm:py-24 overflow-hidden relative">
        <RevealOnScroll>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-20 bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-6">Featured Projects</h2>
          <div className="relative h-[400px] sm:h-[520px] flex items-center justify-center">
            <div className="relative w-full flex items-center justify-center">
              {projects.map((project, index) => {
                // compute positions based on the current (rounded) index
                const position = (index - currentProjectIndex + projects.length) % projects.length;
                const isCenter = position === 0;
                const isLeft1 = position === projects.length - 1;
                const isLeft2 = position === projects.length - 2;
                const isRight1 = position === 1;
                const isRight2 = position === 2;

                // Full-width translation values pushing side cards to screen edges
                const translateX_Left1 = '-120%';
                const translateX_Left2 = '-195%';
                const translateX_Right1 = '-0%';
                const translateX_Right2 = '75%';

                let transform = 'translateX(-50%) scale(0.6) translateZ(-160px)';
                let zIndex = 1;
                let opacity = 0.22;
                let blur = 'blur(1px)';

                if (isCenter) {
                  transform = 'translateX(-50%) scale(1) translateZ(0px)';
                  zIndex = 60;
                  opacity = 1;
                  blur = 'blur(0px)';
                } else if (isLeft1) {
                  transform = `translateX(${translateX_Left1}) scale(0.85) translateZ(-60px)`;
                  zIndex = 50;
                  opacity = 0.7;
                } else if (isLeft2) {
                  transform = `translateX(${translateX_Left2}) scale(0.7) translateZ(-120px)`;
                  zIndex = 40;
                  opacity = 0.45;
                } else if (isRight1) {
                  transform = `translateX(${translateX_Right1}) scale(0.85) translateZ(-60px)`;
                  zIndex = 50;
                  opacity = 0.7;
                } else if (isRight2) {
                  transform = `translateX(${translateX_Right2}) scale(0.7) translateZ(-120px)`;
                  zIndex = 40;
                  opacity = 0.45;
                }

                return (
                  <div
                    key={index}
                    className="absolute left-1/2 transition-all duration-500 ease-out"
                    style={{
                      transform,
                      zIndex,
                      opacity,
                      filter: blur
                    }}
                  >
                    <div className="w-[80vw] max-w-[320px] sm:max-w-none sm:w-[42vw] md:w-[38vw] lg:w-[32vw] h-[300px] sm:h-[520px] relative group">
                      {/* Liquid glass card */}
                      <div className="relative h-full rounded-2xl sm:rounded-3xl overflow-hidden backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 border border-white/10 shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>

                        {/* Project title */}
                        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20">
                          <h3 className="text-xl sm:text-3xl font-bold text-white">{project.name}</h3>
                        </div>

                        {/* Image area with padding and inner frame */}
                        <div className="absolute left-4 sm:left-6 right-4 sm:right-6 bottom-4 sm:bottom-6 top-16 sm:top-20 z-10 rounded-lg overflow-hidden bg-black">
                          <img src={project.images[0]} alt={project.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>
                      </div>

                      {/* soft outer stroke */}
                      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.6) inset' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-16 sm:py-24 overflow-hidden">
        <RevealOnScroll>
          <div className="mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-20 bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-6">Testimonials</h2>

            <div className="relative flex h-[500px] sm:h-[700px] w-full flex-row items-center justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
              <TestimonialsColumn testimonials={testimonials} duration={15} />
              <TestimonialsColumn testimonials={[...testimonials].reverse()} duration={19} className="hidden md:block" />
              <TestimonialsColumn testimonials={testimonials} duration={17} className="hidden lg:block" />
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* FAQs with Light Gradient */}
      <section className="relative px-6 sm:px-12 py-16 sm:py-24 border-t border-white/5 bg-gradient-to-b from-black via-blue-950/10 to-black">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-50"></div>
        <RevealOnScroll>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-6">Frequently Asked Questions (FAQs)</h2>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className={`bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-6 hover:border-blue-500/30 hover:bg-white/10 transition-all cursor-pointer h-full ${expandedFaq === index ? 'bg-white/10' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-base sm:text-lg font-medium">{faq.question}</span>
                  <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${expandedFaq === index ? 'rotate-90' : ''}`} />
                </div>
                {expandedFaq === index && (
                  <div className="mt-4 text-gray-400 text-sm leading-relaxed border-t border-white/10 pt-4 whitespace-pre-line">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </section>

      {/* Contact Form with Highlight */}
      <section id="contact-section" className="relative px-6 sm:px-12 py-16 sm:py-24 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        <RevealOnScroll>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-6 relative z-10">Ready to Start Your Project?</h2>
          <ContactForm />
        </RevealOnScroll>
      </section>


    </div >
  );
}