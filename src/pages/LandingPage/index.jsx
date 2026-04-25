import useDeviceType from '../../hooks/useDeviceType';
import LandingPageDesktop from './LandingPageDesktop';
import LandingPageMobile from './LandingPageMobile';
import LandingPageTablet from './LandingPageTablet';

export default function LandingPage() {
    const deviceType = useDeviceType();

    if (deviceType === 'mobile') return <LandingPageMobile />;
    if (deviceType === 'tablet') return <LandingPageTablet />;
    return <LandingPageDesktop />;
}
