import { createContext, useContext, useMemo } from 'react';

const CompanyContext = createContext({ brand: 'PMC', isEPC: false, isPMC: true });

export const useCompany = () => useContext(CompanyContext);

// brand prop is now passed explicitly from the route definition (e.g. brand="pmc")
// instead of being read from URL params, so it works with fixed /pmc and /epc routes.
export const CompanyProvider = ({ children, brand }) => {
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
