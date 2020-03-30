import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, FormProps, $Formutil } from 'react-bootstrap-formutil';
import Phone, { IPhoneProps, isCNPhone, isGlobalPhone } from './';

function renderPhone(phoneProps: Omit<IPhoneProps, '$formutil'> = {}, formProps: FormProps = {}) {
    let formutil: $Formutil<any>;
    const wrapper = render(
        <Form
            {...formProps}
            render={$formutil => {
                formutil = $formutil;

                return <Phone {...phoneProps} />;
            }}
        />
    );

    return {
        ...wrapper,
        getFormutil: () => formutil
    };
}

test.todo('isCNPhone');

test.todo('isCNPhone');

test('name, disabled, defaultTelCode, defaultPhone 属性校验', async () => {
    const { findByDisplayValue, getFormutil } = renderPhone({
        disabled: true,
        name: 'tele_phone',
        defaultTelcode: '61',
        defaultPhone: '89890000001111111111'
    });

    const input = await findByDisplayValue('89890000001111111111');

    expect(input).toHaveAttribute('disabled');

    expect(getFormutil().$params).toEqual({
        tele_phone: '89890000001111111111'
    });
});

test('默认值, disabled', async () => {
    const { findByDisplayValue, getFormutil } = renderPhone(
        { disabled: true, name: 'tele_phone', defaultTelcode: '61' },
        { $defaultValues: { tele_phone: '898900000' } }
    );

    const input = await findByDisplayValue('898900000');

    expect(input).toHaveAttribute('disabled');

    expect(getFormutil().$params).toEqual({
        tele_phone: '898900000'
    });
});

test('parser check', () => {
    const { container, getFormutil } = renderPhone();

    userEvent.type(container.querySelector('input')!, '14088886666 ');

    expect(getFormutil().$params).toEqual({
        phone: '14088886666'
    });
});

test('为空校验', async () => {
    const { getFormutil, getByText, container } = renderPhone({}, { $defaultValues: { phone: '14088886666' } });

    fireEvent.change(container.querySelector('input')!, { target: { value: '  ' } });

    expect(getFormutil().$params).toEqual({
        phone: ''
    });

    expect(getFormutil().$errors).toEqual({ phone: { isPhone: '请输入正确的手机号', required: '请输入手机号' } });

    await waitFor(() => expect(getByText('请输入手机号')).toBeInTheDocument());
});

test('国家码86号码校验', async () => {
    const { container, getFormutil, findByText } = renderPhone();

    // check valid letter
    userEvent.type(container.querySelector('input')!, '-111123163');
    expect(getFormutil().$params).toEqual({ phone: '-111123163' });
    expect(getFormutil().$errors).toEqual({ phone: { isPhone: '请输入正确的手机号' } });
    await findByText('请输入正确的手机号');

    // check len
    fireEvent.change(container.querySelector('input')!, { target: { value: '1212123163' } });
    expect(getFormutil().$params).toEqual({ phone: '1212123163' });
    expect(getFormutil().$errors).toEqual({ phone: { isPhone: '请输入正确的手机号' } });
    await findByText('请输入正确的手机号');

    // right check
    fireEvent.change(container.querySelector('input')!, { target: { value: '14900001111' } });
    expect(getFormutil().$params).toEqual({ phone: '14900001111' });
    expect(getFormutil().$errors).toEqual({});
});

test('国家码61号码校验', async () => {
    const { getFormutil, findByPlaceholderText, getByText } = renderPhone({ defaultTelcode: '61' });

    const input = await findByPlaceholderText('请输入手机号');

    userEvent.type(input, '8989');

    expect(getFormutil().$params).toEqual({
        phone: '8989'
    });

    expect(getFormutil().$errors).toEqual({
        phone: {
            isPhone: '请输入正确的手机号'
        }
    });

    await waitFor(() => expect(getByText('请输入正确的手机号')).toBeInTheDocument());

    fireEvent.change(input, { target: { value: '89890000001111111111234' } });

    expect(getFormutil().$params).toEqual({
        phone: '89890000001111111111234'
    });

    expect(getFormutil().$errors).toEqual({
        phone: {
            isPhone: '请输入正确的手机号'
        }
    });

    await waitFor(() => expect(getByText('请输入正确的手机号')).toBeInTheDocument());

    fireEvent.change(input, { target: { value: '8989000000' } });

    expect(getFormutil().$params).toEqual({
        phone: '8989000000'
    });

    await waitFor(() => expect(getFormutil().$errors).toEqual({}));
});
