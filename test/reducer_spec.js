import { Map, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

    it('handles SET_ENTRIES', () => {
        const initialState = Map();
        const action = {type: 'SET_ENTRIES', entries: ['Titanic']};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            entries: ['Titanic']
        }));
    });

    it('handles NEXT', () => {
        const initialState = fromJS({
            entries: ['Titanic', 'Shutter Island']
        });
        const action = {type: 'NEXT'};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Titanic', 'Shutter Island']
            },
            entries: []
        }));
    });

    it('handles VOTE', () => {
        const initialState = fromJS({
            vote: {
                pair: ['Titanic', 'Shutter Island']
            },
            entries: []
        });
        const action = {type: 'VOTE', entry: 'Titanic'};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Titanic', 'Shutter Island'],
                tally: {Titanic: 1}
            },
            entries: []
        }));
    });

    it('has an initital state', () => {
        const action = {type: 'SET_ENTRIES', entries: ['Titanic']};
        const nextState = reducer(undefined, action);
        expect(nextState).to.equal(fromJS({
            entries: ['Titanic']
        }));
    });

    it('can be used with reduce', () => {
        const actions = [
            {type: 'SET_ENTRIES', entries: ['Titanic', 'Shuter Island']},
            {type: 'NEXT'},
            {type: 'VOTE', entry: 'Titanic'},
            {type: 'VOTE', entry: 'Shutter Island'},
            {type: 'VOTE', entry: 'Titanic'},
            {type: 'NEXT'}
        ];
        const finalState = actions.reduce(reducer, Map());

        expect(finalState).to.equal(fromJS({
            winner: 'Titanic'
        }));
    });

});