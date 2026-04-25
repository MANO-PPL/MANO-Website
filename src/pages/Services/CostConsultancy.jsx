import useDeviceType from '../../hooks/useDeviceType';
import CostConsultancyDesktop from './CostConsultancyDesktop';
import CostConsultancyMobile from './CostConsultancyMobile';
import CostConsultancyTablet from './CostConsultancyTablet';

export default function CostConsultancy() {
    const deviceType = useDeviceType();

    if (deviceType === 'mobile') return <CostConsultancyMobile />;
    if (deviceType === 'tablet') return <CostConsultancyTablet />;
    return <CostConsultancyDesktop />;
}
