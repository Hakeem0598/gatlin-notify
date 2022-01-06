import { GeneralObject } from "../../shared/types";
import { ActionType } from "./products.types";

type FetchProductsStart = {
    type: ActionType.FETCH_PRODUCTS_START
}

type FetchProductsSuccess = {
    type: ActionType.FETCH_PRODUCTS_SUCCESS,
    payload: GeneralObject[],
    pagination: GeneralObject
}

type FetchProductsFailure = {
    type: ActionType.FETCH_PRODUCTS_FAILURE,
    payload: string;
}

export type Action = FetchProductsStart | FetchProductsSuccess | FetchProductsFailure;
