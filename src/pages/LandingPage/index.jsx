import useDeviceType from '../../hooks/useDeviceType';
import LandingPageDesktop from './LandingPageDesktop';
import LandingPageMobile from './LandingPageMobile';
import LandingPageTablet from './LandingPageTablet';

import { useCompany } from '../../context/CompanyContext';
import SEO from '../../components/common/SEO';

export default function LandingPage() {
    const deviceType = useDeviceType();
    const { isEPC } = useCompany();

    const title = isEPC ? "MANO EPC Services | Engineering Procurement Construction India" : "MANO PMC Services | Project Management Consultancy India";
    const description = isEPC 
        ? "MANO EPC (PCPL) specializes in providing end-to-end Engineering, Procurement, and Construction solutions for industrial and infrastructure projects."
        : "MANO PMC (PPL) offers world-class Project Management Consultancy, Cost Consultancy, and Auditing services to ensure project success.";
    
    return (
        <>
            <SEO 
                title={title}
                description={description}
                keywords={`MANO, ${isEPC ? 'EPC, PCPL, engineering, procurement, construction' : 'PMC, PPL, project management consultancy, cost consultancy, audit'}`}
                breadcrumbData={[
                    { name: 'Home', item: 'https://mano.co.in/' },
                    { name: isEPC ? 'EPC Division' : 'PMC Division', item: `https://mano.co.in/${isEPC ? 'epc' : 'pmc'}` }
                ]}
                faqData={[
                    { question: 'What is PMC (Project Management Consultants)?', answer: 'Project Management Consultants (PMC) provide end-to-end professional services that plan, coordinate, and control a project from inception to completion. At MANO, our PMC services ensure your project is delivered on time, within budget, and to the highest quality standards.' },
                    { question: 'What is Cost Consultancy?', answer: 'Cost Consultancy involves managing the financial health of a construction project. We provide accurate cost estimation, budgeting, value engineering, and financial monitoring to maximize ROI.' },
                    { question: 'What services does MANO Consultants provide?', answer: 'We offer comprehensive project management, construction management, quantity surveying, and Cost Consultancy services tailored to your specific project needs.' }
                ]}
            />
            {deviceType === 'mobile' && <LandingPageMobile />}
            {deviceType === 'tablet' && <LandingPageTablet />}
            {deviceType === 'desktop' && <LandingPageDesktop />}
            {!['mobile', 'tablet', 'desktop'].includes(deviceType) && <LandingPageDesktop />}
        </>
    );
}
