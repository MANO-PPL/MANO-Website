import { useState, useRef, useEffect } from "react";

/**
 * Enhanced <img> wrapper with:
 *  - Native lazy loading (loading="lazy")
 *  - Async decoding (decoding="async") to avoid blocking the main thread
 *  - Smooth fade-in on load for perceived performance
 *  - Optional fetchPriority="high" for critical above-fold images
 *
 * Props:
 *  - src, alt, className: standard img attributes
 *  - priority: if true, sets fetchpriority="high" and disables lazy loading
 *  - fadeIn: enable opacity transition on load (default true)
 *  - ...rest: forwarded to <img>
 */
export default function OptimizedImage({
  src,
  alt = "",
  className = "",
  priority = false,
  fadeIn = true,
  style = {},
  ...rest
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      onLoad={() => setIsLoaded(true)}
      className={className}
      style={{
        ...style,
        ...(fadeIn
          ? {
              opacity: isLoaded ? 1 : 0,
              transition: "opacity 0.4s ease-in-out",
            }
          : {}),
      }}
      {...rest}
    />
  );
}
