import { render, cleanup } from '../test-utils'
import { Provider } from 'react-redux'
import Router, { BrowserRouter } from "react-router-dom";
import OutcomesList from './outcomes.component'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn(),
}));

describe('Outcomes List Component', () => {
  let store; 

  afterEach(() => {
    cleanup() 
  })

  it('matches snapshot', () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ sportId: '1', eventId: '1' })
    store = mockStore({ 
        events: {
          data: [
            {id: 1, desc: 'Real Madrid vs Barcelona'},
            {id: 2, desc: 'Liverpool vs Arsenal'}
          ],
          error: null
        },
        outcomes: {
          data: [
            {cpid: 1, keyDimension: 'Draw', pr: '5/4', fdp: 1.2},
            {cpid: 2, keyDimension: 'Home', pr: '1/2', fdp: 0.5},
            {cpid: 3, keyDimension: 'Away', pr: '6/1', fdp: 6},
          ],
          error: null
        }
    });
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
            <OutcomesList />
        </BrowserRouter>
      </Provider>
    );
    expect(component.container).toMatchSnapshot()
  });

  it('renders correct event based on params', () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ sportId: '1', eventId: '1' })
    store = mockStore({ 
        events: {
          data: [
            {id: 1, desc: 'Real Madrid vs Barcelona'},
            {id: 2, desc: 'Liverpool vs Arsenal'}
          ],
          error: null
        },
        outcomes: {
          data: [
            {cpid: 1, keyDimension: 'Draw', pr: '5/4', fdp: 1.2},
            {cpid: 2, keyDimension: 'Home', pr: '1/2', fdp: 0.5},
            {cpid: 3, keyDimension: 'Away', pr: '6/1', fdp: 6},
          ],
          error: null
        }
    });
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
            <OutcomesList />
        </BrowserRouter>
      </Provider>
    );
    expect(getByTestId("event-title")).toBeTruthy()
    expect(getByText(/- Real Madrid vs Barcelona/i)).toBeTruthy();
  });

  it('does not render event if not available based on params', () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ sportId: '1', eventId: '3' })
    store = mockStore({ 
        events: {
          data: [
            {id: 1, desc: 'Real Madrid vs Barcelona'},
            {id: 2, desc: 'Liverpool vs Arsenal'}
          ],
          error: null
        },
        outcomes: {
          data: [
            {cpid: 1, keyDimension: 'Draw', pr: '5/4', fdp: 1.2},
            {cpid: 2, keyDimension: 'Home', pr: '1/2', fdp: 0.5},
            {cpid: 3, keyDimension: 'Away', pr: '6/1', fdp: 6},
          ],
          error: null
        }
    });
    const { queryByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
            <OutcomesList />
        </BrowserRouter>
      </Provider>
    );
    expect(queryByTestId(/event-title/i)).toBeNull();
  });

  it('renders key dimension of event if available', () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ sportId: '1', eventId: '1' })
    store = mockStore({ 
        events: {
          data: [{id: 1, desc: 'Real Madrid vs Barcelona'},],
          error: null
        },
        outcomes: {
          data: [
            {cpid: 1, keyDimension: 'Draw', pr: '5/4', fdp: 1.2},
            {cpid: 2, keyDimension: 'Home', pr: '1/2', fdp: 0.5},
            {cpid: 3, keyDimension: 'Away', pr: '6/1', fdp: 6},
          ],
          error: null
        }
    });
    const { getAllByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
            <OutcomesList />
        </BrowserRouter>
      </Provider>
    );
    expect(getAllByTestId("key-dimension").length).toBe(3)
  });

  it('does not render key dimension of event if not available', () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ sportId: '1', eventId: '1' })
    store = mockStore({ 
        events: {
          data: [{id: 1, desc: 'Abu Dhabi Grand Prix'},],
          error: null
        },
        outcomes: {
          data: [
            {cpid: 1, d: 'Lewis Hamilton', pr: '5/4', fdp: 1.2},
            {cpid: 2, d: 'Max Verstappen', pr: '1/2', fdp: 0.5},
            {cpid: 3, d: 'Fernando Alonso', pr: '6/1', fdp: 6},
          ],
          error: null
        }
    });
    const { queryByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
            <OutcomesList />
        </BrowserRouter>
      </Provider>
    );
    expect(queryByTestId(/key-dimension/i)).toBeNull();
  });

  it('renders error on error data', () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ sportId: '1', eventId: '1' })
    store = mockStore({ 
        outcomes: {
          data: null,
          error: new Error
        },
        events: {
          data: [],
          error: null
        }
    });
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
            <OutcomesList />
        </BrowserRouter>
      </Provider>
    );
    expect(getByTestId("error-container")).toBeTruthy();
  });
});