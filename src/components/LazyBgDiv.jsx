import { useState, useEffect, useRef } from "react";

/**
 * Drop-in replacement for <div style={{backgroundImage: `url(...)`}} ...>
 * that defers loading the background image until the element enters the viewport.
 *
 * Props:
 *  - src: image URL (required)
 *  - className: Tailwind/CSS classes (should include bg-cover, bg-center, etc.)
 *  - style: additional inline styles (backgroundImage is managed internally)
 *  - rootMargin: IntersectionObserver rootMargin (default "200px" — preloads 200px before visible)
 *  - eager: if true, skips lazy behavior and loads immediately (for above-fold content)
 *  - children, ...rest: forwarded to the underlying <div>
 */
export default function LazyBgDiv({
  src,
  className = "",
  style = {},
  rootMargin = "200px",
  eager = false,
  children,
  ...rest
}) {
  const [loaded, setLoaded] = useState(eager);
  const ref = useRef(null);

  useEffect(() => {
    if (eager || !src) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [src, eager, rootMargin]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        backgroundImage: loaded && src ? `url(${src})` : undefined,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
