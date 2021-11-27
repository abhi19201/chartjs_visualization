import Axios from "axios";
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


//get Metrics
export const getMetrics =
    (measure = "", currentPage = 1) =>
    async (dispatch) => {
        try {
            dispatch({ type: METRICS_REQUEST });
            let link = `http://localhost:8000/api/metrics?measure=${measure}&page=${currentPage}`;

            const { data } = await Axios.get(link);
            dispatch({
                type: METRICS_REQUEST_SUCCESS,
                payload: data,
            });
            dispatch(storeMetrics(data.metrics, currentPage));
        } catch (error) {
            dispatch({
                type: METRICS_REQUEST_FAIL,
                payload: error.message,
            });
        }
    };


//get list of Measures
export const getMeasures = () => async (dispatch) => {
    try {
        dispatch({ type: MEASURES_REQUEST });
        let link = `http://localhost:8000/api/metrics/measures`;

        const {data} = await Axios.get(link);

        dispatch({
            type: MEASURES_REQUEST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: MEASURES_REQUEST_FAIL,
            payload: error.message,
        });
    }
};


//Change Page Number
export const changePage = (currentPage = 1) => {
    return {
        type: PAGE_CHANGE,
        payload: currentPage,
    };
};


//Store Metrics
export const storeMetrics = (metrics = [], page = 1) => {
    if (page === 1)
        return {
            type: STORE_METRICS,
            payload: metrics,
        };
    else
        return {
            type: ADD_TO_METRICS,
            payload: metrics,
        };
};
