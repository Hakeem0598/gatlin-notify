import { GeneralObject, RequestStatus } from '../../shared/types';
import { ActionType } from './products.types';
import { Action } from './products.actions';

export type ProductsState = {
    status: RequestStatus,
    products: GeneralObject[] | null;
    pagination: GeneralObject | null;
    error: string | null;
}

export const INITIAL_STATE: ProductsState = {
    status: 'idle',
    products: null,
    pagination: null,
    error: null
}

const ProductsReducer = (state: ProductsState, action: Action): ProductsState => {
    switch(action.type) {
        case ActionType.FETCH_PRODUCTS_START:
            return {
                status: 'pending',
                products: null,
                pagination: null,
                error: null
            }
        case ActionType.FETCH_PRODUCTS_SUCCESS:
            return {
                status: 'fulfilled',
                products: action.payload,
                pagination: action.pagination,
                error: null
            }
        case ActionType.FETCH_PRODUCTS_FAILURE:
            return {
                status: 'rejected',
                products: null,
                pagination: null,
                error: action.payload
            }
        default:
            return { ...state }
    }
}

export default ProductsReducer;