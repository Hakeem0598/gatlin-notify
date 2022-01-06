import React, { createContext, useEffect, useReducer, Dispatch } from 'react'
import { Action } from './payments.actions';
import PaymentsReducer, { INITIAL_STATE, PaymentsState } from './payments.reducer'
import { getPayments } from './payments.services';

type Context = {
    state: PaymentsState;
    dispatch: Dispatch<Action>;
}

export const PaymentsContext = createContext<Context>({ state: INITIAL_STATE, dispatch: () => null });

function PaymentsContextProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(PaymentsReducer, INITIAL_STATE);

    useEffect(() => {
        getPayments(dispatch);
    }, [dispatch]);

    return (
        <PaymentsContext.Provider value={{ state, dispatch }}>
            { children }
        </PaymentsContext.Provider>
    )
}

export default PaymentsContextProvider
