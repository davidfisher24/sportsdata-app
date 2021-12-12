import { RETRIEVE_OUTCOMES, ERROR_OUTCOMES } from "../actions/types";

const initialState = { data: [], error: null };

function outcomeReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case RETRIEVE_OUTCOMES:
      return { data: payload, error: null };

    case ERROR_OUTCOMES:
      return { data: null, error: payload };

    default:
      return state;
  }
};

export default outcomeReducer;
