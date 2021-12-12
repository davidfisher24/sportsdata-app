import { render, cleanup } from '../test-utils'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import SportsList from './sports.component'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Sports List Component', () => {
  let store; 

  afterEach(() => {
    cleanup() 
  })

  it('matches snapshot', () => {
    store = mockStore({ 
        sports: {
          data: [
            {id: 1, desc: 'Football'},
            {id: 2, desc: 'Tennis'},
          ],
          error: null
        }
    });
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
            <SportsList />
        </BrowserRouter>
      </Provider>
    );
    expect(component.container).toMatchSnapshot()
  });

  it('renders error on error data', () => {
    store = mockStore({ 
        sports: {
          data: null,
          error: new Error
        }
    });
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
            <SportsList />
        </BrowserRouter>
      </Provider>
    );
    expect(getByTestId("error-container")).toBeTruthy();
  });
});