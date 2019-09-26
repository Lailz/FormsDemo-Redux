import { FETCH_PEOPLE } from "./actionTypes";

import axios from "axios";

export const fetchPeople = () => {
  return async dispatch => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/alias/");
      const people = res.data;
      dispatch({
        type: FETCH_PEOPLE,
        payload: people
      });
    } catch (error) {
      console.error("Something went wrong while fetching people");
      console.error(error);
    }
  };
};

export const submitPerson = data => {};
