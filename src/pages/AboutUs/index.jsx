import useDeviceType from '../../hooks/useDeviceType';
import AboutUsDesktop from './AboutUsDesktop';
import AboutUsMobile from './AboutUsMobile';
import AboutUsTablet from './AboutUsTablet';

export default function AboutUs() {
    const deviceType = useDeviceType();

    if (deviceType === 'mobile') return <AboutUsMobile />;
    if (deviceType === 'tablet') return <AboutUsTablet />;
    return <AboutUsDesktop />;
}
