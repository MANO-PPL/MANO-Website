import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop — resets scroll position to (0,0) on every route change.
 * Fixes the "footer appears at top" bug caused by retained scroll state
 * when navigating between pages in a React SPA.
 */
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
