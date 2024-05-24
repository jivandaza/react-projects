import React, { createContext, useState } from 'react';

// Crear el contexto
export const SearchContext = createContext();

// Crear el proveedor del contexto
export const SearchProvider = ({ children }) => {
    const [showSearch, setShowSearch] = useState(false);

    return (
        <SearchContext.Provider value={{ showSearch, setShowSearch }}>
            {children}
        </SearchContext.Provider>
    );
};