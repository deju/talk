import React from 'react';

export interface IAgreementProps {
    country: string;
}

export default function Agreement(props: IAgreementProps) {
    if (props.country === 'CHN') {
        return <div> this is for china </div>;
    }

    return <div> this is for USA </div>;
}
