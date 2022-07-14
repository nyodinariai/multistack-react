import React, { createContext } from 'react';


export const ExternalServiceContext = createContext({});

export const ExternalServicesProvider = () => {
    const a = 5
    return <ExternalServiceContext.Provider value={a}>

    </ExternalServiceContext.Provider>
}