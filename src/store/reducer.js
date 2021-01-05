import people from "../people";

const initialState = {
  people: people,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PERSON":
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default postReducer;
