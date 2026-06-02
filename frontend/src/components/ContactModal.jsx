import { useState, useEffect } from 'react';
import ContactModalDesktop from './ContactModalDesktop';
import ContactModalMobile from './ContactModalMobile';

const ContactModal = (props) => {
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
        return <ContactModalMobile {...props} />;
    }

    return <ContactModalDesktop {...props} />;
};

export default ContactModal;
