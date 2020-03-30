import React, { useState, useEffect } from 'react';

export interface ICounterProps {
    delay?: number;
}

export default function Counter(props: ICounterProps) {
    const [left, setLeft] = useState(props.delay || 60);

    useEffect(() => {
        if (!left) {return;}

        const intervalId = setInterval(() => {
            setLeft(left - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [left]);

    if (left) {
        return <div>剩余{left}秒</div>;
    }

        return <div>done</div>;
}
