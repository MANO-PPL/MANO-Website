import useDeviceType from '../../hooks/useDeviceType';
import EPCDesktop from './EPCDesktop';
import EPCMobile from './EPCMobile';
import EPCTablet from './EPCTablet';

export default function EPC() {
    const deviceType = useDeviceType();

    if (deviceType === 'mobile') return <EPCMobile />;
    if (deviceType === 'tablet') return <EPCTablet />;
    return <EPCDesktop />;
}
