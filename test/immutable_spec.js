import { List, Map } from 'immutable';
import { expect } from 'chai';

describe('immutability()', () => {
    // Number
    describe('a number', () => {
        function increment(currentState) {
            return currentState + 1;
        }

        it('is immutable', () => {
            let state = 42;
            let nextState = increment(state);

            expect(nextState).to.equal(43);
            expect(state).to.equal(42);
        });
    });

    // List
    describe('A List', () => {
        
        function addMovie(currentState, movie) {
            return currentState.push(movie);
        }

        it('is immutable', () => {
            let state = List.of('Titanic', 'Shutter Island');
            let nextState = addMovie(state, 'Inception');

            expect(nextState).to.equal(List.of(
                'Titanic',
                'Shutter Island',
                'Inception'
            ));
            expect(state).to.equal(List.of(
                'Titanic',
                'Shutter Island'
            ));
        });
    });

    // Map
    describe('A Map', () => {
        
        function addMovie(currentState, movie) {
            // return currentState.set(
            //     'movies',
            //     currentState.get('movies').push(movie)
            // );
            return currentState.update('movies', movies => movies.push(movie));
        }

        it('is immutable', () => {
            let state = Map({
                movies: List.of('Titanic', 'Shutter Island')
            });
            let nextState = addMovie(state, 'Inception');

            expect(nextState).to.equal(Map({
                movies: List.of(
                    'Titanic',
                    'Shutter Island',
                    'Inception'
                )
            }));
            expect(state).to.equal(Map({
                movies: List.of(
                    'Titanic',
                    'Shutter Island'
                )
            }));
        });
    });
});