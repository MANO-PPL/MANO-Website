import useDeviceType from '../../hooks/useDeviceType';
import GatewayDesktop from './GatewayDesktop';
import GatewayMobile from './GatewayMobile';
import GatewayTablet from './GatewayTablet';

import SEO from '../../components/common/SEO';

export default function Gateway() {
    const deviceType = useDeviceType();

    return (
        <>
            <SEO 
                title="MANO Projects | Premier Project Management & EPC Consultants" 
                description="MANO Projects Private Limited - India's leading Project Management (PMC) and EPC (Engineering, Procurement, Construction) specialists."
                keywords="MANO Projects Private Limited, MANO PPL, MANO Projects, MANO Consultants, PMC, EPC, construction consultants India"
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "LocalBusiness",
                    "name": "MANO Projects Private Limited",
                    "image": "https://www.mano.co.in/hero-collage-1.webp",
                    "@id": "https://www.mano.co.in",
                    "url": "https://www.mano.co.in",
                    "telephone": "+91-XXXXXXXXXX",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "Borivali",
                        "addressLocality": "Mumbai",
                        "addressRegion": "Maharashtra",
                        "postalCode": "400091",
                        "addressCountry": "IN"
                    },
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": 19.2307,
                        "longitude": 72.8567
                    },
                    "openingHoursSpecification": {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": [
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday"
                        ],
                        "opens": "09:00",
                        "closes": "18:00"
                    }
                }}
                navigationData={[
                    { name: 'Home', url: '/' },
                    { name: 'PMC Division', url: '/pmc' },
                    { name: 'EPC Division', url: '/epc' },
                    { name: 'About Us', url: '/about-us' },
                    { name: 'Our Projects', url: '/projects' },
                    { name: 'Services', url: '/pmc/services' },
                    { name: 'Careers', url: '/careers' },
                    { name: 'Blog', url: '/blog' }
                ]}
            />
            
            {/* Organization Schema */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "MANO Projects Private Limited",
                    "url": "https://www.mano.co.in",
                    "logo": "https://www.mano.co.in/mano-logo.svg",
                    "sameAs": [
                        "https://www.linkedin.com/company/mano-project-consultants"
                    ]
                })}
            </script>
            {deviceType === 'mobile' && <GatewayMobile />}
            {deviceType === 'tablet' && <GatewayTablet />}
            {deviceType === 'desktop' && <GatewayDesktop />}
            {/* Fallback to desktop if device type is unknown */}
            {!['mobile', 'tablet', 'desktop'].includes(deviceType) && <GatewayDesktop />}
        </>
    );
}
