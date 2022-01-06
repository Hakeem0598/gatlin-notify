import { GeneralObject } from "../../shared/types";
import { ActionType } from "./users.types";

type FetchUsersStart = {
    type: ActionType.FETCH_USERS_START
}

type FetchUsersSuccess = {
    type: ActionType.FETCH_USERS_SUCCESS,
    payload: GeneralObject[],
    pagination: GeneralObject
}

type FetchUsersFailure = {
    type: ActionType.FETCH_USERS_FAILURE,
    payload: string;
}

export type Action = FetchUsersStart | FetchUsersSuccess | FetchUsersFailure;
