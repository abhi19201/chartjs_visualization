import React from 'react';
import Back from "../../../icons/back.png";

export default function PrevButton(props) {
    return (
        <div
            className={`prev ${props.CurrentIndex - 1 ? null : "disable"}`}
            onClick={props.CurrentIndex - 1 ? props.prevHandler : null}>
            <img src={Back} alt='back' />
            Previous
        </div>
    );
}
