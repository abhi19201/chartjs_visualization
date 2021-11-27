import React, { useState, useEffect } from "react";
import { changePage } from "../../Actions/apiCall";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import "./ChartLayout.css";
import Slider from "./Slides/Slider";



export default function ChartLayout() {

    //Maintains Index of Metrics
    const [CurrentIndex, setCurrentIndex] = useState(1);

    const dispatch = useDispatch();

    //metrics data from server
    const { loading, metrics, numOfPages, numOfFilteredMetrics } = useSelector(
        (state) => state.metrics
    );

    //latest fetched page number
    const { page } = useSelector((state) => state.page);


    useEffect(() => {
        if (page === 1) {
            setCurrentIndex(1);
        }
    }, [page]);

    //Chart Changer function
    const prevHandler = () => {
        setCurrentIndex(CurrentIndex - 1);
    };

    const nextHandler = () => {
        setCurrentIndex(CurrentIndex + 1);
        if ( CurrentIndex/numOfPages === page ) {
            dispatch(changePage(page + 1));
        }
    };

    
    return (
        <div className='item-3 slider'>
            {loading ? (
                <Loader />
            ) : (
                <Slider
                    metrics={metrics}
                    numOfFilteredMetrics={numOfFilteredMetrics}
                    CurrentIndex={CurrentIndex}
                    nextHandler={nextHandler}
                    prevHandler={prevHandler}
                />
            )}
        </div>
    );
}
