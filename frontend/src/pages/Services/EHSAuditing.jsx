import useDeviceType from '../../hooks/useDeviceType';
import EHSAuditingDesktop from './EHSAuditingDesktop';
import EHSAuditingMobile from './EHSAuditingMobile';
import EHSAuditingTablet from './EHSAuditingTablet';

import SEO from '../../components/common/SEO';

export default function EHSAuditing() {
    const deviceType = useDeviceType();

    return (
        <>
            <SEO 
                title="Environment, Health & Safety Audit" 
                description="Comprehensive EHS audits to maintain the highest safety standards. MANO ensures a safe work environment and regulatory compliance."
                keywords="EHS audit, construction safety, health and safety audit, environmental compliance"
                breadcrumbData={[
                    { name: 'Home', item: 'https://mano.co.in/' },
                    { name: 'Services', item: 'https://mano.co.in/pmc/services' },
                    { name: 'EHS Audit', item: 'https://mano.co.in/pmc/services/ehs-audit' }
                ]}
            />
            {deviceType === 'mobile' ? <EHSAuditingMobile /> : 
             deviceType === 'tablet' ? <EHSAuditingTablet /> : 
             <EHSAuditingDesktop />}
        </>
    );
}
