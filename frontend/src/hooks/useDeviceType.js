import { useEffect, useState } from 'react';

const MOBILE_QUERY = '(max-width: 767px)';
const TABLET_QUERY = '(min-width: 768px) and (max-width: 1024px) and (orientation: portrait)';

function getDeviceType() {
    if (typeof window === 'undefined' || !window.matchMedia) return 'desktop';
    if (window.matchMedia(MOBILE_QUERY).matches) return 'mobile';
    if (window.matchMedia(TABLET_QUERY).matches) return 'tablet';
    return 'desktop';
}

export default function useDeviceType() {
    const [deviceType, setDeviceType] = useState(getDeviceType);

    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia) return;

        const mobileQuery = window.matchMedia(MOBILE_QUERY);
        const tabletQuery = window.matchMedia(TABLET_QUERY);

        const handleChange = () => setDeviceType(getDeviceType());

        mobileQuery.addEventListener('change', handleChange);
        tabletQuery.addEventListener('change', handleChange);
        setDeviceType(getDeviceType());

        return () => {
            mobileQuery.removeEventListener('change', handleChange);
            tabletQuery.removeEventListener('change', handleChange);
        };
    }, []);

    return deviceType;
}
