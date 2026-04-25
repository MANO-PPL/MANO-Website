import useDeviceType from '../../hooks/useDeviceType';
import ProjectsDesktop from './ProjectsDesktop';
import ProjectsMobile from './ProjectsMobile';
import ProjectsTablet from './ProjectsTablet';

export default function Projects() {
    const deviceType = useDeviceType();

    if (deviceType === 'mobile') return <ProjectsMobile />;
    if (deviceType === 'tablet') return <ProjectsTablet />;
    return <ProjectsDesktop />;
}
