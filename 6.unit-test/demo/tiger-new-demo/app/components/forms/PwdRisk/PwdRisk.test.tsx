import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, FormProps, $Formutil, FormGroup, FormGroupComponentProps } from 'react-bootstrap-formutil';
import PwdRisk, { IPwdRiskProps } from './';

describe('judgeRisk测试', () => {
    test('纯数字', () => {
        const resultMaps = [
            ['1', 0.1],
            ['12', 0.2],
            ['123', 0.3],
            ['1234', 0.4],
            ['12345', 0.5],
            ['123456', 0.6],
            ['1234567', 0.7],
            ['12345678', 0.8],
            ['123456789', 0.9],
            ['1234567890', 1],
            ['12345678901', 1],
            ['123456789012', 1]
        ];

        expect.assertions(resultMaps.length);

        resultMaps.forEach(([val, ret]) => {
            expect(PwdRisk.judgeRisk(val as string)).toEqual(ret);
        });
    });

    test('纯小写字母', () => {
        const resultMaps = [
            ['a', 0.1],
            ['ab', 0.2],
            ['abc', 0.3],
            ['abcd', 0.4],
            ['abcde', 0.5],
            ['abcdef', 0.6],
            ['opakshd', 0.7],
            ['kdjsjenm', 0.8],
            ['isjshebsa', 0.9],
            ['pqkshebskx', 1],
            ['iqhsnkejoqa', 1],
            ['iwjxlshszqus', 1]
        ];

        expect.assertions(resultMaps.length);

        resultMaps.forEach(([val, ret]) => {
            expect(PwdRisk.judgeRisk(val as string)).toEqual(ret);
        });
    });

    test('纯大写字母', () => {
        const resultMaps = [
            ['a', 0.1],
            ['ab', 0.2],
            ['abc', 0.3],
            ['abcd', 0.4],
            ['abcde', 0.5],
            ['abcdef', 0.6],
            ['opakshd', 0.7],
            ['kdjsjenm', 0.8],
            ['isjshebsa', 0.9],
            ['pqkshebskx', 1],
            ['iqhsnkejoqa', 1],
            ['iwjxlshszqus', 1]
        ];

        expect.assertions(resultMaps.length);

        resultMaps.forEach(([val, ret]) => {
            expect(PwdRisk.judgeRisk((val as string).toUpperCase())).toEqual(ret);
        });
    });

    test.skip('非数字、字母', () => {
        const resultMaps = [
            [')', 0.1],
            ['()', 0.2],
            ['_+)', 0.3],
            ['><:"', 0.4],
            ['?><:"', 0.5],
            ['>?<:"}', 0.6],
            ['<>:"?}+', 0.7],
            ['&*()_+^%', 0.8],
            ['@#$%^&*()', 0.9],
            [')(*&^%$#@!', 1],
            ['!@#$~^&*()_', 1],
            ['+_)(*&^%$#@!~', 1]
        ];

        expect.assertions(resultMaps.length);

        resultMaps.forEach(([val, ret]) => {
            expect(PwdRisk.judgeRisk(val as string)).toEqual(ret);
        });
    });

    test.each([
        ['1', 0.1],
        ['12', 0.2],
        ['123', 0.3],
        ['1234', 0.4],
        ['12345', 0.5],
        ['123456', 0.6],
        ['1234567', 0.7],
        ['12345678', 0.8],
        ['123456789', 0.9],
        ['1234567890', 1],
        ['12345678901', 1],
        ['123456789012', 1],
        ['a', 0.1],
        ['ab', 0.2],
        ['abc', 0.3],
        ['abcd', 0.4],
        ['abcde', 0.5],
        ['abcdef', 0.6],
        ['opakshd', 0.7],
        ['kdjsjenm', 0.8],
        ['isjshebsa', 0.9],
        ['pqkshebskx', 1],
        ['iqhsnkejoqa', 1],
        ['iwjxlshszqus', 1]
    ])('%s 安全等级：%s', (val, ret) => {
        expect(PwdRisk.judgeRisk(val as string)).toEqual(ret);
    });
});

test('0.5', () => {
    const { container } = render(<PwdRisk password="91022" />);

    expect(container.querySelector('.pwd-risk-safety-0')).toBeInTheDocument();
    expect(container.querySelectorAll('.risk-level')[0].children[0]).toHaveStyle('width: 50%');
    expect(container.querySelectorAll('.risk-level')[0].children[0]).toHaveAttribute('style', 'width: 50%;');
    expect(container.querySelectorAll('.risk-level')[1].children[0]).toHaveAttribute('style', 'width: 0%;');
    expect(container.querySelectorAll('.risk-level')[2].children[0]).toHaveAttribute('style', 'width: 0%;');
});

test('1', () => {
    const { container } = render(<PwdRisk password="91022123123" />);

    expect(container.querySelector('.pwd-risk-safety-0')).toBeInTheDocument();
    expect(container.querySelectorAll('.risk-level')[0].children[0]).toHaveAttribute('style', 'width: 100%;');
    expect(container.querySelectorAll('.risk-level')[1].children[0]).toHaveAttribute('style', 'width: 0%;');
    expect(container.querySelectorAll('.risk-level')[2].children[0]).toHaveAttribute('style', 'width: 0%;');
});

test('1.8', () => {
    const { container } = render(<PwdRisk password="9122acda" />);

    expect(container.querySelector('.pwd-risk-safety-1')).toBeInTheDocument();
    expect(container.querySelectorAll('.risk-level')[0].children[0]).toHaveAttribute('style', 'width: 100%;');
    expect(container.querySelectorAll('.risk-level')[1].children[0]).toHaveAttribute('style', 'width: 80%;');
    expect(container.querySelectorAll('.risk-level')[2].children[0]).toHaveAttribute('style', 'width: 0%;');
});

test('2', () => {
    const { container } = render(<PwdRisk password="9122xacdad" />);

    expect(container.querySelector('.pwd-risk-safety-1')).toBeInTheDocument();
    expect(container.querySelectorAll('.risk-level')[0].children[0]).toHaveAttribute('style', 'width: 100%;');
    expect(container.querySelectorAll('.risk-level')[1].children[0]).toHaveAttribute('style', 'width: 100%;');
    expect(container.querySelectorAll('.risk-level')[2].children[0]).toHaveAttribute('style', 'width: 0%;');
});

test('>=2, 50%', () => {
    const { container } = render(<PwdRisk password="9122xacdad," />);

    expect(container.querySelector('.pwd-risk-safety-2')).toBeInTheDocument();
    expect(container.querySelectorAll('.risk-level')[0].children[0]).toHaveAttribute('style', 'width: 100%;');
    expect(container.querySelectorAll('.risk-level')[1].children[0]).toHaveAttribute('style', 'width: 100%;');
    expect(container.querySelectorAll('.risk-level')[2].children[0]).toHaveAttribute('style', 'width: 50%;');
});

test('>=2, 100%', () => {
    const { container } = render(<PwdRisk password="912R2xacdad," />);

    expect(container.querySelector('.pwd-risk-safety-2')).toBeInTheDocument();
    expect(container.querySelectorAll('.risk-level')[0].children[0]).toHaveAttribute('style', 'width: 100%;');
    expect(container.querySelectorAll('.risk-level')[1].children[0]).toHaveAttribute('style', 'width: 100%;');
    expect(container.querySelectorAll('.risk-level')[2].children[0]).toHaveAttribute('style', 'width: 100%;');
});
