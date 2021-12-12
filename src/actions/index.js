import {
  RETRIEVE_SPORTS,
  RETRIEVE_OUTCOMES,
  RETRIEVE_EVENTS,
  ERROR_SPORTS,
  ERROR_EVENTS,
  ERROR_OUTCOMES
} from "./types";

import ApiService from "../services/api.service";

export const retrieveSports = () => async (dispatch) => {
  try {
    const res = await ApiService.getSports();

    dispatch({
      type: RETRIEVE_SPORTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR_SPORTS,
      payload: err,
    });
  }
};

export const retrieveEvents = (sportId) => async (dispatch) => {
  try {
    const res = await ApiService.getEvents(sportId);

    dispatch({
      type: RETRIEVE_EVENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR_EVENTS,
      payload: err,
    });
  }
};

export const retrieveOutcomes = (sportId, eventId) => async (dispatch) => {
  try {
    const res = await ApiService.getOutcomes(sportId, eventId);

    dispatch({
      type: RETRIEVE_OUTCOMES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR_OUTCOMES,
      payload: err,
    });
  }
};

