import useDeviceType from '../../hooks/useDeviceType';
import CareersDesktop from './CareersDesktop';
import CareersMobile from './CareersMobile';
import CareersTablet from './CareersTablet';

export default function Careers() {
    const deviceType = useDeviceType();

    if (deviceType === 'mobile') return <CareersMobile />;
    if (deviceType === 'tablet') return <CareersTablet />;
    return <CareersDesktop />;
}
