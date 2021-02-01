import people from "../people";

const initialState = {
  people: people,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PERSON":
      return {
        ...state,
        people: [...state.people, action.payload.newPerson],
      };
    default:
      return state;
  }
};

export default postReducer;
