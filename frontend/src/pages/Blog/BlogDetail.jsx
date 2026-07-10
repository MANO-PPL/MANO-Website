import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft, Calendar, Clock, User, Tag, ChevronRight,
  Briefcase, Calculator, Shield, Hammer, TrendingUp, Building,
  BookOpen, Share2, Copy, Check, ArrowRight
} from "lucide-react";
import { CategoryBadge } from "./BlogPage";
import ContactModal from "../../components/ContactModal";
import RainbowButton from "../../components/RainbowButton";
import useDeviceType from "../../hooks/useDeviceType";
import { BLOGS_API_URL } from "../../config";

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
const RevealOnScroll = ({ children, delay = 0 }) => {
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
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      {children}
    </div>
  );
};

// ─── Blog Detail Page ─────────────────────────────────────────────────────────
export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const deviceType = useDeviceType();
  
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`${BLOGS_API_URL}/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          setPost(data.data);
        } else {
          setPost(null);
        }
      })
      .catch(err => {
        console.error("Error fetching blog details:", err);
        setPost(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!post) return;
    fetch(BLOGS_API_URL)
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          const list = data.data || [];
          const related = list
            .filter(p => p.category === post.category && p.id !== post.id)
            .slice(0, 3);
          setRelatedPosts(related);
        }
      })
      .catch(err => console.error("Error fetching related blogs:", err));
  }, [post]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-pattern text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-xs">Loading article details...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-blue-pattern text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <button onClick={() => navigate(-1)} className="px-6 py-3 bg-blue-600 rounded-full font-semibold hover:bg-blue-500 transition-colors">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const content = post.content;
  const isMobileOrTablet = deviceType === "mobile" || deviceType === "tablet";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-blue-pattern text-white overflow-x-hidden font-sans selection:bg-blue-500/30">

      {/* ── HERO IMAGE ─────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden" style={{ height: isMobileOrTablet ? "55vw" : "50vh", maxHeight: "520px", minHeight: "220px" }}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black" />
      </div>

      {/* ── MAIN CONTENT ──────────────────────────────────────────── */}
      <div className={`mx-auto ${isMobileOrTablet ? "px-4 py-8" : "max-w-4xl px-8 py-12"}`}>

        {/* Category & Meta */}
        <RevealOnScroll>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm font-medium mr-2"
            >
              <ArrowLeft size={16} /> Back to Blog
            </button>
            <CategoryBadge category={post.category} />
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><Calendar size={13} />{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-gray-700" />
              <span className="flex items-center gap-1.5"><Clock size={13} />{post.read_time || post.readTime}</span>
            </div>
          </div>
        </RevealOnScroll>

        {/* Title */}
        <RevealOnScroll delay={80}>
          <h1 className={`font-bold text-white leading-tight mb-6 ${isMobileOrTablet ? "text-2xl" : "text-3xl md:text-4xl lg:text-5xl"}`}>
            {post.title}
          </h1>
        </RevealOnScroll>

        {/* Summary */}
        <RevealOnScroll delay={120}>
          <p className={`text-gray-300 leading-relaxed mb-8 border-l-4 border-blue-500 pl-5 ${isMobileOrTablet ? "text-sm" : "text-lg"}`}>
            {post.summary}
          </p>
        </RevealOnScroll>

        {/* Author & Share strip */}
        <RevealOnScroll delay={150}>
          <div className="flex items-center justify-between py-4 border-y border-white/10 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                <User size={18} className="text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{post.author}</p>
                <p className="text-xs text-gray-500">{post.author_role || post.authorRole}</p>
              </div>
            </div>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-blue-500/30 transition-all text-sm"
            >
              {copied ? <><Check size={14} className="text-green-400" /> Copied!</> : <><Share2 size={14} /> Share</>}
            </button>
          </div>
        </RevealOnScroll>

        {/* Article Sections */}
        {content?.sections?.map((section, i) => (
          <RevealOnScroll key={i} delay={i * 60}>
            <div className="mb-10">
              <h2 className={`font-bold text-white mb-4 ${isMobileOrTablet ? "text-lg" : "text-2xl"}`}>
                {section.heading}
              </h2>
              <div className={`text-gray-300 leading-relaxed whitespace-pre-line ${isMobileOrTablet ? "text-sm" : "text-base"}`}>
                {section.body.split("\n").map((para, j) => {
                  if (para.trim() === "") return null;
                  // Bold text support **text**
                  const parts = para.split(/(\*\*[^*]+\*\*)/g);
                  return (
                    <p key={j} className="mb-4">
                      {parts.map((part, k) =>
                        part.startsWith("**") && part.endsWith("**")
                          ? <strong key={k} className="text-white font-semibold">{part.slice(2, -2)}</strong>
                          : part
                      )}
                    </p>
                  );
                })}
              </div>
            </div>
          </RevealOnScroll>
        ))}

        {/* Key Takeaways */}
        {content?.keyTakeaways?.length > 0 && (
          <RevealOnScroll>
            <div className="mt-10 mb-12 p-6 rounded-2xl bg-blue-600/10 border border-blue-500/20">
              <h3 className={`font-bold text-white mb-4 flex items-center gap-2 ${isMobileOrTablet ? "text-base" : "text-lg"}`}>
                <BookOpen size={18} className="text-blue-400" /> Key Takeaways
              </h3>
              <ul className="space-y-3">
                {content.keyTakeaways.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-600/30 border border-blue-500/30 flex-shrink-0 flex items-center justify-center text-blue-400 text-xs font-bold">{i + 1}</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>
        )}

        {/* Tags */}
        {post.tags?.length > 0 && (
          <RevealOnScroll>
            <div className="flex flex-wrap gap-2 mb-12">
              <Tag size={14} className="text-gray-500 mt-1" />
              {post.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-gray-400">
                  #{tag}
                </span>
              ))}
            </div>
          </RevealOnScroll>
        )}

      </div>

      {/* ── RELATED ARTICLES ──────────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section className={`border-t border-white/5 bg-white/[0.02] ${isMobileOrTablet ? "px-4 py-10" : "px-8 md:px-16 py-16"}`}>
          <RevealOnScroll>
            <div className={`mx-auto ${isMobileOrTablet ? "" : "max-w-6xl"}`}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-7 bg-blue-500 rounded-full" />
                <h2 className={`font-bold text-white ${isMobileOrTablet ? "text-lg" : "text-2xl"}`}>Related Articles</h2>
              </div>
              <div className={`grid gap-5 ${isMobileOrTablet ? "grid-cols-1" : "grid-cols-1 md:grid-cols-3"}`}>
                {relatedPosts.map(related => (
                  <Link
                    key={related.id}
                    to={`./../${related.id}`}
                    className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:border-blue-500/30 hover:to-blue-600/10 transition-all duration-500 overflow-hidden flex flex-col animated-white-border"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img src={related.image} alt={related.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-3 left-3"><CategoryBadge category={related.category} /></div>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <span className="flex items-center gap-1"><Clock size={11} />{related.read_time || related.readTime}</span>
                      </div>
                      <h3 className="text-sm font-bold text-white leading-snug mb-2 group-hover:text-blue-300 transition-colors line-clamp-2">{related.title}</h3>
                      <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
                        <p className="text-xs text-gray-500">{related.author}</p>
                        <span className="text-blue-400 text-xs font-semibold flex items-center gap-1">Read <ChevronRight size={12} /></span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </section>
      )}

      {/* ── CTA  ──────────────────────────────────────────────────── */}
      <section className={`border-t border-white/5 ${isMobileOrTablet ? "px-4 py-10" : "px-8 md:px-16 py-16"}`}>
        <RevealOnScroll>
          <div className={`mx-auto text-center ${isMobileOrTablet ? "" : "max-w-3xl"}`}>
            <div className={`${isMobileOrTablet ? "p-6" : "p-10 md:p-14"} rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent hover:border-blue-500/30 transition-all duration-500`}>
              <div className={`${isMobileOrTablet ? "w-12 h-12" : "w-16 h-16"} rounded-2xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center mx-auto mb-5`}>
                <BookOpen className={`${isMobileOrTablet ? "w-6 h-6" : "w-8 h-8"} text-blue-400`} />
              </div>
              <h2 className={`font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2 leading-tight mb-4 ${isMobileOrTablet ? "text-2xl" : "text-3xl md:text-4xl"}`}>
                Have a Project in Mind?
              </h2>
              <p className={`text-gray-400 max-w-xl mx-auto mb-7 ${isMobileOrTablet ? "text-sm" : "text-base"}`}>
                Our team of project management experts is ready to help you plan, execute, and deliver with precision.
              </p>
              <div onClick={() => setIsContactOpen(true)}>
                <RainbowButton>
                  <span className={`flex items-center font-semibold px-4 ${isMobileOrTablet ? "text-base" : "text-lg"}`}>
                    Start Your Project <ChevronRight className="ml-2 w-5 h-5" />
                  </span>
                </RainbowButton>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} initialService="General Inquiry" />
    </div>
  );
}
