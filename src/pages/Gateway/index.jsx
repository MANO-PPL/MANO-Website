import useDeviceType from '../../hooks/useDeviceType';
import GatewayDesktop from './GatewayDesktop';
import GatewayMobile from './GatewayMobile';
import GatewayTablet from './GatewayTablet';

export default function Gateway() {
    const deviceType = useDeviceType();

    if (deviceType === 'mobile') return <GatewayMobile />;
    if (deviceType === 'tablet') return <GatewayTablet />;
    return <GatewayDesktop />;
}
