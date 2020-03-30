import React from 'react';

export interface IPCSliderProps {
    imgs: string[];
}

export default function PCSlider(props: IPCSliderProps) {
    return (
        <div className="pc-slider">
            {props.imgs.map(item => (
                <img src={item} key={item} alt="xxx" />
            ))}
        </div>
    );
}
