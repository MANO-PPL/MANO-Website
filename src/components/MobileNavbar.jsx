import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import RainbowButton from './RainbowButton';

const MobileNavbar = ({
    isOpen,
    onClose,
    isActive,
    getLink,
    isEPC,
    isCareersPage,
    handleContactClick,
    services,
}) => {
    const [isServicesExpanded, setIsServicesExpanded] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setIsServicesExpanded(false);
        }
    }, [isOpen]);

    const closeMenu = () => onClose();

    const linkBaseClass = 'transition-all duration-300 ease-in-out font-medium py-2.5 text-[16px]';
    const activeClass = 'text-white font-semibold';
    const inactiveClass = 'text-gray-300 hover:text-white';

    return (
        <div
            className={`xl:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[82vh] opacity-100 border-t border-white/10' : 'max-h-0 opacity-0'}`}
        >
            <div className="flex flex-col p-4 sm:p-5 gap-1.5 max-h-[80vh] overflow-y-auto">
                    <Link onClick={closeMenu} to={getLink('/')} className={`${linkBaseClass} ${isActive('/') ? activeClass : inactiveClass}`}>
                        Home
                    </Link>

                    <Link onClick={closeMenu} to={getLink('/about-us')} className={`${linkBaseClass} ${isActive('/about-us') ? activeClass : inactiveClass}`}>
                        About Us
                    </Link>

                    <div>
                        <div className="flex items-center justify-between">
                            <Link
                                to={isEPC ? getLink('/services/epc') : getLink('/services')}
                                onClick={closeMenu}
                                className={`${linkBaseClass} ${isActive(isEPC ? '/services/epc' : '/services') ? activeClass : inactiveClass}`}
                            >
                                {isEPC ? 'Service' : 'Services'}
                            </Link>
                            <button
                                onClick={() => setIsServicesExpanded(prev => !prev)}
                                className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
                                aria-label={isServicesExpanded ? 'Collapse services list' : 'Expand services list'}
                                aria-expanded={isServicesExpanded}
                                aria-controls="mobile-services-list"
                            >
                                <ChevronDown className={`w-5 h-5 text-white transition-transform ${isServicesExpanded ? 'rotate-180' : ''}`} />
                            </button>
                        </div>

                        <div
                            id="mobile-services-list"
                            className={`transition-all duration-300 overflow-hidden ${isServicesExpanded ? 'max-h-[420px] opacity-100 pb-2' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="pl-4 space-y-1">
                                {services.map((service, index) => (
                                    <Link
                                        key={`${service.path}-${index}`}
                                        to={getLink(service.path)}
                                        onClick={closeMenu}
                                        className="block py-2 rounded-lg text-sm text-gray-300 hover:text-white"
                                    >
                                        {service.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Link onClick={closeMenu} to={getLink('/projects')} className={`${linkBaseClass} ${isActive('/projects') ? activeClass : inactiveClass}`}>
                        Projects
                    </Link>

                    <Link onClick={closeMenu} to={getLink('/careers')} className={`${linkBaseClass} ${isActive('/careers') ? activeClass : inactiveClass}`}>
                        Careers
                    </Link>

                    <Link onClick={closeMenu} to={getLink('/blog')} className={`${linkBaseClass} ${isActive('/blog') ? activeClass : inactiveClass}`}>
                        Blog
                    </Link>

                    <div className="pt-2" onClick={(e) => { closeMenu(); handleContactClick(e); }}>
                        <RainbowButton borderRadius="rounded-md" buttonClassName="!px-3 !py-1.5 !text-xs">
                            {isCareersPage ? 'Apply' : 'Get in Touch'}
                            <ChevronRight className="w-3 h-3 ml-1" />
                        </RainbowButton>
                    </div>
            </div>
        </div>
    );
};

export default MobileNavbar;
