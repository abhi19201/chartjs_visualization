import React from "react";


//Card to Store Dimentions
export default function DimentionCard(props) {

    const name = (dim) => {
        if (dim === "country") return "Country : ";
        if (dim === "productfamily") return "Product Family : ";
        if (dim === "devicetype") return "Device Type : ";
        if (dim === "os") return "OS : ";
    };
    
    return (
        <div className='card'>
            <div className='name'>{name(props.dimension.name)}</div>
            <div className='value'>{props.dimension.value}</div>
        </div>
    );
}
