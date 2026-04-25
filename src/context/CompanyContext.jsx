import { createContext, useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const CompanyContext = createContext('PMC');

export const useCompany = () => useContext(CompanyContext);

export const CompanyProvider = ({ children }) => {
    const { brand } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [currentBrand, setCurrentBrand] = useState('PMC');

    useEffect(() => {
        if (brand) {
            const normalizedBrand = brand.toUpperCase();
            // Handle PCPL -> PMC and PPL -> EPC mapping or direct usage
            if (normalizedBrand === 'PMC' || normalizedBrand === 'PCPL') {
                setCurrentBrand('PMC'); // Update to new route name
            } else if (normalizedBrand === 'EPC' || normalizedBrand === 'PPL') {
                setCurrentBrand('EPC'); // Update to new route name
            } else {
                // Invalid brand, could redirect or default
            }
        }
    }, [brand, navigate, location.pathname]);

    const isEPC = currentBrand === 'PPL' || currentBrand === 'EPC';
    const isPMC = currentBrand === 'PCPL' || currentBrand === 'PMC';

    return (
        <CompanyContext.Provider value={{ brand: currentBrand, isEPC, isPMC }}>
            {children}
        </CompanyContext.Provider>
    );
};
