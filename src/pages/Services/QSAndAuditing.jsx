import useDeviceType from '../../hooks/useDeviceType';
import QSAndAuditingDesktop from './QSAndAuditingDesktop';
import QSAndAuditingMobile from './QSAndAuditingMobile';
import QSAndAuditingTablet from './QSAndAuditingTablet';

export default function QSAndAuditing() {
    const deviceType = useDeviceType();

    if (deviceType === 'mobile') return <QSAndAuditingMobile />;
    if (deviceType === 'tablet') return <QSAndAuditingTablet />;
    return <QSAndAuditingDesktop />;
}
