import { RETRIEVE_SPORTS, ERROR_SPORTS } from "../actions/types";

const initialState = { data: [], error: null };

function sportReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case RETRIEVE_SPORTS:
      return { data: payload, error: null };

    case ERROR_SPORTS:
      return { data: null, error: payload };

    default:
      return state;
  }
};

export default sportReducer;
