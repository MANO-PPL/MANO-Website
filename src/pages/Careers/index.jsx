import useDeviceType from '../../hooks/useDeviceType';
import CareersDesktop from './CareersDesktop';
import CareersMobile from './CareersMobile';
import CareersTablet from './CareersTablet';

import SEO from '../../components/common/SEO';

export default function Careers() {
    const deviceType = useDeviceType();

    return (
        <>
            <SEO 
                title="Careers" 
                description="Join the MANO team and build your career with leaders in Project Management and EPC. Explore job opportunities and our work culture."
                keywords="MANO careers, construction jobs India, engineering recruitment, build your career at MANO"
                breadcrumbData={[
                    { name: 'Home', item: 'https://mano.co.in/' },
                    { name: 'Careers', item: 'https://mano.co.in/careers' }
                ]}
            />
            {deviceType === 'mobile' && <CareersMobile />}
            {deviceType === 'tablet' && <CareersTablet />}
            {deviceType === 'desktop' && <CareersDesktop />}
            {!['mobile', 'tablet', 'desktop'].includes(deviceType) && <CareersDesktop />}
        </>
    );
}
