import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './index';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore();

let mockApiReturnValue;

jest.mock("../http-common", () => ({
   ...jest.requireActual("../http-common"),
   get: () => mockApiReturnValue()
}));

describe('sports actions', () => {

    beforeEach(() => {
        store.clearActions();
    });

    it('dispatches RETRIEVE_SPORTS after a successful API request', async () => {
        mockApiReturnValue = () =>  ({ data: [{ id: 1, desc: 'football' }] })
        await store.dispatch(actions.retrieveSports())
        expect(store.getActions()).toEqual([{
            type: 'RETRIEVE_SPORTS',
            payload: [{ id: 1, desc: 'football' }] 
        }])
    });

    it('dispatches ERROR_SPORTS after a failed API request', async () => {
        mockApiReturnValue = () => { throw new Error('something went wrong') }
        await store.dispatch(actions.retrieveSports())
        expect(store.getActions()).toEqual([{
            type: 'ERROR_SPORTS',
            payload: Error('something went wrong')
        }])
    });

    it('dispatches RETRIEVE_EVENTS after a successful API request', async () => {
        mockApiReturnValue = () =>  ({ data: [{ id: 1, desc: 'Real Madrid vs Barcelona' }] })
        await store.dispatch(actions.retrieveEvents())
        expect(store.getActions()).toEqual([{
            type: 'RETRIEVE_EVENTS',
            payload: [{ id: 1, desc: 'Real Madrid vs Barcelona' }] 
        }])
    });

    it('dispatches ERROR_EVENTS after a failed API request', async () => {
        mockApiReturnValue = () => { throw new Error('something went wrong') }
        await store.dispatch(actions.retrieveEvents())
        expect(store.getActions()).toEqual([{
            type: 'ERROR_EVENTS',
            payload: Error('something went wrong')
        }])
    });

    it('dispatches RETRIEVE_OUTCOMES after a successful API request', async () => {
        mockApiReturnValue = () =>  ({ data: [
            { id: 1, desc: 'home'},
            { id: 2, desc: 'away'},
            { id: 3, desc: 'draw'},
        ]})
        await store.dispatch(actions.retrieveOutcomes())
        expect(store.getActions()).toEqual([{
            type: 'RETRIEVE_OUTCOMES',
            payload: [
                { id: 1, desc: 'home'},
                { id: 2, desc: 'away'},
                { id: 3, desc: 'draw'},
            ] 
        }])
    });

    it('dispatches ERROR_OUTCOMES after a failed API request', async () => {
        mockApiReturnValue = () => { throw new Error('something went wrong') }
        await store.dispatch(actions.retrieveOutcomes())
        expect(store.getActions()).toEqual([{
            type: 'ERROR_OUTCOMES',
            payload: Error('something went wrong')
        }])
    });
});