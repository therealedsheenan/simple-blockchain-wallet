import axios from "axios";
import {
  createAction,
  createRequestTypes,
  REQUEST,
  FAILURE,
  SUCCESS
} from "../utils";

export const GET_WALLET_LIST = createRequestTypes("GET_WALLET_LIST");
export const GET_WALLET = createRequestTypes("GET_WALLET");

const BASE_API_URL = "http://localhost:8000/api/v1";

export const wallet = {
  // individual wallet
  getWalletRequest: walletId => createAction(GET_WALLET[REQUEST], { walletId }),
  getWalletFailure: error => createAction(GET_WALLET[FAILURE], { error }),
  getWalletSuccess: (walletId, response) =>
    createAction(GET_WALLET[SUCCESS], { response, walletId }),

  // wallet list
  getWalletListRequest: () => createAction(GET_WALLET_LIST[REQUEST]),
  getWalletListFailure: error =>
    createAction(GET_WALLET_LIST[FAILURE], { error }),
  getWalletListSuccess: response =>
    createAction(GET_WALLET_LIST[SUCCESS], { response })
};

export const requestWalletListAction = () => async dispatch => {
  dispatch(wallet.getWalletListRequest());
  await axios
    .post(`${BASE_API_URL}/wallet-list`)
    .then(response => {
      if (response.status === 200) {
        return dispatch(wallet.getWalletListSuccess(response.data));
      }
      return dispatch(wallet.getWalletListFailure("Error fetching data."));
    })
    .catch(error => dispatch(wallet.getWalletListFailure(error)));
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
        return dispatch(wallet.getWalletSuccess(walletId, response.data));
      }
      return dispatch(wallet.getWalletFailure("Error fetching data."));
    })
    .catch(error => {
      console.log(error);
      return dispatch(wallet.getWalletFailure(error));
    });
};
