import { RETRIEVE_EVENTS, ERROR_EVENTS } from "../actions/types";

const initialState = { data: [], error: null };

function eventReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case RETRIEVE_EVENTS:
      return { data: payload, error: null };

    case ERROR_EVENTS:
      return { data: null, error: payload };
      
    default:
      return state;
  }
};

export default eventReducer;
