import { AxiosError } from "axios";
import api from "../api"
import { Action } from "./products.actions";
import { ActionType } from "./products.types";

export const getProducts = async (dispatch: React.Dispatch<Action>, queryString?: string) => {
    dispatch({
        type: ActionType.FETCH_PRODUCTS_START
    })

    try {
        const url = queryString ? `/products${queryString}` : '/products';
        const { data: { products, pagination } } = await api.get(url);
        dispatch({ 
            type: ActionType.FETCH_PRODUCTS_SUCCESS, 
            payload: products,
            pagination
        })

    } catch (error) {
        dispatch({ 
            type: ActionType.FETCH_PRODUCTS_FAILURE, 
            payload: (error as AxiosError).response?.data.message
        })
    }
}