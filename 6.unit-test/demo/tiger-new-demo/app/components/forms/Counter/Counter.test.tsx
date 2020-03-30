import React from 'react';
import { render, waitFor, act } from '@testing-library/react';
import Counter from './';

jest.useFakeTimers();

test('默认值', () => {
    const { getByText } = render(<Counter />);

    expect(getByText('剩余60秒')).toBeInTheDocument();
});

test('测试结束', () => {
    const { getByText } = render(<Counter />);

    act(() => {
        jest.runAllTimers();
    });

    expect(getByText('done')).toBeInTheDocument();
});

test('测试 runOnlyPendingTimers', () => {
    const { getByText } = render(<Counter />);

    act(() => {
        jest.runOnlyPendingTimers();
    });

    expect(getByText('剩余59秒')).toBeInTheDocument();

    act(() => {
        jest.runAllTimers();
    });

    expect(getByText('done')).toBeInTheDocument();
});
