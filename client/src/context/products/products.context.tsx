import React, { createContext, useEffect, useReducer, Dispatch } from 'react'
import { Action } from './products.actions';
import ProductsReducer, { INITIAL_STATE, ProductsState } from './products.reducer'
import { getProducts } from './products.services';

type Context = {
    state: ProductsState;
    dispatch: Dispatch<Action>;
}

export const ProductsContext = createContext<Context>({ state: INITIAL_STATE, dispatch: () => null });

function ProductsContextProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(ProductsReducer, INITIAL_STATE);

    useEffect(() => {
        getProducts(dispatch);
    }, [dispatch]);

    return (
        <ProductsContext.Provider value={{ state, dispatch }}>
            { children }
        </ProductsContext.Provider>
    )
}

export default ProductsContextProvider
