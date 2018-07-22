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
export const POST_SEND_BITCOIN = createRequestTypes("POST_SEND_BITCOIN");

export const wallet = {
  getWalletRequest: () => createAction(GET_WALLET[REQUEST]),
  getWalletFailure: error => createAction(GET_WALLET[FAILURE], { error }),
  getWalletSuccess: response => createAction(GET_WALLET[SUCCESS], { response }),

  // post wallet bitcion
  postSendBitcoinRequest: walletId =>
    createAction(POST_SEND_BITCOIN[REQUEST], { walletId }),
  postSendBitcoinFailure: error =>
    createAction(POST_SEND_BITCOIN[FAILURE], { error }),
  postSendBitcoinSuccess: response =>
    createAction(POST_SEND_BITCOIN[SUCCESS], { response })
};

export const postSendBitcoinRequest = (
  walletId, // sender info
  walletPass, // sender info
  destination,
  amount
) => async dispatch => {
  dispatch(wallet.postSendBitcoinRequest(walletId));
  await axios
    .post(`${BASE_API_URL}/send-bitcoin`, {
      data: {
        walletId,
        walletPass,
        destination,
        amount
      }
    })
    .then(response => {
      if (response.status === 200) {
        return dispatch(wallet.postSendBitcoinSuccess(response));
      }
      return dispatch(wallet.postSendBitcoinFailure("Error sending bitcoin."));
    })
    .catch(error => dispatch(wallet.postSendBitcoinFailure(error)));
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
