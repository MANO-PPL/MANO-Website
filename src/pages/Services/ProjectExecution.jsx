import useDeviceType from '../../hooks/useDeviceType';
import ProjectExecutionDesktop from './ProjectExecutionDesktop';
import ProjectExecutionMobile from './ProjectExecutionMobile';
import ProjectExecutionTablet from './ProjectExecutionTablet';

import SEO from '../../components/common/SEO';

export default function ProjectExecution() {
    const deviceType = useDeviceType();

    return (
        <>
            <SEO 
                title="Project Execution & Management" 
                description="On-ground leadership and coordination for flawless project delivery. MANO ensures strict adherence to drawings and safety standards."
                keywords="project execution, site management, construction coordination, MANO execution"
                breadcrumbData={[
                    { name: 'Home', item: 'https://mano.co.in/' },
                    { name: 'Services', item: 'https://mano.co.in/pmc/services' },
                    { name: 'Project Execution', item: 'https://mano.co.in/pmc/services/project-execution' }
                ]}
            />
            {deviceType === 'mobile' ? <ProjectExecutionMobile /> : 
             deviceType === 'tablet' ? <ProjectExecutionTablet /> : 
             <ProjectExecutionDesktop />}
        </>
    );
}
