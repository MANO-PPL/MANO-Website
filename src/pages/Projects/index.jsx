import useDeviceType from '../../hooks/useDeviceType';
import ProjectsDesktop from './ProjectsDesktop';
import ProjectsMobile from './ProjectsMobile';
import ProjectsTablet from './ProjectsTablet';

import SEO from '../../components/common/SEO';

export default function Projects() {
    const deviceType = useDeviceType();

    return (
        <>
            <SEO 
                title="MANO Projects | Construction & Infrastructure Portfolio" 
                description="Explore MANO's portfolio of successfully delivered projects in Project Management and EPC, showcasing our engineering expertise and commitment to quality."
                keywords="MANO projects, construction portfolio, engineering case studies, infrastructure projects India"
                breadcrumbData={[
                    { name: 'Home', item: 'https://mano.co.in/' },
                    { name: 'Our Projects', item: 'https://mano.co.in/projects' }
                ]}
            />
            {deviceType === 'mobile' && <ProjectsMobile />}
            {deviceType === 'tablet' && <ProjectsTablet />}
            {deviceType === 'desktop' && <ProjectsDesktop />}
            {!['mobile', 'tablet', 'desktop'].includes(deviceType) && <ProjectsDesktop />}
        </>
    );
}
