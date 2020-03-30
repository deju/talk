import React from 'react';
import PC from './PC';
import Mobile from './Mobile';

const isMobile = window.innerWidth < 540;

export interface ISilderProps {
    imgs: string[];
}

export default function Slider(props: ISilderProps) {
    const render = () => {
        if (isMobile) {
            return <Mobile imgs={props.imgs} />;
        }

        return <PC imgs={props.imgs} />;
    };

    return <div className="slider-root">{render()}</div>;
}
