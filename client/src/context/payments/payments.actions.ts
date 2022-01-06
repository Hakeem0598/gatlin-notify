import { GeneralObject } from "../../shared/types";
import { ActionType } from "./payments.types";

type FetchPaymentsStart = {
    type: ActionType.FETCH_PAYMENTS_START
}

type FetchPaymentsSuccess = {
    type: ActionType.FETCH_PAYMENTS_SUCCESS,
    payload: GeneralObject[],
    pagination: GeneralObject
}

type FetchPaymentsFailure = {
    type: ActionType.FETCH_PAYMENTS_FAILURE,
    payload: string;
}

export type Action = FetchPaymentsStart | FetchPaymentsSuccess | FetchPaymentsFailure;
