import { FETCH_PEOPLE } from "../actions/actionTypes";

const initialState = {
  people: []
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PEOPLE:
      return {
        ...state,
        people: action.payload
      };
    default:
      return state;
  }
};

export default postReducer;
