import { combineReducers } from "redux";
import authReducer from "./authSlice";
// import userReducer from "./userSlice";

const rootReducer = combineReducers({
  auth: authReducer,
//   user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
