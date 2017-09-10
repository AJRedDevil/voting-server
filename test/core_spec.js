import { List, Map } from 'immutable';
import { expect } from 'chai';

import { setEntries, next } from '../src/core';

describe('application logic', () => {

    describe('set Entries', () => {

        it('adds the entries to the state', () => {
            const state = Map();
            const entries = List.of('Titanic', 'Shutter Island');
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                entries: List.of('Titanic', 'Shutter Island')
            }));
        });

        it('converts to immutable', () => {
            const state = Map();
            const entries = ['Titanic', 'Shutter Island'];
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                entries: List.of('Titanic', 'Shutter Island')
            }));
        });
    });

    describe('next', () => {

        it('takes the next two entries under vote', () => {
            const state = Map({
                entries: List.of('Titanic', 'Shutter Island', 'Inception')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Titanic', 'Shutter Island')
                }),
                entries: List.of('Inception')
            }));
        });
    });

});