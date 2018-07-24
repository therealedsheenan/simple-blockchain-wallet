import { REQUEST, FAILURE, SUCCESS } from "../utils";
import { POST_AUTH } from "./actions";

export const authInitialState = {
  data: {
    isAuthenticated: false,
    profile: {}
  },
  error: null,
  isLoading: false
};

const auth = (state = authInitialState, action) => {
  switch (action.type) {
    case POST_AUTH[REQUEST]:
      return {
        ...state,
        isLoading: true
      };
    case POST_AUTH[FAILURE]:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case POST_AUTH[SUCCESS]:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: {
          isAuthenticated: !!action.response,
          profile: action.response
        }
      };
    default:
      return state;
  }
};

export default auth;
