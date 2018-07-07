import { UPDATE_APP } from './ActionTypes';

export function updateApp(payload) {
    return { type: UPDATE_APP, payload };
}