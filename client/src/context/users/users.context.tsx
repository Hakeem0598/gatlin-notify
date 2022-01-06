import React, { createContext, useEffect, useReducer, Dispatch } from 'react'
import { Action } from './users.actions';
import UsersReducer, { INITIAL_STATE, UsersState } from './users.reducer'
import { getUsers } from './users.services';

type Context = {
    state: UsersState;
    dispatch: Dispatch<Action>;
}

export const UsersContext = createContext<Context>({ state: INITIAL_STATE, dispatch: () => null });

function UsersContextProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(UsersReducer, INITIAL_STATE);

    useEffect(() => {
        getUsers(dispatch);
    }, [dispatch]);

    return (
        <UsersContext.Provider value={{ state, dispatch }}>
            { children }
        </UsersContext.Provider>
    )
}

export default UsersContextProvider
