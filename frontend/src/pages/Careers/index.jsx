import { useState, useEffect } from 'react';
import useDeviceType from '../../hooks/useDeviceType';
import CareersDesktop from './CareersDesktop';
import CareersMobile from './CareersMobile';
import CareersTablet from './CareersTablet';
import { JOBS_API_URL } from '../../config';
import { useCompany } from '../../context/CompanyContext';

import SEO from '../../components/common/SEO';

export default function Careers() {
    const deviceType = useDeviceType();
    const { brand } = useCompany();
    const [jobs, setJobs] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch(`${JOBS_API_URL}?platform=${(brand || 'pmc').toLowerCase()}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.ok && Array.isArray(data.data)) {
                        setJobs(data.data);
                    }
                }
            } catch (err) {
                console.error("Failed to load jobs dynamically, using fallback data:", err);
            }
        };
        fetchJobs();
    }, [brand]);

    return (
        <>
            <SEO 
                title="Careers at MANO | Job Openings & Opportunities" 
                description="Join the MANO team and build your career with leaders in Project Management and EPC. Explore job opportunities and our work culture."
                keywords="MANO careers, construction jobs India, engineering recruitment, build your career at MANO"
                breadcrumbData={[
                    { name: 'Home', item: 'https://mano.co.in/' },
                    { name: 'Careers', item: 'https://mano.co.in/careers' }
                ]}
            />
            {deviceType === 'mobile' && <CareersMobile jobs={jobs} brand={brand} />}
            {deviceType === 'tablet' && <CareersTablet jobs={jobs} brand={brand} />}
            {deviceType === 'desktop' && <CareersDesktop jobs={jobs} brand={brand} />}
            {!['mobile', 'tablet', 'desktop'].includes(deviceType) && <CareersDesktop jobs={jobs} brand={brand} />}
        </>
    );
}
