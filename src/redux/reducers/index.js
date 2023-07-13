import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";

/*Antes
export default combineReducers({
    cartReducer: cartReducer
});

*/

//Ahora
const rootReducer = combineReducers({
    cartReducer: cartReducer
});

export default rootReducer;

