let initialState = {};

export default (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case 'ADD_CODE':
      return Object.assign({}, state, payload);
    
    case 'ADD_OUTPUT':
      return Object.assign({}, state, payload);

    default:
      return state;
  }
};