import { REQUEST, FAILURE, SUCCESS } from "../utils";

import { GET_WALLET_LIST, GET_WALLET } from "./actions";

export const walletInitialState = {
  data: {},
  error: null
};

const walletList = (state = walletInitialState, action) => {
  const { type } = action;
  switch (type) {
    case GET_WALLET[REQUEST]:
      const { walletId } = action;
      const loadingWallet = { ...state.data[walletId] };

      return {
        ...state,
        data: { ...state.data, [walletId]: loadingWallet }
      };
    case GET_WALLET[FAILURE]:
      const walletData = { ...state.data[action.walletId] };
      return {
        ...state,
        data: {
          ...state.data,
          [action.walletId]: { ...walletData, error: action.error }
        }
      };
    case GET_WALLET[SUCCESS]:
      const { response } = action;
      const oldWallet = state.data[action.walletId] || {};
      const loadedWallet = {
        ...oldWallet,
        ...response.wallet
      };
      const newWallet = {
        ...state.data,
        [action.walletId]: {
          ...loadedWallet,
          error: null
        }
      };

      return {
        ...state,
        data: newWallet
      };
    case GET_WALLET_LIST[REQUEST]:
      return {
        ...state
      };
    case GET_WALLET_LIST[FAILURE]:
      return {
        ...state,
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
