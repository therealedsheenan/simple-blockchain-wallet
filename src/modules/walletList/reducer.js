import { REQUEST, FAILURE, SUCCESS } from "../utils";

import { GET_WALLET_LIST } from "./actions";

export const walletInitialState = {
  data: [],
  error: null,
  isLoading: false
};

const walletList = (state = walletInitialState, action) => {
  const { type } = action;
  switch (type) {
    case GET_WALLET_LIST[REQUEST]:
      return {
        ...state,
        isLoading: true
      };
    case GET_WALLET_LIST[FAILURE]:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case GET_WALLET_LIST[SUCCESS]:
      return {
        ...state,
        isLoading: false,
        data: [...state.data, ...action.response.wallets]
      };

    default:
      return state;
  }
};

export default walletList;
