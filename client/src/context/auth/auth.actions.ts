import { GeneralObject } from "../../shared/types";
import { ActionType } from "./auth.types";

type FetchMeStart = {
    type: ActionType.FETCH_ME_START;
}

type FetchMeSuccess = {
    type: ActionType.FETCH_ME_SUCCESS;
    payload: GeneralObject
}

type FetchMeFailure = {
    type: ActionType.FETCH_ME_FAILURE;
    payload: string;
}

export type Action = FetchMeStart | FetchMeSuccess | FetchMeFailure;