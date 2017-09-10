import { List } from 'immutable';

export const setEntries = (state, entries) => {
    return state.set('entries', List(entries));
}