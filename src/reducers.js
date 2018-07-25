import { combineReducers } from "redux";

import wallet from "./modules/wallet/reducer";
import auth from "./modules/auth/reducer";
import loading from "./modules/loading/reducer";

export default combineReducers({ loading, wallet, auth });
