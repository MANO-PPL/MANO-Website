import useDeviceType from '../../hooks/useDeviceType';
import ContractManagementDesktop from './ContractManagementDesktop';
import ContractManagementMobile from './ContractManagementMobile';
import ContractManagementTablet from './ContractManagementTablet';

export default function ContractManagement() {
    const deviceType = useDeviceType();

    if (deviceType === 'mobile') return <ContractManagementMobile />;
    if (deviceType === 'tablet') return <ContractManagementTablet />;
    return <ContractManagementDesktop />;
}
