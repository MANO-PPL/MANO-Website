import useDeviceType from '../../hooks/useDeviceType';
import AboutUsDesktop from './AboutUsDesktop';
import AboutUsMobile from './AboutUsMobile';
import AboutUsTablet from './AboutUsTablet';

import SEO from '../../components/common/SEO';

export default function AboutUs() {
    const deviceType = useDeviceType();

    return (
        <>
            <SEO 
                title="About Us" 
                description="Learn about MANO's vision, mission, and the leadership team driving excellence in Project Management and EPC solutions since inception."
                keywords="MANO about, construction leadership, project management vision, EPC company mission"
                breadcrumbData={[
                    { name: 'Home', item: 'https://mano.co.in/' },
                    { name: 'About Us', item: 'https://mano.co.in/about-us' }
                ]}
            />
            {deviceType === 'mobile' && <AboutUsMobile />}
            {deviceType === 'tablet' && <AboutUsTablet />}
            {deviceType === 'desktop' && <AboutUsDesktop />}
            {!['mobile', 'tablet', 'desktop'].includes(deviceType) && <AboutUsDesktop />}
        </>
    );
}
