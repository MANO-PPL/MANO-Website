import useDeviceType from '../../hooks/useDeviceType';
import QAQCAndAuditingDesktop from './QAQCAndAuditingDesktop';
import QAQCAndAuditingMobile from './QAQCAndAuditingMobile';
import QAQCAndAuditingTablet from './QAQCAndAuditingTablet';

export default function QAQCAndAuditing() {
    const deviceType = useDeviceType();

    if (deviceType === 'mobile') return <QAQCAndAuditingMobile />;
    if (deviceType === 'tablet') return <QAQCAndAuditingTablet />;
    return <QAQCAndAuditingDesktop />;
}
