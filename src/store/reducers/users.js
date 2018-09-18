let initialState = {};

// TODO: REFACTOR THESE AND DO THEM THE RIGHT WAY

export default (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {

    case 'ADD_USER':
      return Object.assign({}, state, payload);
    
    case 'ADD_ASSIGNMENT': {
      let assignments = state.assignments;
      assignments.push(payload);
      return Object.assign({}, state, {assignments});
    }
    case 'ADD_CODE_TO_USER': {
      let {assignmentName, code} = payload;
      let assignment = state.assignments.filter(single => single.assignmentName === assignmentName)[0];
      assignment.code = code;
      return Object.assign({}, state, assignment.code);
    }
    case 'ADD_NOTE_TO_USER': {
      let { assignName, notes } = payload;
      let singleAssignment = state.assignments.filter(single => single.assignmentName === assignName)[0];
      singleAssignment.notes = notes;
      return Object.assign({}, state, singleAssignment);
    }
    default:
      return state;
  }
};