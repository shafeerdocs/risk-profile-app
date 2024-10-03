import {  SET_ANSWERS } from './actions';

interface State {
    answers: any; 
}

const initialState: State = {
    answers: {},
};

const reducer = (state = initialState, action: any): State => {
    switch (action.type) {
        case SET_ANSWERS:
          return {
            ...state,
            answers: action.payload,
          };
        default:
          return state;
      }
};

export default reducer;
