import { Link } from 'react-router-dom';
import { useCompany } from '../context/CompanyContext';

const Footer = () => {
    const { isEPC, brand } = useCompany();
    const brandPath = `/${brand.toLowerCase()}`;
    const getLink = (path) => `${brandPath}${path === '/' ? '' : path}`;

    const pcplServices = [
        { title: "Project Management", path: "/services/project-management" },
        { title: "Project Execution", path: "/services/project-execution" },
        { title: "Project Planning", path: "/services/project-planning" },
        { title: "Contract Management", path: "/services/contract-management" },
        { title: "QA/QC and Auditing", path: "/services/qa-audit" },
        { title: "Cost Consultancy", path: "/services/cost-consultancy" },
        { title: "QS and Auditing", path: "/services/qs-billing-audit" },
        { title: "EHS Audit", path: "/services/ehs-audit" }
    ];

    const pplServices = [
        { title: "EPC Solution", path: "/services/epc" }
    ];

    const services = isEPC ? pplServices : pcplServices;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

                .footer-font * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>

            <div className="relative w-full overflow-hidden">
                {/* Beam of Light Effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] aspect-square -translate-y-[85%] bg-blue-600/30 blur-[100px] rounded-full pointer-events-none"></div>

                <footer className="footer-font px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 w-full text-sm text-gray-400 bg-black pt-16 md:pt-24 pb-8 relative z-10">
                    <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row justify-between gap-12 lg:gap-24">

                        {/* Column 1: Logo & Contact */}
                        <div className="space-y-6 max-w-sm">
                            <Link to={brandPath}>
                                <div className="inline-block">
                                    <img src={`${import.meta.env.BASE_URL}mano-logo.svg`} alt="Mano Logo" loading="lazy" decoding="async" className="h-12 md:h-16" />
                                </div>
                            </Link>
                            <div className="space-y-4 text-gray-400">
                                <div>
                                    <h3 className="font-bold text-white text-lg lg:text-xl">MANO Project Consultants Pvt. Ltd.</h3>
                                    <p className="italic text-blue-400 text-xs">A Complete Construction Engineering Solution</p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-600 rounded-full p-1.5 text-white shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                        </div>
                                        <p className="font-medium">022 2412 9600, +91 91360 96633</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-600 rounded-full p-1.5 text-white shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                        </div>
                                        <a href="mailto:business@mano.co.in" className="hover:text-blue-400 transition">business@mano.co.in</a>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-600 rounded-full p-1.5 text-white shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                                        </div>
                                        <a href="https://www.mano.co.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">www.mano.co.in</a>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="bg-blue-600 rounded-full p-1.5 text-white shrink-0 mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                        </div>
                                        <p className="leading-relaxed">B-11, 2nd Floor, West View, 88, L.N Road, Dadar (East), Mumbai - 400014</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Our Services */}
                        <div className="flex flex-col pt-4 lg:pt-0">
                            <h2 className="font-bold text-white text-lg mb-6">Our Services</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col gap-x-8 gap-y-3 text-sm text-gray-400">
                                {services.map((service, index) => (
                                    <Link
                                        key={index}
                                        className="hover:text-blue-400 transition whitespace-nowrap"
                                        to={getLink(service.path)}
                                    >
                                        {service.title}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Column 3: Quick Links & CTA */}
                        <div className="pt-4 lg:pt-0">
                            <h2 className="font-bold text-white text-lg mb-6">Quick Links</h2>
                            <div className="grid grid-cols-2 lg:flex lg:flex-col gap-x-8 gap-y-3 text-sm text-gray-400">
                                <Link className="hover:text-blue-400 transition" to={getLink('/')}>Home</Link>
                                <Link className="hover:text-blue-400 transition" to={getLink('/about-us')}>About Us</Link>
                                <Link className="hover:text-blue-400 transition" to={getLink('/projects')}>Projects</Link>
                                <Link className="hover:text-blue-400 transition" to={getLink('/careers')}>Careers</Link>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500">
                        <p>Copyright 2025 © <span className="font-semibold text-gray-400">MANO Project Consultants Pvt. Ltd.</span> All Rights Reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Footer;
