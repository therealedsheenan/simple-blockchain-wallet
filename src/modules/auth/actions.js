import axios from "axios";
import Api from "../../services/api";

import {
  createRequestTypes,
  createAction,
  REQUEST,
  SUCCESS,
  FAILURE
} from "../utils";

const BASE_API_URL = "http://localhost:8000/api/v1";

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
  const { response, error } = Api({
    url: "/login",
    data: { username, password }
  });
  if (response) {
    // localStorage.setItem("bitgo-token", response.token);
    return dispatch(auth.postAuthSuccess(response));
  } else {
    console.log(error);
    dispatch(auth.postAuthFailure(error));
  }
  // return axios
  //   .post(`${BASE_API_URL}/login`, {
  //     username,
  //     password
  //   })
  //   .then(response => {
  //     if (response.status === 200) {
  //       return dispatch(auth.postAuthSuccess(response));
  //     }
  //     return dispatch(auth.postAuthFailure("Error signing in."));
  //   })
  //   .catch(error => dispatch(auth.postAuthFailure(error)));
};
