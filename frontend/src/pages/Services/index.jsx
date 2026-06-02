import useDeviceType from '../../hooks/useDeviceType';
import ServicesPageDesktop from './ServicesPageDesktop';
import ServicesPageMobile from './ServicesPageMobile';
import ServicesPageTablet from './ServicesPageTablet';

import SEO from '../../components/common/SEO';

export default function ServicesPage() {
    const deviceType = useDeviceType();

    return (
        <>
            <SEO 
                title="MANO Services | PMC & EPC Construction Solutions" 
                description="Explore MANO's wide range of services including Project Management Consultancy, Cost Consultancy, EPC solutions, and Specialized Engineering Audits."
                keywords="construction services, engineering audits, project management India, EPC solutions, cost consultancy"
                breadcrumbData={[
                    { name: 'Home', item: 'https://mano.co.in/' },
                    { name: 'Services', item: 'https://mano.co.in/services' }
                ]}
            />
            {deviceType === 'mobile' && <ServicesPageMobile />}
            {deviceType === 'tablet' && <ServicesPageTablet />}
            {deviceType === 'desktop' && <ServicesPageDesktop />}
            {!['mobile', 'tablet', 'desktop'].includes(deviceType) && <ServicesPageDesktop />}
        </>
    );
}
