import { AxiosError } from "axios";
import api from "../api"
import { Action } from "./users.actions";
import { ActionType } from "./users.types";

export const getUsers = async (dispatch: React.Dispatch<Action>, queryString?: string) => {
    dispatch({
        type: ActionType.FETCH_USERS_START
    })

    try {
        const url = queryString ? `/users${queryString}` : '/users';
        const { data: { users, pagination } } = await api.get(url);
        dispatch({ 
            type: ActionType.FETCH_USERS_SUCCESS, 
            payload: users,
            pagination
        })

    } catch (error) {
        dispatch({ 
            type: ActionType.FETCH_USERS_FAILURE, 
            payload: (error as AxiosError).response?.data.message
        })
    }
}