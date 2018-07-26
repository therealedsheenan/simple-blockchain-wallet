import Api from "../../services/api";

import {
  createAction,
  createRequestTypes,
  REQUEST,
  FAILURE,
  SUCCESS
} from "../utils";

export const POST_SEND_BITCOIN = createRequestTypes("POST_SEND_BITCOIN");

export const bitcoin = {
  postSendBitcoinRequest: () => createAction(POST_SEND_BITCOIN[REQUEST]),
  postSendBitcoinFailure: () => createAction(POST_SEND_BITCOIN[FAILURE]),
  postSendBitcoinSuccess: () => createAction(POST_SEND_BITCOIN[SUCCESS])
};

export const postSendBitcoinRequest = (
  walletId,
  walletPass,
  destination,
  amount
) => async dispatch => {
  dispatch(bitcoin.postSendBitcoinRequest());
  const { response, error } = await Api({
    method: "post",
    url: "/send",
    data: {
      walletId,
      walletPass,
      destination,
      amount
    }
  });
  return response
    ? dispatch(bitcoin.postSendBitcoinSuccess(response.data))
    : dispatch(bitcoin.postSendBitcoinFailure(error));
};
