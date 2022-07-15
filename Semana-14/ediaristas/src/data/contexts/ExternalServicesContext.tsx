import { ExternalServiceReducerInterface, initialState, useExternalServiceReducer } from 'data/reducers/ExternalServicesReducer';
import React, { createContext } from 'react';

const initialValue: ExternalServiceReducerInterface = {
    externalServiceState: initialState,
    externalServiceDispatch: () => {},
};

export const ExternalServiceContext = createContext(initialValue);

export const ExternalServicesProvider: React.FC = ({children}) => {
    const reducer = useExternalServiceReducer();


    return <ExternalServiceContext.Provider value={reducer}>
        {children}
    </ExternalServiceContext.Provider>
}