import useDeviceType from '../../hooks/useDeviceType';
import QAQCAndAuditingDesktop from './QAQCAndAuditingDesktop';
import QAQCAndAuditingMobile from './QAQCAndAuditingMobile';
import QAQCAndAuditingTablet from './QAQCAndAuditingTablet';

import SEO from '../../components/common/SEO';

export default function QAQCAndAuditing() {
    const deviceType = useDeviceType();

    return (
        <>
            <SEO 
                title="Quality Assurance & Quality Control Audit" 
                description="Uncompromising quality excellence with MANO's QA/QC audits. We implement rigorous testing, compliance checks, and standards adherence."
                keywords="QAQC audit, construction quality control, quality assurance engineering, construction audit"
                breadcrumbData={[
                    { name: 'Home', item: 'https://mano.co.in/' },
                    { name: 'Services', item: 'https://mano.co.in/pmc/services' },
                    { name: 'QA/QC Audit', item: 'https://mano.co.in/pmc/services/qa-audit' }
                ]}
            />
            {deviceType === 'mobile' ? <QAQCAndAuditingMobile /> : 
             deviceType === 'tablet' ? <QAQCAndAuditingTablet /> : 
             <QAQCAndAuditingDesktop />}
        </>
    );
}
