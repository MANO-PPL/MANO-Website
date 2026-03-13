import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
    ChevronRight, Search, Calendar, Clock, User, Tag, ArrowRight,
    TrendingUp, BookOpen, Building, Shield, FileText, Calculator,
    Briefcase, Hammer, ChevronDown, X
} from "lucide-react";
import PageHero from "../../components/HeroSections/PageHero";
import RainbowButton from "../../components/RainbowButton";
import ContactModal from "../../components/ContactModal";
import { blogPosts, categories, CategoryBadge } from "./BlogPage";

// ─── Scroll Reveal ───────────────────────────────────────────────────────────
const RevealOnScroll = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
            { threshold: 0.08 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    return (
        <div ref={ref} className={`transition-all duration-900 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {children}
        </div>
    );
};

// ─── Tablet Blog Card ─────────────────────────────────────────────────────────
const TabletBlogCard = ({ post, wide = false }) => (
    <Link to={`${post.id}`} className={`group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:border-blue-500/30 hover:to-blue-600/10 transition-all duration-500 overflow-hidden animated-white-border shadow-md flex flex-col ${wide ? "md:flex-row" : ""}`}>
        <div className={`relative overflow-hidden ${wide ? "md:w-2/5 h-56 md:h-auto" : "h-48"}`}>
            <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute top-3 left-3"><CategoryBadge category={post.category} /></div>
        </div>
        <div className={`flex flex-col flex-1 p-5 ${wide ? "justify-center" : ""}`}>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                <span className="flex items-center gap-1"><Calendar size={11} />{post.date}</span>
                <span className="w-0.5 h-0.5 rounded-full bg-gray-700" />
                <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
            </div>
            <h2 className={`font-bold text-white mb-2 leading-snug group-hover:text-blue-300 transition-colors ${wide ? "text-xl" : "text-base"}`}>{post.title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">{post.summary}</p>
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-600/20 border border-blue-500/20 flex items-center justify-center">
                        <User size={12} className="text-blue-400" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-white">{post.author}</p>
                        <p className="text-[10px] text-gray-500">{post.authorRole}</p>
                    </div>
                </div>
                <div className="flex items-center text-blue-400 text-sm font-semibold group-hover:text-white transition-colors">
                    Read More <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </div>
    </Link>
);

// ─── Tablet Blog Page ─────────────────────────────────────────────────────────
export default function BlogPageTablet() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [visibleCount, setVisibleCount] = useState(8);

    const filteredPosts = blogPosts.filter(p => {
        const matchCat = activeCategory === "All" || p.category === activeCategory;
        const matchSearch = searchQuery === "" || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.summary.toLowerCase().includes(searchQuery.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchCat && matchSearch;
    });

    const featuredPosts = blogPosts.filter(p => p.featured);
    const showFeatured = activeCategory === "All" && searchQuery === "";

    return (
        <div className="min-h-screen bg-blue-pattern text-white overflow-x-hidden font-sans">

            {/* ── HERO ─────────────────────────────────────────────────────── */}
            <PageHero
                title="MANO Knowledge"
                subtitle="Hub"
                description="Expert insights on project management, construction trends, cost engineering, and quality assurance — from 12+ years at the forefront of India's building industry."
                badgeText="Insights & Articles"
                layout="mosaic-5"
                showCards={false}
                showContactButton={false}
                scrollTargetId="blog-tablet-content"
                headingClassName="text-5xl sm:text-6xl md:text-6xl lg:text-6xl"
                images={[
                    `${import.meta.env.BASE_URL}blog-hero-desk.png`,
                    `${import.meta.env.BASE_URL}blog-hero-site.png`,
                    `${import.meta.env.BASE_URL}blog-hero-docs.png`,
                    `${import.meta.env.BASE_URL}blog-hero-data.png`,
                    `${import.meta.env.BASE_URL}blog-hero-team.png`,
                ]}
            />

            {/* blog-tablet-content anchor for scroll */}
            <div id="blog-tablet-content" />

            {/* ── SEARCH ───────────────────────────────────────────────────── */}
            <section className="py-6 px-8">
                <div className="max-w-xl mx-auto relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input type="text" placeholder="Search articles, topics, tags..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-blue-500/50 hover:border-blue-500/30 transition-all" />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"><X size={14} /></button>
                    )}
                </div>
            </section>

            {/* ── FEATURED POSTS ───────────────────────────────────────────── */}
            {showFeatured && (
                <section className="px-8 pb-8">
                    <RevealOnScroll>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1.5 h-7 bg-blue-500 rounded-full" />
                            <h2 className="text-xl font-bold text-white">Featured Articles</h2>
                        </div>
                        <div className="space-y-5">
                            {featuredPosts.map(post => <TabletBlogCard key={post.id} post={post} wide />)}
                        </div>
                    </RevealOnScroll>
                </section>
            )}

            {/* ── CATEGORY FILTER (sticky) ──────────────────────────────────── */}
            <section className="py-4 px-8 sticky top-0 z-30 bg-black/75 backdrop-blur-lg border-y border-white/5">
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {categories.map(cat => (
                        <button key={cat.name} onClick={() => { setActiveCategory(cat.name); setVisibleCount(8); }}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 border ${activeCategory === cat.name ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_18px_rgba(37,99,235,0.4)]" : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"}`}>
                            <cat.icon size={13} />{cat.name}
                        </button>
                    ))}
                </div>
            </section>

            {/* ── ALL POSTS ────────────────────────────────────────────────── */}
            <section className="py-10 px-8">
                <RevealOnScroll>
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-7 bg-blue-500 rounded-full" />
                            <h2 className="text-xl font-bold text-white">
                                {activeCategory === "All" ? "All Articles" : activeCategory}
                                <span className="ml-2 text-sm font-normal text-gray-500">({filteredPosts.length})</span>
                            </h2>
                        </div>
                        {searchQuery && <p className="text-xs text-gray-400">Results for <span className="text-blue-400 font-medium">"{searchQuery}"</span></p>}
                    </div>
                </RevealOnScroll>

                {filteredPosts.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-5xl mb-3">🔍</div>
                        <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
                        <p className="text-gray-500 text-sm">Try a different search term or category</p>
                        <button onClick={() => { setSearchQuery(""); setActiveCategory("All"); }} className="mt-5 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold text-sm">Reset Filters</button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 gap-6">
                            {filteredPosts.slice(0, visibleCount).map((post, i) => (
                                <RevealOnScroll key={post.id}><TabletBlogCard post={post} /></RevealOnScroll>
                            ))}
                        </div>
                        {visibleCount < filteredPosts.length && (
                            <div className="flex justify-center mt-10">
                                <button onClick={() => setVisibleCount(v => v + 4)} className="flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 hover:bg-white/10 text-white font-semibold text-sm transition-all">
                                    Load More Articles <ChevronDown size={16} />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </section>

            {/* ── TOPICS ───────────────────────────────────────────────────── */}
            <section className="py-12 px-8 bg-white/[0.02] border-t border-white/5">
                <RevealOnScroll>
                    <h2 className="text-2xl font-bold text-white mb-8 text-center">Topics We Cover</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { icon: Briefcase, title: "Project Management", desc: "MIS, milestone tracking, stakeholder management.", count: "4 articles" },
                            { icon: Calculator, title: "Cost & Finance", desc: "Budgeting, value engineering, billing audits.", count: "2 articles" },
                            { icon: Shield, title: "Quality & Safety", desc: "QA/QC frameworks and EHS compliance.", count: "2 articles" },
                            { icon: Hammer, title: "EPC & Construction", desc: "Turnkey delivery and procurement strategies.", count: "2 articles" },
                            { icon: TrendingUp, title: "Industry Trends", desc: "Green building and market outlook.", count: "1 article" },
                            { icon: Building, title: "Real Estate", desc: "Mumbai market and developer insights.", count: "1 article" },
                        ].map((topic, i) => (
                            <button key={i} onClick={() => { setActiveCategory(topic.title); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                                className="group p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-blue-500/30 hover:bg-blue-600/10 transition-all text-left animated-white-border">
                                <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mb-3 group-hover:bg-blue-600/20 transition-all">
                                    <topic.icon className="w-5 h-5 text-blue-400" />
                                </div>
                                <h3 className="text-sm font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">{topic.title}</h3>
                                <p className="text-xs text-gray-500 mb-2 leading-relaxed">{topic.desc}</p>
                                <span className="text-xs text-blue-400 font-medium">{topic.count}</span>
                            </button>
                        ))}
                    </div>
                </RevealOnScroll>
            </section>

            {/* ── POPULAR TAGS ─────────────────────────────────────────────── */}
            <section className="py-8 px-8 border-t border-white/5">
                <RevealOnScroll>
                    <div className="flex items-center gap-2 mb-5"><Tag size={16} className="text-blue-400" /><h3 className="text-base font-bold text-white">Popular Tags</h3></div>
                    <div className="flex flex-wrap gap-2">
                        {["PMC", "EPC", "Quality", "Cost Control", "Mumbai", "Real Estate", "Sustainability", "QA/QC", "EHS", "Case Study", "Scheduling", "CPM", "Billing", "Contracts", "PERT", "India Infrastructure", "Budgeting", "Planning"].map(tag => (
                            <button key={tag} onClick={() => setSearchQuery(tag)} className="px-3 py-1.5 rounded-full text-xs bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-blue-500/30 hover:bg-blue-600/10 transition-all">#{tag}</button>
                        ))}
                    </div>
                </RevealOnScroll>
            </section>

            {/* ── CTA ──────────────────────────────────────────────────────── */}
            <section className="py-12 px-8 bg-white/[0.02] border-t border-white/5">
                <RevealOnScroll>
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent hover:border-blue-500/30 transition-all duration-500">
                            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center mx-auto mb-5">
                                <BookOpen className="w-7 h-7 text-blue-400" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2 leading-tight mb-3">Have a Project in Mind?</h2>
                            <p className="text-gray-400 text-sm max-w-md mx-auto mb-7">Our experts are ready to help you plan, execute, and deliver with precision.</p>
                            <div className="flex flex-row justify-center gap-4">
                                <div onClick={() => setIsContactOpen(true)}>
                                    <RainbowButton>
                                        <span className="flex items-center text-base font-semibold px-4">Start Your Project <ChevronRight className="ml-2 w-4 h-4" /></span>
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
