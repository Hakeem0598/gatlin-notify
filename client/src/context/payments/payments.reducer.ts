import { GeneralObject, RequestStatus } from "../../shared/types";
import { Action } from "./payments.actions"
import { ActionType } from "./payments.types";

export type PaymentsState = {
    status: RequestStatus,
    payments: GeneralObject[] | null;
    pagination: GeneralObject | null;
    error: string | null;
}

export const INITIAL_STATE: PaymentsState = {
    status: 'idle',
    payments: null,
    pagination: null,
    error: null
}

const PaymentReducer = (state: PaymentsState, action: Action): PaymentsState => {
    switch(action.type) {
        case ActionType.FETCH_PAYMENTS_START:
            return {
                status: 'pending',
                payments: null,
                pagination: null,
                error: null
            }
        case ActionType.FETCH_PAYMENTS_SUCCESS:
            return {
                status: 'fulfilled',
                payments: action.payload,
                pagination: action.pagination,
                error: null
            }
        case ActionType.FETCH_PAYMENTS_FAILURE:
            return {
                status: 'rejected',
                payments: null,
                pagination: null,
                error: action.payload
            }
        default:
            return { ...state }
    }
}

export default PaymentReducer;