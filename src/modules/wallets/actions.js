import { createAction } from "../utils";

export const GET_WALLET = "GET_WALLET";

export const wallets = {
  postAnswer: () => createAction(GET_WALLET, { qIndex, ans, isCorrect })
};

export const requestAnswerAction = (qIndex, ans) => async (
  dispatch,
  getState
) => {
  const questionsData = getState().questions.data;
  const isCorrect = questionsData[qIndex].correct_answer.toLowerCase() === ans;
  await dispatch(answer.postAnswer(qIndex, ans, isCorrect));
};
