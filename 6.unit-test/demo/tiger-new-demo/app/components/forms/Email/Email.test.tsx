import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, FormProps, $Formutil } from 'react-bootstrap-formutil';
import Email, { IEmailProps, isRealEmail } from './';

function renderEmail(emailProps: Omit<IEmailProps, '$formutil'> = { name: 'email' }, formProps: FormProps = {}) {
    let formutil: $Formutil<any>;
    const wrapper = render(
        <Form
            {...formProps}
            render={$formutil => {
                formutil = $formutil;

                return <Email {...emailProps} />;
            }}
        />
    );

    return {
        ...wrapper,
        getFormutil: () => formutil
    };
}

describe('isRealEmail', () => {
    test('错误的情况', () => {
        expect(isRealEmail('xxx')).toEqual(false);
        expect(isRealEmail('xxx.x')).toEqual(false);
        expect(isRealEmail('xxx@x')).toEqual(false);
        expect(isRealEmail('xxx@x.x')).toEqual(false);
    });

    test('正确的情况', () => {
        expect(isRealEmail('xxx.x@xx.com')).toEqual(true);
        expect(isRealEmail('TI@ig.com')).toEqual(true);
    });
});

test('disabled 及 带有默认值', async () => {
    const { getByText, getByDisplayValue, getFormutil } = renderEmail(
        { name: 'address_email', label: 'email-label', placeholder: 'email-placeholder', disabled: true },
        { $defaultValues: { address_email: '11@itiger.com' } }
    );

    expect(getByText('email-label')).toBeInTheDocument();

    const input = getByDisplayValue('11@itiger.com');

    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('name', 'address_email');
    expect(input).toHaveAttribute('placeholder', 'email-placeholder');
    expect(getFormutil().$params).toEqual({ address_email: '11@itiger.com' });
});

test('required', async () => {
    const { getByPlaceholderText, getByText, getFormutil } = renderEmail();

    await userEvent.type(getByPlaceholderText('请输入邮箱地址'), 'x');
    fireEvent.change(getByPlaceholderText('请输入邮箱地址'), { target: { value: '' } });
    expect(getByText(/请输入邮箱地址/)).toBeInTheDocument();
    expect(getFormutil().$params).toEqual({ email: '' });
    expect(getFormutil().$errors).toEqual({ email: { isEmail: '请输入正确的邮箱', required: '请输入邮箱地址' } });
});

test('空格问题', async () => {
    const { getByPlaceholderText, getByDisplayValue, getFormutil } = renderEmail();

    await userEvent.type(getByPlaceholderText('请输入邮箱地址'), ' xx@i.com ');
    expect(getByDisplayValue('xx@i.com')).toBeInTheDocument();
    expect(getFormutil().$params).toEqual({ email: 'xx@i.com' });
    expect(getFormutil().$errors).toEqual({});
});
