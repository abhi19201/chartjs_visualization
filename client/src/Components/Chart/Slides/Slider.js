import React from "react";
import { useSelector } from "react-redux";
import Chart from "../Chart/Chart";
import NextButton from "./NextButton";
import PrevButton from "./PrevButton";
import "./Slider.css";

//Chart SlideShow
export default function Slider(props) {
    //getting stored data
    const { storedMetrics } = useSelector((state) => state.storedMetrics);

    return (
        <React.Fragment>
            <React.Fragment>
                {props.metrics ? (
                    <Chart data={storedMetrics[props.CurrentIndex - 1]} />
                ) : null}
            </React.Fragment>

            {props.numOfFilteredMetrics ?
                <div className='slideButton'>
                <PrevButton
                    CurrentIndex={props.CurrentIndex}
                    prevHandler={props.prevHandler}
                />
                <div className='metricNum move'>{`${props.CurrentIndex}/${props.numOfFilteredMetrics}`}</div>
                <NextButton
                    CurrentIndex={props.CurrentIndex}
                    numOfFilteredMetrics={props.numOfFilteredMetrics}
                    nextHandler={props.nextHandler}
                />
                </div>
                : null
            }
        </React.Fragment>
    );
}
