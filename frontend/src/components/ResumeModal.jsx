import { useState, useEffect } from 'react';
import ResumeModalDesktop from './ResumeModalDesktop';
import ResumeModalMobile from './ResumeModalMobile';

const ResumeModal = (props) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const mediaQuery = window.matchMedia('(max-width: 639px)');
        
        const handleMediaQueryChange = (e) => {
            setIsMobile(e.matches);
        };
        
        // Set initial value
        setIsMobile(mediaQuery.matches);
        
        mediaQuery.addEventListener('change', handleMediaQueryChange);
        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        };
    }, []);

    if (isMobile) {
        return <ResumeModalMobile {...props} />;
    }

    return <ResumeModalDesktop {...props} />;
};

export default ResumeModal;
