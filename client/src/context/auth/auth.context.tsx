import { createContext, useReducer, useEffect } from 'react';
import AuthReducer, { INITIAL_STATE } from './auth.reducer';
import { getMe } from './auth.services';

export const AuthContext = createContext(INITIAL_STATE);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        getMe(dispatch);
    }, [dispatch]);

    return (
        <AuthContext.Provider value={{
            ...state,
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;