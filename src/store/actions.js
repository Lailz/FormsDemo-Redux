const ADD_PERSON = "ADD_PERSON";

export const addPerson = (newPerson) => {
  console.log(
    "🚀 ~ file: actions.js ~ line 4 ~ addPerson ~ newPerson",
    newPerson
  );
  return {
    type: ADD_PERSON,
    payload: { newPerson }, // {newPerson: newPerson}
  };
};
