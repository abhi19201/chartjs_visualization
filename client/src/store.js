import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    allMetricsReducer,
    pageReducer,
    storeMetricsReducer,
    measureReducer,
} from "./Reducers/Reducer";

const reducer = combineReducers({
    metrics: allMetricsReducer,
    page: pageReducer,
    storedMetrics: storeMetricsReducer,
    measures: measureReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
