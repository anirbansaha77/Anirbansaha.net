import { UPDATE_APP } from '../Actions/ActionTypes';

// initial reducer state
const initialState = {
    name: 'App',
};

// default reducer function
export default function AppReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_APP:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}
