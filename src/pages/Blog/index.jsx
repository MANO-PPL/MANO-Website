import useDeviceType from '../../hooks/useDeviceType';
import BlogPageDesktop from './BlogPage';
import BlogPageMobile from './BlogPageMobile';

export default function BlogPage() {
    const deviceType = useDeviceType();

    // Tablet portrait uses mobile layout (mobile nav)
    if (deviceType === 'mobile' || deviceType === 'tablet') return <BlogPageMobile />;
    return <BlogPageDesktop />;
}
