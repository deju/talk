import React from 'react';

export interface ICommentProps {
    onChange: (value: string) => void;
}

export default function Comment(props: ICommentProps) {
    return <input type="text" onChange={e => props.onChange(e.target.value)} />;
}
