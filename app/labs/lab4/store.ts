import { configureStore } from "@reduxjs/toolkit";
import helloReducer from "../lab4/redux/hello/hello-reducer";
import counterReducer from "../lab4/redux/counter-redux/counter-reducer";
import addReducer from "../lab4/redux/add-redux/add-reducer";
import todosReducer from "./redux/todos/todos-reducer";


const store = configureStore({
    reducer: {
        helloReducer,
        counterReducer,
        addReducer,
        todosReducer,
    }
});
export type RootState = ReturnType<typeof store.getState>;
export default store;

