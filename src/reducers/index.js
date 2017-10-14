import { combineReducers } from 'redux';
import todolistReducer from "./todolistReducer";

export default combineReducers({
    todolist : todolistReducer
});