export const addUser = payload => {
  return {
    type: "ADD_USER",
    payload: payload
  };
};

export const addAssignment = payload => {
  return {
    type: 'ADD_ASSIGNMENT',
    payload: payload
  };
}