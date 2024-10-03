export const SET_ANSWERS = 'SET_ANSWERS';

export const SetAnswersAction = (answers: any) => {
  return {
    type: SET_ANSWERS,
    payload: answers,
  };
};

