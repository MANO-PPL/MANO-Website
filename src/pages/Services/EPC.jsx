import useDeviceType from '../../hooks/useDeviceType';
import EPCDesktop from './EPCDesktop';
import EPCMobile from './EPCMobile';
import EPCTablet from './EPCTablet';

import SEO from '../../components/common/SEO';

export default function EPC() {
    const deviceType = useDeviceType();

    return (
        <>
            <SEO 
                title="EPC Solution - Engineering, Procurement, Construction" 
                description="Turnkey EPC solutions by MANO (PCPL). End-to-end engineering, procurement, and construction services for industrial and infrastructure projects."
                keywords="EPC solution, turnkey construction, engineering procurement construction, PCPL services"
                breadcrumbData={[
                    { name: 'Home', item: 'https://mano.co.in/' },
                    { name: 'Services', item: 'https://mano.co.in/epc/services' },
                    { name: 'EPC Solution', item: 'https://mano.co.in/epc/services/epc' }
                ]}
            />
            {deviceType === 'mobile' ? <EPCMobile /> : 
             deviceType === 'tablet' ? <EPCTablet /> : 
             <EPCDesktop />}
        </>
    );
}
