export const REQUEST = "REQUEST";
export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";
export const RESET = "RESET";

export const createRequestTypes = base =>
  [REQUEST, SUCCESS, FAILURE, RESET].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});

export const createAction = (type, payload = {}) => ({ type, ...payload });
