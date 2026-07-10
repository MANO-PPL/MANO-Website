import { createContext, useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';

const CompanyContext = createContext({ brand: 'PMC', isEPC: false, isPMC: true });

export const useCompany = () => useContext(CompanyContext);

export const CompanyProvider = ({ children }) => {
    const { brand } = useParams();

    // Compute brand synchronously from URL param — no useEffect delay
    const currentBrand = useMemo(() => {
        if (!brand) return 'PMC';
        const normalizedBrand = brand.toUpperCase();
        if (normalizedBrand === 'EPC' || normalizedBrand === 'PPL') return 'EPC';
        if (normalizedBrand === 'PMC' || normalizedBrand === 'PCPL') return 'PMC';
        return 'PMC';
    }, [brand]);

    const isEPC = currentBrand === 'EPC';
    const isPMC = currentBrand === 'PMC';

    return (
        <CompanyContext.Provider value={{ brand: currentBrand, isEPC, isPMC }}>
            {children}
        </CompanyContext.Provider>
    );
};
