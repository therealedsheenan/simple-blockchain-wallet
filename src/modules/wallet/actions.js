import axios from "axios";

import {
  createRequestTypes,
  createAction,
  REQUEST,
  SUCCESS,
  FAILURE
} from "../utils";

const BASE_API_URL = "http://localhost:8000/api/v1";

export const GET_WALLET = createRequestTypes("GET_WALLET");

export const wallet = {
  getWalletRequest: () => createAction(GET_WALLET[REQUEST]),
  getWalletFailure: error => createAction(GET_WALLET[FAILURE], { error }),
  getWalletSuccess: response => createAction(GET_WALLET[SUCCESS], { response })
};

export const requestWalletAction = walletId => async dispatch => {
  dispatch(wallet.getWalletRequest(walletId));
  await axios
    .post(`${BASE_API_URL}/wallet-info`, {
      data: {
        address: walletId
      }
    })
    .then(response => {
      if (response.status === 200) {
        return dispatch(wallet.getWalletSuccess(response.data));
      }
      return dispatch(wallet.getWalletFailure("Error fetching data."));
    })
    .catch(error => dispatch(wallet.getWalletFailure(error)));
};
