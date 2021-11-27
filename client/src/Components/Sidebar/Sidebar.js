import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SidebarItems from "./SidebarItems";
import { getMetrics, changePage } from "../../Actions/apiCall";
import Loader from "../Loader/Loader";
import "./Sidebar.css";

export default function Sidebar() {
    const [currentMeasure, setcurrentMeasure] = useState("");
    const dispatch = useDispatch();

    const { page } = useSelector((state) => state.page);
    const { loading, measures } = useSelector((state) => state.measures);

    useEffect(() => {
        dispatch(getMetrics(currentMeasure, page));
    }, [dispatch, currentMeasure, page]);

    const measureClickHandler = (measure) => {
        setcurrentMeasure(measure);
        dispatch(changePage(1));
    };


    return (
        <div className='item-2 barItems'>
            <button
                onClick={() => {
                    measureClickHandler("", 1);
                    setcurrentMeasure("");
                }}>
                <div>All</div>
            </button>
            {loading && measures.length !== 0 ? (
                <Loader />
            ) : (
                measures.map((measure, index) => {
                    return (
                        <SidebarItems
                            measure={measure}
                            key={index}
                            onClick={measureClickHandler}
                        />
                    );
                })
            )}
        </div>
    );
}
