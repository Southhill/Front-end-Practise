import { Map, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
    it('handle setEntries', () => {
        const initialState = Map();
        const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            entries: ['Trainspotting']
        }));
    });

    it('handle an  initialState', () => {
        const initialState = Map();
        const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
        const nextState = reducer(undefined, action);
        expect(nextState).to.equal(fromJS({
            entries: ['Trainspotting']
        }));
    });

    it('handle next', () => {
        const initialState = fromJS({
            entries: ['Trainspotting', '28 Days Later']
        });
        const action = {type: 'NEXT'};
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later']
            },
            entries: []
        }));
    });

    it('handle vote', () => {
        const initialState = fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later']
            },
            entries: []
        });
        const action = {type: 'VOTE', entry: 'Trainspotting'};
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {
                    Trainspotting: 1
                }
            },
            entries: []
        }));
    });
})
