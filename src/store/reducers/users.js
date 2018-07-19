let initialState = {};

export default (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {

    case 'ADD_USER':
      return Object.assign({}, state, payload);
    
    case 'ADD_ASSIGNMENT':
      let assignments = state.assignments;
      assignments.push(payload);
      return Object.assign({}, state, {assignments});
      
    default:
      return state;
  }
};