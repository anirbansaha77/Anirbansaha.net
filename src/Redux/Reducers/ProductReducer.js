import { UPDATE_PRODUCT } from '../Actions/ActionTypes';

// initial reducer state
const initialState = {
    name: 'Product reducer',
};

// default reducer function
export default function ProductReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_PRODUCT:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}
