import useDeviceType from '../../hooks/useDeviceType';
import ServicesPageDesktop from './ServicesPageDesktop';
import ServicesPageMobile from './ServicesPageMobile';
import ServicesPageTablet from './ServicesPageTablet';

export default function ServicesPage() {
    const deviceType = useDeviceType();

    if (deviceType === 'mobile') return <ServicesPageMobile />;
    if (deviceType === 'tablet') return <ServicesPageTablet />;
    return <ServicesPageDesktop />;
}
