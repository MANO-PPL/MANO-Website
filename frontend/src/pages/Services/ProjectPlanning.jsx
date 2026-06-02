import useDeviceType from '../../hooks/useDeviceType';
import ProjectPlanningDesktop from './ProjectPlanningDesktop';
import ProjectPlanningMobile from './ProjectPlanningMobile';
import ProjectPlanningTablet from './ProjectPlanningTablet';

import SEO from '../../components/common/SEO';

export default function ProjectPlanning() {
    const deviceType = useDeviceType();

    return (
        <>
            <SEO 
                title="Project Planning & Scheduling" 
                description="Strategic project planning using CPM and PERT techniques. Optimize your construction timeline and resource allocation with MANO."
                keywords="project planning, construction scheduling, CPM, PERT, project timeline"
                breadcrumbData={[
                    { name: 'Home', item: 'https://mano.co.in/' },
                    { name: 'Services', item: 'https://mano.co.in/pmc/services' },
                    { name: 'Project Planning', item: 'https://mano.co.in/pmc/services/project-planning' }
                ]}
            />
            {deviceType === 'mobile' ? <ProjectPlanningMobile /> : 
             deviceType === 'tablet' ? <ProjectPlanningTablet /> : 
             <ProjectPlanningDesktop />}
        </>
    );
}
