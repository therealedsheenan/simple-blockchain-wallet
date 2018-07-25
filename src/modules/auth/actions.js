import Api from "../../services/api";

import {
  createRequestTypes,
  createAction,
  REQUEST,
  SUCCESS,
  FAILURE
} from "../utils";

export const POST_AUTH = createRequestTypes("POST_AUTH");

export const auth = {
  postAuthRequest: (username, password) =>
    createAction(POST_AUTH[REQUEST], { username, password }),
  postAuthSuccess: response => createAction(POST_AUTH[SUCCESS], { response }),
  postAuthFailure: error => createAction(POST_AUTH[FAILURE], { error })
};

export const postAuthRequest = (username, password) => async dispatch => {
  if (!username || !password) {
    dispatch(auth.postAuthFailure("Login error."));
  }
  dispatch(auth.postAuthRequest(username, password));
  const { response, error } = await Api({
    method: "post",
    url: "/login",
    data: { username, password }
  });
  console.log(response);
  console.log(error);
  return response
    ? dispatch(auth.postAuthSuccess(response.data))
    : dispatch(auth.postAuthFailure("Invalid credentials."));
};
