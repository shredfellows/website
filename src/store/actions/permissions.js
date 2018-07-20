export const loggedInStatus = payload => {
  return {
    type: "LOGIN_STATUS",
    payload: payload
  };
};