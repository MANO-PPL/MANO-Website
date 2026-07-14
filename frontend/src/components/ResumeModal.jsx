import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ResumeModalDesktop from './ResumeModalDesktop';
import ResumeModalMobile from './ResumeModalMobile';

const ResumeModal = (props) => {
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
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

    if (!mounted) return null;

    const modalContent = isMobile ? (
        <ResumeModalMobile {...props} />
    ) : (
        <ResumeModalDesktop {...props} />
    );

    const target = document.getElementById('modal-portal-target') || document.body;
    return createPortal(modalContent, target);
};

export default ResumeModal;
