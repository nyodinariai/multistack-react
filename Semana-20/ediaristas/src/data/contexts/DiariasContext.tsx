import { DiariaReducerInterface, initialState, useDiariaReducer } from "data/reducers/DiariasReducer";
import React, { createContext } from "react";
import { UserProvider } from "./UserContext";

const initialValue: DiariaReducerInterface = {
    diariaState: initialState,
    diariaDispatch: () => {},
};

export const DiariaContext = createContext(initialValue);

export const DiariaProvider: React.FC = ({children}) => {
    const reducer = useDiariaReducer();
    return (
        <DiariaContext.Provider value={reducer}>
            <UserProvider>
                {children}
            </UserProvider>
        </DiariaContext.Provider>
    )
}