import { AxiosError } from "axios";
import api from "../api"
import { Action } from "./payments.actions";
import { ActionType } from "./payments.types";

export const getPayments = async (dispatch: React.Dispatch<Action>, queryString?: string) => {
    dispatch({
        type: ActionType.FETCH_PAYMENTS_START
    })

    try {
        const url = queryString ? `/payments${queryString}` : '/payments';
        const { data: { payments, pagination } } = await api.get(url);
        dispatch({ 
            type: ActionType.FETCH_PAYMENTS_SUCCESS, 
            payload: payments,
            pagination
        })

    } catch (error) {
        dispatch({ 
            type: ActionType.FETCH_PAYMENTS_FAILURE, 
            payload: (error as AxiosError).response?.data.message
        })
    }
}