import useDeviceType from '../../hooks/useDeviceType';
import ProjectPlanningDesktop from './ProjectPlanningDesktop';
import ProjectPlanningMobile from './ProjectPlanningMobile';
import ProjectPlanningTablet from './ProjectPlanningTablet';

export default function ProjectPlanning() {
    const deviceType = useDeviceType();

    if (deviceType === 'mobile') return <ProjectPlanningMobile />;
    if (deviceType === 'tablet') return <ProjectPlanningTablet />;
    return <ProjectPlanningDesktop />;
}
