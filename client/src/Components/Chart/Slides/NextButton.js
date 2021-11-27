import React from 'react';
import Next from "../../../icons/next.png";


export default function NextButton(props) {
    return (
        <div
            className={`next ${
                props.CurrentIndex === props.numOfFilteredMetrics
                    ? "disable"
                    : null
            }`}
            onClick={
                props.CurrentIndex === props.numOfFilteredMetrics
                    ? null
                    : props.nextHandler
            }>
            Next
            <img src={Next} alt='next' />
        </div>
    );
}
