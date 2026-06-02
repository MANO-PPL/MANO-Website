import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight, Search, Calendar, Clock, User, Tag, ArrowRight,
  TrendingUp, BookOpen, Building, Shield, FileText, Calculator,
  Briefcase, Hammer, ChevronDown, X, Star
} from "lucide-react";
import PageHero from "../../components/HeroSections/PageHero";
import RainbowButton from "../../components/RainbowButton";
import ContactModal from "../../components/ContactModal";

// ─── Scroll Reveal ───────────────────────────────────────────────────────────
const RevealOnScroll = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
      {children}
    </div>
  );
};

// ─── Shared Data ─────────────────────────────────────────────────────────────
export const categories = [
  { name: "All", icon: BookOpen },
  { name: "Project Management", icon: Briefcase },
  { name: "Cost & Finance", icon: Calculator },
  { name: "Quality & Safety", icon: Shield },
  { name: "EPC & Construction", icon: Hammer },
  { name: "Industry Trends", icon: TrendingUp },
  { name: "Real Estate", icon: Building },
];

export const blogPosts = [
  { id: 1, title: "The Future of Construction Project Management in India: 2026 and Beyond", summary: "India's construction sector is undergoing a digital revolution. From AI-powered scheduling to IoT-enabled site monitoring, discover the technologies shaping the future of project management consultancy.", author: "Mugilan Muthaiah", authorRole: "Founder & MD, MANO Projects", date: "March 10, 2026", readTime: "8 min read", category: "Project Management", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop", featured: true, tags: ["PMC", "Digital Transformation", "India Infrastructure"] },
  { id: 2, title: "How to Control Cost Overruns on Large-Scale Residential Projects", summary: "Cost overruns are the single biggest threat to project profitability. Our experts share a proven five-step framework for keeping residential tower budgets on track from day one.", author: "Amirthavalli Mugilan", authorRole: "Director, MANO Projects", date: "March 5, 2026", readTime: "6 min read", category: "Cost & Finance", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop", featured: true, tags: ["Cost Control", "Budgeting", "Residential"] },
  { id: 3, title: "QA/QC Frameworks That Actually Work: Lessons from 50+ Projects", summary: "Generic quality checklists rarely survive first contact with the site. We break down the adaptive QA/QC matrix MANO uses across residential, commercial, and industrial projects.", author: "Rahul Mehta", authorRole: "QA/QC Head", date: "February 28, 2026", readTime: "7 min read", category: "Quality & Safety", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop", featured: false, tags: ["QA/QC", "Quality", "Construction Standards"] },
  { id: 4, title: "EPC vs PMC: Which Model Is Right for Your Infrastructure Project?", summary: "Choosing between EPC and PMC delivery isn't just a cost decision — it's about risk allocation, control, and capability. Here's a comprehensive comparison to help developers decide.", author: "Priya Sharma", authorRole: "Senior Project Consultant", date: "February 20, 2026", readTime: "9 min read", category: "EPC & Construction", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop", featured: false, tags: ["EPC", "PMC", "Delivery Models"] },
  { id: 5, title: "Green Building in India: What Real Estate Developers Need to Know", summary: "LEED, GRIHA, and IGBC certifications are no longer optional for premium projects. Understand the regulatory shifts and financial incentives driving sustainable construction across India.", author: "Aditi Rao", authorRole: "Sustainability Consultant", date: "February 14, 2026", readTime: "5 min read", category: "Industry Trends", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop", featured: false, tags: ["Green Building", "Sustainability", "LEED"] },
  { id: 6, title: "Contract Management Best Practices: Avoiding the 5 Most Common Disputes", summary: "Contractor disputes can kill project timelines and margins. Our legal and project teams identify the five clauses every builder ignores — and the exact language to fix them.", author: "Kiran Desai", authorRole: "Contract Manager", date: "February 7, 2026", readTime: "6 min read", category: "Project Management", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop", featured: false, tags: ["Contracts", "Dispute Resolution", "Legal"] },
  { id: 7, title: "Mumbai's Real Estate Boom: What It Means for Project Consultants", summary: "Mumbai is witnessing an unprecedented real estate surge in the MMR belt — Borivali, Thane, and Navi Mumbai are at the centre. Here's how PMCs are adapting to handle the volume.", author: "Suresh Nair", authorRole: "Regional Head - Mumbai", date: "January 31, 2026", readTime: "7 min read", category: "Real Estate", image: "https://images.unsplash.com/photo-1529467307119-693a53006ab5?q=80&w=800&auto=format&fit=crop", featured: false, tags: ["Mumbai", "Real Estate", "MMR"] },
  { id: 8, title: "EHS Audit Checklist: 30 Points Every Construction Site Must Pass", summary: "Environment, Health, and Safety compliance is non-negotiable. Our EHS team distilled a practical 30-point audit checklist from over 200 site inspections across residential and commercial projects.", author: "Vijay Kumar", authorRole: "EHS Lead", date: "January 25, 2026", readTime: "10 min read", category: "Quality & Safety", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop", featured: false, tags: ["EHS", "Safety", "Audit", "Checklist"] },
  { id: 9, title: "How We Delivered a 3,10,230 Sq.ft. Residential Tower in Borivali — On Time", summary: "A deep-dive case study into the Ananda Residency project: the planning challenges, the execution insights, and the change management decisions that made the difference.", author: "Mugilan Muthaiah", authorRole: "Founder & MD, MANO Projects", date: "January 18, 2026", readTime: "12 min read", category: "Project Management", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop", featured: false, tags: ["Case Study", "Residential", "Borivali"] },
  { id: 10, title: "Quantity Survey in 2026: Why Billing Audits Save More Than They Cost", summary: "Over-billing by contractors remains rampant. We analysed 1,000+ invoices across 15 projects and found the most common billing irregularities — and how proper QS catches them every time.", author: "Tanvi Shah", authorRole: "Quantity Surveyor", date: "January 12, 2026", readTime: "8 min read", category: "Cost & Finance", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop", featured: false, tags: ["Quantity Survey", "Billing", "Audit"] },
  { id: 11, title: "CPM & PERT Scheduling: A Practical Guide for Project Planners", summary: "Critical Path Method and PERT aren't just examination concepts — they're the backbone of every successful project plan. This guide shows how MANO applies them on real high-rise projects.", author: "Anand Krishnan", authorRole: "Planning Manager", date: "January 6, 2026", readTime: "9 min read", category: "Project Management", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop", featured: false, tags: ["CPM", "PERT", "Planning", "Scheduling"] },
  { id: 12, title: "International Construction Projects: Key Lessons from Our Congo Experience", summary: "Managing the Hotel Moon Palace in Kinshasa taught our team invaluable lessons about cross-cultural coordination, international procurement, and remote site management.", author: "Mugilan Muthaiah", authorRole: "Founder & MD, MANO Projects", date: "December 28, 2025", readTime: "11 min read", category: "EPC & Construction", image: "https://images.unsplash.com/photo-1520869562399-e772f042f422?q=80&w=800&auto=format&fit=crop", featured: false, tags: ["International", "Case Study", "Africa"] },
];

const categoryColorMap = {
  "Project Management": "from-blue-600/20 to-blue-600/5 border-blue-500/30 text-blue-400",
  "Cost & Finance": "from-emerald-600/20 to-emerald-600/5 border-emerald-500/30 text-emerald-400",
  "Quality & Safety": "from-amber-600/20 to-amber-600/5 border-amber-500/30 text-amber-400",
  "EPC & Construction": "from-orange-600/20 to-orange-600/5 border-orange-500/30 text-orange-400",
  "Industry Trends": "from-purple-600/20 to-purple-600/5 border-purple-500/30 text-purple-400",
  "Real Estate": "from-rose-600/20 to-rose-600/5 border-rose-500/30 text-rose-400",
};

export const CategoryBadge = ({ category }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r border ${categoryColorMap[category] || "from-blue-600/20 to-blue-600/5 border-blue-500/30 text-blue-400"}`}>
    {category}
  </span>
);

// ─── Blog Card (Desktop) ──────────────────────────────────────────────────────
export const BlogCard = ({ post, large = false }) => (
  <Link to={`${post.id}`} className={`group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:border-blue-500/30 hover:to-blue-600/10 transition-all duration-500 overflow-hidden flex flex-col animated-white-border shadow-lg ${large ? "md:flex-row" : ""}`}>
    <div className={`relative overflow-hidden ${large ? "md:w-1/2 h-64 md:h-auto" : "h-52"}`}>
      <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute top-4 left-4"><CategoryBadge category={post.category} /></div>
    </div>
    <div className={`flex flex-col flex-1 p-6 ${large ? "justify-center" : ""}`}>
      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
        <span className="flex items-center gap-1"><Calendar size={12} />{post.date}</span>
        <span className="w-1 h-1 rounded-full bg-gray-700" />
        <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
      </div>
      <h2 className={`font-bold text-white mb-3 leading-tight group-hover:text-blue-300 transition-colors ${large ? "text-2xl md:text-3xl" : "text-lg"}`}>{post.title}</h2>
      <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3 flex-1">{post.summary}</p>
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/20 flex items-center justify-center">
            <User size={14} className="text-blue-400" />
          </div>
          <div>
            <p className="text-xs font-semibold text-white">{post.author}</p>
            <p className="text-xs text-gray-500">{post.authorRole}</p>
          </div>
        </div>
        <div className="flex items-center text-blue-400 text-sm font-semibold group-hover:text-white transition-colors">
          Read More <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  </Link>
);

// ─── Desktop Blog Page ────────────────────────────────────────────────────────
export default function BlogPageDesktop() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);

  const filteredPosts = blogPosts.filter(p => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = searchQuery === "" || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.summary.toLowerCase().includes(searchQuery.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const featuredPosts = blogPosts.filter(p => p.featured);
  const showFeatured = activeCategory === "All" && searchQuery === "";

  return (
    <div className="min-h-screen bg-blue-pattern text-white overflow-x-hidden font-sans selection:bg-blue-500/30">

      {/* ── HERO using PageHero ─────────────────────────────────────── */}
      <PageHero
        title="MANO Knowledge"
        subtitle="Hub"
        description="Expert perspectives on project management, construction trends, cost engineering, and quality assurance — from 12+ years at the forefront of India's building boom."
        badgeText="Insights & Articles"
        layout="bento-5"
        showCards={false}
        showContactButton={false}
        scrollTargetId="blog-content"
        headingClassName="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-7xl"
        images={[
          `${import.meta.env.BASE_URL}blog-hero-desk.png`,
          `${import.meta.env.BASE_URL}blog-hero-site.png`,
          `${import.meta.env.BASE_URL}blog-hero-docs.png`,
          `${import.meta.env.BASE_URL}blog-hero-data.png`,
          `${import.meta.env.BASE_URL}blog-hero-team.png`,
        ]}
        stats={{ mainValue: "12+", mainLabel: "Articles", satisfaction: "100%", grid: [{ value: "6", label: "Topics" }, { value: "50+", label: "Projects" }, { value: "5", label: "Authors" }] }}
      />

      {/* blog-content anchor for scroll */}
      <div id="blog-content" />

      {/* ── SEARCH BAR ───────────────────────────────────────────────── */}
      <section className="py-8 px-6 md:px-12">
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input type="text" placeholder="Search articles, topics, tags..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-blue-500/50 hover:border-blue-500/30 transition-all" />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"><X size={16} /></button>
          )}
        </div>
      </section>

      {/* ── FEATURED POSTS ───────────────────────────────────────────── */}
      {showFeatured && (
        <section className="py-8 md:py-12 px-6 md:px-12">
          <RevealOnScroll>
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-8 bg-blue-500 rounded-full" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">Featured Articles</h2>
              </div>
              <div className="grid grid-cols-1 gap-8">
                {featuredPosts.map(post => <BlogCard key={post.id} post={post} large />)}
              </div>
            </div>
          </RevealOnScroll>
        </section>
      )}

      {/* ── CATEGORY FILTER (sticky) ──────────────────────────────────── */}
      <section className="py-5 px-6 md:px-12 sticky top-0 z-30 bg-black/70 backdrop-blur-lg border-y border-white/5">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map(cat => (
            <button key={cat.name} onClick={() => { setActiveCategory(cat.name); setVisibleCount(9); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 border ${activeCategory === cat.name ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]" : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"}`}>
              <cat.icon size={14} />{cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* ── ALL POSTS ────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-blue-500 rounded-full" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {activeCategory === "All" ? "All Articles" : activeCategory}
                  <span className="ml-3 text-base font-normal text-gray-500">({filteredPosts.length})</span>
                </h2>
              </div>
              {searchQuery && <p className="text-sm text-gray-400">Results for <span className="text-blue-400 font-medium">"{searchQuery}"</span></p>}
            </div>
          </RevealOnScroll>

          {filteredPosts.length === 0 ? (
            <RevealOnScroll>
              <div className="text-center py-24">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
                <p className="text-gray-500">Try a different search term or category</p>
                <button onClick={() => { setSearchQuery(""); setActiveCategory("All"); }} className="mt-6 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors">Reset Filters</button>
              </div>
            </RevealOnScroll>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.slice(0, visibleCount).map((post, i) => (
                  <RevealOnScroll key={post.id} delay={Math.min(i % 3, 2) * 100}>
                    <BlogCard post={post} />
                  </RevealOnScroll>
                ))}
              </div>
              {visibleCount < filteredPosts.length && (
                <RevealOnScroll>
                  <div className="flex justify-center mt-12">
                    <button onClick={() => setVisibleCount(v => v + 6)} className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 text-white font-semibold transition-all">
                      Load More Articles <ChevronDown size={18} />
                    </button>
                  </div>
                </RevealOnScroll>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── TOPICS GRID ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-white/[0.02] border-t border-white/5">
        <RevealOnScroll>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2 leading-tight mb-4">Topics We Cover</h2>
              <p className="text-gray-400 max-w-xl mx-auto">Deep expertise across every dimension of project management and construction consulting.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { icon: Briefcase, title: "Project Management", desc: "Monitoring, MIS reporting, stakeholder management, and milestone tracking.", count: "4 articles" },
                { icon: Calculator, title: "Cost & Finance", desc: "Value engineering, cash flow forecasting, billing audit, and quantity survey.", count: "2 articles" },
                { icon: Shield, title: "Quality & Safety", desc: "QA/QC frameworks, EHS compliance, and non-conformity management.", count: "2 articles" },
                { icon: Hammer, title: "EPC & Construction", desc: "Turnkey delivery, procurement strategies, and execution leadership.", count: "2 articles" },
                { icon: TrendingUp, title: "Industry Trends", desc: "Green building, PropTech, policy changes, and market outlook.", count: "1 article" },
                { icon: Building, title: "Real Estate", desc: "Mumbai market analysis, developer insights, and sector deep-dives.", count: "1 article" },
              ].map((topic, i) => (
                <button key={i} onClick={() => { setActiveCategory(topic.title); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="group p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:border-blue-500/30 hover:to-blue-600/10 transition-all duration-500 text-left animated-white-border">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-all">
                    <topic.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{topic.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">{topic.desc}</p>
                  <span className="text-xs text-blue-400 font-medium">{topic.count}</span>
                </button>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* ── TAGS ─────────────────────────────────────────────────────── */}
      <section className="py-12 px-6 md:px-12 border-t border-white/5">
        <RevealOnScroll>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-6"><Tag size={18} className="text-blue-400" /><h3 className="text-lg font-bold text-white">Popular Tags</h3></div>
            <div className="flex flex-wrap gap-3">
              {["PMC", "EPC", "Quality", "Cost Control", "Mumbai", "Real Estate", "Sustainability", "QA/QC", "EHS", "Case Study", "Scheduling", "CPM", "Billing", "Contracts", "PERT", "India Infrastructure", "Budgeting", "Planning"].map(tag => (
                <button key={tag} onClick={() => setSearchQuery(tag)} className="px-4 py-2 rounded-full text-sm bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-blue-500/30 hover:bg-blue-600/10 transition-all">#{tag}</button>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-white/[0.02] border-t border-white/5">
        <RevealOnScroll>
          <div className="max-w-4xl mx-auto text-center">
            <div className="p-10 md:p-14 rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent hover:border-blue-500/30 transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2 leading-tight mb-4">Have a Project in Mind?</h2>
              <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">Our team of project management experts is ready to help you plan, execute, and deliver with precision. Let's talk.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <div onClick={() => setIsContactOpen(true)}>
                  <RainbowButton>
                    <span className="flex items-center text-lg font-semibold px-4">Start Your Project <ChevronRight className="ml-2 w-5 h-5" /></span>
                  </RainbowButton>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} initialService="General Inquiry" />
    </div>
  );
}
