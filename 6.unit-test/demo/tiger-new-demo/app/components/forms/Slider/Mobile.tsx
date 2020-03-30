import React from 'react';

export interface IMobileSliderProps {
    imgs: string[];
}

export default function MobileSlider(props: IMobileSliderProps) {
    return (
        <div className="mobile-slider">
            {props.imgs.map(item => (
                <img src={item} key={item} alt="xx" />
            ))}
        </div>
    );
}
