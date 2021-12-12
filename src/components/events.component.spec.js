import { render, cleanup } from '../test-utils'
import { Provider } from 'react-redux'
import Router, { BrowserRouter } from "react-router-dom";
import EventsList from './events.component'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn(),
}));

describe('Events List Component', () => {
  let store; 

  afterEach(() => {
    cleanup() 
  })

  it('matches snapshot', () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ sportId: '1' })
    store = mockStore({ 
        sports: {
          data: [
            {id: 1, desc: 'Football'},
            {id: 2, desc: 'Tennis'},
          ],
          error: null
        },
        events: {
          data: [
            {id: 1, desc: 'Real Madrid vs Barcelona'},
            {id: 2, desc: 'Liverpool vs Arsenal'}
          ],
          error: null
        }
    });
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
            <EventsList />
        </BrowserRouter>
      </Provider>
    );
    expect(component.container).toMatchSnapshot()
  });

  it('renders correct sport based on params', () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ sportId: '1' })
    store = mockStore({ 
        events: {
          data: [{ id: '1', desc: 'Real Madrid vs Barcelona' }],
          error: null
        },
        sports: {
          data: [{ id: 1, desc: 'Football' }, { id: 2, desc: 'Tennis' }],
          error: null
        }
    });
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
            <EventsList />
        </BrowserRouter>
      </Provider>
    );
    expect(getByTestId("sports-title")).toBeTruthy()
    expect(getByText(/- Football/i)).toBeTruthy();
  });

  it('does not render sport if not available based on params', () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ sportId: '3' })
    store = mockStore({ 
        events: {
          data: [{ id: '1', desc: 'Real Madrid vs Barcelona' }],
          error: null
        },
        sports: {
          data: [{ id: 1, desc: 'Football' }, { id: 2, desc: 'Tennis' }],
          error: null
        }
    });
    const { queryByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
            <EventsList />
        </BrowserRouter>
      </Provider>
    );
    expect(queryByTestId(/sports-title/i)).toBeNull();
  });

  it('renders error on error data', () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ sportId: '1' })
    store = mockStore({ 
        events: {
          data: null,
          error: new Error
        },
        sports: {
          data: [],
          error: null
        }
    });
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
            <EventsList />
        </BrowserRouter>
      </Provider>
    );
    expect(getByTestId("error-container")).toBeTruthy();
  });
});