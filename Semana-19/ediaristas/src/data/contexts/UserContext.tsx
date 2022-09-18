import { UserReducerInterface, initialState, useUserReducer } from 'data/reducers/UserReducer';
import React, { createContext } from 'react';

const initialValue: UserReducerInterface = {
    userState: initialState,
    userDispatch: () => {},
};

export const UserContext = createContext(initialValue);

export const UserProvider: React.FC = ({children}) => {
    const reducer = useUserReducer();


    return <UserContext.Provider value={reducer}>
        {children}
    </UserContext.Provider>
}