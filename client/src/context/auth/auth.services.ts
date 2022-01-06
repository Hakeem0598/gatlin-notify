import { AxiosError } from "axios";
import api from "../api"
import { Action } from "./auth.actions";
import { ActionType } from "./auth.types";

export const getMe = async (dispatch: React.Dispatch<Action>) => {
    dispatch({
        type: ActionType.FETCH_ME_START
    })

    try {
        const { data: { user } } = await api.get('/users/me');
        dispatch({ 
            type: ActionType.FETCH_ME_SUCCESS, 
            payload: user
        })

    } catch (error) {
        dispatch({ 
            type: ActionType.FETCH_ME_FAILURE, 
            payload: (error as AxiosError).response?.data.message
        })
    }
}