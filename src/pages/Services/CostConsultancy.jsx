import useDeviceType from '../../hooks/useDeviceType';
import CostConsultancyDesktop from './CostConsultancyDesktop';
import CostConsultancyMobile from './CostConsultancyMobile';
import CostConsultancyTablet from './CostConsultancyTablet';

import SEO from '../../components/common/SEO';

export default function CostConsultancy() {
    const deviceType = useDeviceType();

    return (
        <>
            <SEO 
                title="Cost Consultancy & Budgeting" 
                description="Maximize your project ROI with MANO's expert cost consultancy. Detailed budgeting, value engineering, and financial monitoring for construction."
                keywords="cost consultancy, construction budgeting, value engineering, project ROI, financial control"
                breadcrumbData={[
                    { name: 'Home', item: 'https://mano.co.in/' },
                    { name: 'Services', item: 'https://mano.co.in/pmc/services' },
                    { name: 'Cost Consultancy', item: 'https://mano.co.in/pmc/services/cost-consultancy' }
                ]}
            />
            {deviceType === 'mobile' ? <CostConsultancyMobile /> : 
             deviceType === 'tablet' ? <CostConsultancyTablet /> : 
             <CostConsultancyDesktop />}
        </>
    );
}
