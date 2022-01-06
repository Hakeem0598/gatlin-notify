import { GeneralObject, RequestStatus } from '../../shared/types';
import { ActionType } from './users.types';
import { Action } from './users.actions';

export type UsersState = {
    status: RequestStatus,
    users: GeneralObject[] | null;
    pagination: GeneralObject | null;
    error: string | null;
}

export const INITIAL_STATE: UsersState = {
    status: 'idle',
    users: null,
    pagination: null,
    error: null
}

const UsersReducer = (state: UsersState, action: Action): UsersState => {
    switch(action.type) {
        case ActionType.FETCH_USERS_START:
            return {
                status: 'pending',
                users: null,
                pagination: null,
                error: null
            }
        case ActionType.FETCH_USERS_SUCCESS:
            return {
                status: 'fulfilled',
                users: action.payload,
                pagination: action.pagination,
                error: null
            }
        case ActionType.FETCH_USERS_FAILURE:
            return {
                status: 'rejected',
                users: null,
                pagination: null,
                error: action.payload
            }
        default:
            return { ...state }
    }
}

export default UsersReducer;