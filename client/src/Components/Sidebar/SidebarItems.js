import React from 'react'

export default function SidebarItems(props) {

    return (
        <div>
            <button
                onClick={() => {
                    props.onClick(props.measure);
                }}>
                <div>
                    {props.measure
                        .split("_")
                        .map((w) => w.charAt(0).toUpperCase() + w.substring(1))
                        .join(" ")}
                </div>
            </button>
        </div>
    );
}
