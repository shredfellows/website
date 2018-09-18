let initialState = false;

export default (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
  case 'LOGIN_STATUS':
    return true;
      
  default:
    return state;
  }
};