import useDeviceType from '../../hooks/useDeviceType';
import EHSAuditingDesktop from './EHSAuditingDesktop';
import EHSAuditingMobile from './EHSAuditingMobile';
import EHSAuditingTablet from './EHSAuditingTablet';

export default function EHSAuditing() {
    const deviceType = useDeviceType();

    if (deviceType === 'mobile') return <EHSAuditingMobile />;
    if (deviceType === 'tablet') return <EHSAuditingTablet />;
    return <EHSAuditingDesktop />;
}
