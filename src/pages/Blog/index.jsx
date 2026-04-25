import useDeviceType from '../../hooks/useDeviceType';
import BlogPageDesktop from './BlogPage';
import BlogPageMobile from './BlogPageMobile';

import SEO from '../../components/common/SEO';

export default function BlogPage() {
    const deviceType = useDeviceType();

    return (
        <>
            <SEO 
                title="Industry Insights & Engineering Blog" 
                description="Stay updated with the latest trends in construction, project management, and engineering innovations through the MANO blog."
                keywords="construction blog, project management insights, engineering trends, MANO news"
                breadcrumbData={[
                    { name: 'Home', item: 'https://mano.co.in/' },
                    { name: 'Blog', item: 'https://mano.co.in/blog' }
                ]}
            />
            {/* Tablet portrait uses mobile layout (mobile nav) */}
            {(deviceType === 'mobile' || deviceType === 'tablet') && <BlogPageMobile />}
            {deviceType === 'desktop' && <BlogPageDesktop />}
            {!['mobile', 'tablet', 'desktop'].includes(deviceType) && <BlogPageDesktop />}
        </>
    );
}
