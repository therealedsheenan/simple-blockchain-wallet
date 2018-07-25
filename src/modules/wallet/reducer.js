import { REQUEST, FAILURE, SUCCESS } from "../utils";

import { GET_WALLET_LIST, GET_WALLET } from "./actions";

export const walletInitialState = {
  data: {},
  error: null,
  isLoading: false
};

const walletList = (state = walletInitialState, action) => {
  const { type } = action;
  switch (type) {
    case GET_WALLET[REQUEST]:
      const { walletId } = action;
      const loadingWallet = { ...state.data[walletId], loading: true };

      return {
        ...state,
        isLoading: true,
        data: { ...state.data, [walletId]: loadingWallet }
      };
    case GET_WALLET[SUCCESS]:
      const { response } = action;
      const oldWallet = state.data[action.walletId] || {};
      const loadedWallet = {
        ...oldWallet,
        ...response.wallet,
        loading: false
      };
      const newWallet = { ...state.data, [action.walletId]: loadedWallet };

      return {
        ...state,
        isLoading: true,
        data: newWallet
      };
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
      const walletsList = action.response.wallets.reduce(
        (acc, wallet) => ({
          ...acc,
          [wallet.id]: wallet
        }),
        {}
      );
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          ...walletsList
        }
      };

    default:
      return state;
  }
};

export default walletList;
