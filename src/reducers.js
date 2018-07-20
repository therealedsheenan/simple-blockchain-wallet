import { combineReducers } from "redux";

import wallet from "./modules/wallet/reducer";
import walletList from "./modules/walletList/reducer";

export default combineReducers({ wallet, walletList });
