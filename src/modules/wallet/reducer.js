import { REQUEST, FAILURE, SUCCESS } from "../utils";

import { GET_WALLET, POST_SEND_BITCOIN } from "./actions";

export const walletInitialState = {
  data: {},
  error: null,
  isLoading: false
};

const wallet = (state = walletInitialState, action) => {
  const { type } = action;
  switch (type) {
    case GET_WALLET[REQUEST]:
      return {
        ...state,
        isLoading: true
      };
    case GET_WALLET[FAILURE]:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case GET_WALLET[SUCCESS]:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          ...action.response.wallet
        }
      };
    case POST_SEND_BITCOIN[REQUEST]:
      return {
        ...state,
        isLoading: true
      };
    case POST_SEND_BITCOIN[FAILURE]:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case POST_SEND_BITCOIN[SUCCESS]:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default wallet;
