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
                title="Premier Project Management & EPC Consultants" 
                description="MANO Consultants - India's leading Project Management (PMC) and EPC (Engineering, Procurement, Construction) specialists. Delivering excellence in residential, commercial, and industrial sectors."
                keywords="MANO, PMC, EPC, construction consultants India, project management consultancy, engineering experts Mumbai, cost consultancy"
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "LocalBusiness",
                    "name": "MANO Consultants",
                    "image": "https://mano.co.in/hero-collage-1.webp",
                    "@id": "https://mano.co.in",
                    "url": "https://mano.co.in",
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
                    "name": "MANO Consultants",
                    "url": "https://mano.co.in",
                    "logo": "https://mano.co.in/mano-logo.svg",
                    "sameAs": [
                        "https://www.linkedin.com/company/mano-consultants"
                    ],
                    "description": "Leading Project Management and Construction Consultancy in India.",
                    "department": [
                        {
                            "@type": "Organization",
                            "name": "MANO PMC (PPL)",
                            "description": "Project Management Consultancy division specializing in residential and commercial sectors."
                        },
                        {
                            "@type": "Organization",
                            "name": "MANO EPC (PCPL)",
                            "description": "Engineering, Procurement, and Construction division specializing in industrial and infrastructure projects."
                        }
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
