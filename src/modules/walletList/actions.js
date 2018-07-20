import axios from "axios";
import {
  createAction,
  createRequestTypes,
  REQUEST,
  FAILURE,
  SUCCESS
} from "../utils";

export const GET_WALLET_LIST = createRequestTypes("GET_WALLET_LIST");

const BASE_API_URL = "http://localhost:8000/api/v1";

export const walletList = {
  getWalletListRequest: () => createAction(GET_WALLET_LIST[REQUEST]),
  getWalletListFailure: error =>
    createAction(GET_WALLET_LIST[FAILURE], { error }),
  getWalletListSuccess: response =>
    createAction(GET_WALLET_LIST[SUCCESS], { response })
};

export const requestWalletListAction = () => async dispatch => {
  dispatch(walletList.getWalletListRequest());
  await axios
    .post(`${BASE_API_URL}/wallet-list`, {
      data: {
        address: "2NEywWXCBcPBkDvDu5C3qRhdXdA65EoQkzi"
      }
    })
    .then(response => {
      console.log(response);
      if (response.status === 200) {
        console.log(response);
        return dispatch(walletList.getWalletListSuccess(response.data));
      }
      return dispatch(walletList.getWalletListFailure("Error fetching data."));
    })
    .catch(error => dispatch(walletList.getWalletListFailure(error)));
};
