import {
    METRICS_REQUEST,
    METRICS_REQUEST_SUCCESS,
    METRICS_REQUEST_FAIL,
    PAGE_CHANGE,
    STORE_METRICS,
    ADD_TO_METRICS,
    MEASURES_REQUEST,
    MEASURES_REQUEST_SUCCESS,
    MEASURES_REQUEST_FAIL,
} from "../Constants/constants";

export const allMetricsReducer = (state = { metrics: [] }, action) => {
    switch (action.type) {
        case METRICS_REQUEST:
            return {
                loading: true,
                metrics: [],
            };
        case METRICS_REQUEST_SUCCESS:
            return {
                loading: false,
                metrics: action.payload.metrics,
                numOfPages: action.payload.numOfPages,
                numOfMetrics: action.payload.numOfMetrics,
                numOfFilteredMetrics: action.payload.numOfFilteredMetrics,
            };
        case METRICS_REQUEST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};


export const measureReducer = (state = { measures: [] }, action) => {
    switch (action.type) {
        case MEASURES_REQUEST:
            return {
                loading: true,
                measures: [],
            };
        case MEASURES_REQUEST_SUCCESS:
            return {
                loading: false,
                measures: action.payload.Measures,
            };
        case MEASURES_REQUEST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};


export const pageReducer = (state = { page: 1 }, action) => {
    if (action.type === PAGE_CHANGE)
        return {
            page: action.payload,
        };
    else return state;
};

export const storeMetricsReducer = (state = { storedMetrics: [] }, action) => {

    if (action.type === STORE_METRICS)
        return {
            storedMetrics: action.payload,
        };
    else if (action.type === ADD_TO_METRICS)
        return {
            storedMetrics: [...state.storedMetrics, ...action.payload],
        };
    else return state;
};
