import useDeviceType from '../../hooks/useDeviceType';
import ProjectExecutionDesktop from './ProjectExecutionDesktop';
import ProjectExecutionMobile from './ProjectExecutionMobile';
import ProjectExecutionTablet from './ProjectExecutionTablet';

export default function ProjectExecution() {
    const deviceType = useDeviceType();

    if (deviceType === 'mobile') return <ProjectExecutionMobile />;
    if (deviceType === 'tablet') return <ProjectExecutionTablet />;
    return <ProjectExecutionDesktop />;
}
