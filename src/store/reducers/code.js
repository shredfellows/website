let initialState = {};

export default (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case 'ADD_CODE':
      // let token = users[payload] ? users[payload].token : users.default.token;
      // console.log('Token', token);
      // let userData = decode(token);
      return userData;
    default:
      return state;
  }
};