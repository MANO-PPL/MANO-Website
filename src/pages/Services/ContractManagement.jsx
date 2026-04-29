import useDeviceType from '../../hooks/useDeviceType';
import ContractManagementDesktop from './ContractManagementDesktop';
import ContractManagementMobile from './ContractManagementMobile';
import ContractManagementTablet from './ContractManagementTablet';

import SEO from '../../components/common/SEO';

export default function ContractManagement() {
    const deviceType = useDeviceType();

    return (
        <>
            <SEO 
                title="Contract Management Services" 
                description="Protect your interests with robust contract management. MANO handles document administration, change orders, and risk mitigation."
                keywords="contract management, construction contracts, risk mitigation, change order management"
                breadcrumbData={[
                    { name: 'Home', item: 'https://mano.co.in/' },
                    { name: 'Services', item: 'https://mano.co.in/pmc/services' },
                    { name: 'Contract Management', item: 'https://mano.co.in/pmc/services/contract-management' }
                ]}
            />
            {deviceType === 'mobile' ? <ContractManagementMobile /> : 
             deviceType === 'tablet' ? <ContractManagementTablet /> : 
             <ContractManagementDesktop />}
        </>
    );
}
