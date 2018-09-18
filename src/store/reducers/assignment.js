let initialState = {};

export default (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
  case 'SET_ASSIGNMENT':
    return Object.assign({}, state, payload);
      
  default:
    return state;
  }
};