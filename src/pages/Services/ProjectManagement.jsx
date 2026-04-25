import useDeviceType from '../../hooks/useDeviceType';
import ProjectManagementDesktop from './ProjectManagementDesktop';
import ProjectManagementMobile from './ProjectManagementMobile';
import ProjectManagementTablet from './ProjectManagementTablet';

export default function ProjectManagement() {
    const deviceType = useDeviceType();

    if (deviceType === 'mobile') return <ProjectManagementMobile />;
    if (deviceType === 'tablet') return <ProjectManagementTablet />;
    return <ProjectManagementDesktop />;
}
