import useDeviceType from '../../hooks/useDeviceType';
import ProjectManagementDesktop from './ProjectManagementDesktop';
import ProjectManagementMobile from './ProjectManagementMobile';
import ProjectManagementTablet from './ProjectManagementTablet';

import SEO from '../../components/common/SEO';

export default function ProjectManagement() {
    const deviceType = useDeviceType();

    return (
        <>
            <SEO 
                title="Project Management Services" 
                description="Comprehensive project management services by MANO. Ensuring timely delivery, quality control, and stakeholder coordination for construction projects."
                keywords="project management consultancy, construction management, PMC services, MANO project management"
                breadcrumbData={[
                    { name: 'Home', item: 'https://mano.co.in/' },
                    { name: 'Services', item: 'https://mano.co.in/pmc/services' },
                    { name: 'Project Management', item: 'https://mano.co.in/pmc/services/project-management' }
                ]}
            />
            {deviceType === 'mobile' ? <ProjectManagementMobile /> : 
             deviceType === 'tablet' ? <ProjectManagementTablet /> : 
             <ProjectManagementDesktop />}
        </>
    );
}
