// src/context/GlobalContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FormData {
    field1?: string;
    field2?: string;
    // Add other fields as needed
}

interface GlobalContextProps {
    formData: FormData;
    setFormData: (data: FormData) => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Initialize formData with empty object or default values if needed
    const [formData, setFormData] = useState<FormData>({});

    return (
        <GlobalContext.Provider value={{ formData, setFormData }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};
