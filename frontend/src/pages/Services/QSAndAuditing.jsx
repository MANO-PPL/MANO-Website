import useDeviceType from '../../hooks/useDeviceType';
import QSAndAuditingDesktop from './QSAndAuditingDesktop';
import QSAndAuditingMobile from './QSAndAuditingMobile';
import QSAndAuditingTablet from './QSAndAuditingTablet';

import SEO from '../../components/common/SEO';

export default function QSAndAuditing() {
    const deviceType = useDeviceType();

    return (
        <>
            <SEO 
                title="Quantity Survey & Billing Service" 
                description="Accurate quantity surveying and billing verification by MANO. Ensuring financial transparency and accountability in construction projects."
                keywords="quantity surveying, construction billing, billing audit, QS services, construction transparency"
                breadcrumbData={[
                    { name: 'Home', item: 'https://mano.co.in/' },
                    { name: 'Services', item: 'https://mano.co.in/pmc/services' },
                    { name: 'QS & Billing Audit', item: 'https://mano.co.in/pmc/services/qs-billing-audit' }
                ]}
            />
            {deviceType === 'mobile' ? <QSAndAuditingMobile /> : 
             deviceType === 'tablet' ? <QSAndAuditingTablet /> : 
             <QSAndAuditingDesktop />}
        </>
    );
}
