import { GeneralObject, RequestStatus } from "../../shared/types"
import { Action } from "./auth.actions"
import { ActionType } from "./auth.types"

type AuthState = {
    status: RequestStatus;
    error: string | null;
    user: GeneralObject | null;
}

export const INITIAL_STATE: AuthState = {
    status: 'idle',
    error: null,
    user: null
}

const AuthReducer = (state: AuthState, action: Action): AuthState => {
    switch(action.type) {
        case ActionType.FETCH_ME_START:
            return {
                user: null,
                status: 'pending',
                error: null
            }

        case ActionType.FETCH_ME_SUCCESS:
            return {
                user: action.payload,
                status: 'fulfilled',
                error: null
            }
        
        case ActionType.FETCH_ME_FAILURE:
            return {
                user: null,
                status: 'rejected',
                error: action.payload
            }
        
        default:
            return { ...state };
    }
}

export default AuthReducer;