import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, FormProps, $Formutil } from 'react-bootstrap-formutil';
import NameInfo, { INameProps } from '.';

function renderNameInfo(infoProps: Omit<INameProps, '$formutil'> = { country: 'CHN' }, formProps: FormProps = {}) {
    let formutil: $Formutil<any>;
    const wrapper = render(
        <Form
            {...formProps}
            render={$formutil => {
                formutil = $formutil;

                return <NameInfo {...infoProps} />;
            }}
        />
    );

    return {
        ...wrapper,
        getFormutil: () => formutil
    };
}

describe('country=SGP', () => {
    test('默认值校验, disabled', async () => {
        const { getAllByRole, findByDisplayValue, getFormutil } = renderNameInfo(
            { country: 'SGP', disabled: true },
            { $defaultValues: { fullname: 'Taylor Swift' } }
        );

        const fullname = await findByDisplayValue('Taylor Swift');

        expect(fullname).toBeDefined();
        expect(getAllByRole('textbox')).toHaveLength(1);
        expect(getFormutil().$params).toEqual({ fullname: 'Taylor Swift' });
    });

    test('首尾空格清除', async () => {
        const { getFormutil, findByPlaceholderText, getByDisplayValue } = renderNameInfo({
            country: 'SGP'
        });

        const fullname = await findByPlaceholderText('请输入姓名');

        expect(getFormutil().$params).toEqual({
            fullname: ''
        });

        await userEvent.type(fullname, ' Taylar Swift ');

        await waitFor(() => {
            expect(getByDisplayValue('Taylar Swift')).toBeInTheDocument();
        });

        expect(getFormutil().$params).toEqual({
            fullname: 'Taylar Swift'
        });

        expect(getFormutil().$errors).toEqual({});
    });

    test('输入校验，为空校验', async () => {
        const { findByPlaceholderText, getAllByRole, getFormutil, findByDisplayValue, getByText } = renderNameInfo({
            country: 'SGP'
        });

        const input = await findByPlaceholderText('请输入姓名');

        expect(getAllByRole('textbox').length).toEqual(1);

        // 输入全名
        userEvent.type(input, 'tiger wu');

        expect(getFormutil().$params).toEqual({
            fullname: 'tiger wu'
        });

        expect(getFormutil().$errors).toEqual({});

        await findByDisplayValue('tiger wu');

        // 清空全名
        fireEvent.change(input, { target: { value: '' } });

        await waitFor(() => expect(getByText('请输入姓名')).toBeInTheDocument());

        expect(getFormutil().$params).toEqual({
            fullname: ''
        });

        expect(getFormutil().$errors).toEqual({
            fullname: {
                required: '请输入姓名'
            }
        });
    });
});

describe('country=NZ（即非SGP）', () => {
    test('默认值校验、disabled', async () => {
        const { findByDisplayValue } = renderNameInfo(
            {
                country: 'NZ',
                disabled: true
            },
            { $defaultValues: { first_name: 'Earth', middle_name: 'eric', last_name: 'Juice' } }
        );

        const first = await findByDisplayValue('Earth');
        const middle = await findByDisplayValue('eric');
        const last = await findByDisplayValue('Juice');

        expect(first).toBeDisabled();
        expect(middle).toBeDisabled();
        expect(last).toBeDisabled();
    });

    test('首尾空格清除', async () => {
        const { getFormutil, findByPlaceholderText, getByDisplayValue } = renderNameInfo({
            country: 'NZ'
        });

        const first = await findByPlaceholderText('请输入名');
        const middle = await findByPlaceholderText('中间名(可选)');
        const last = await findByPlaceholderText('请输入姓');

        expect(getFormutil().$params).toEqual({
            first_name: '',
            last_name: '',
            middle_name: ''
        });

        userEvent.type(first, ' tianhua ');

        userEvent.type(middle, ' tiger ');

        userEvent.type(last, ' wu ');

        await waitFor(() => {
            expect(getByDisplayValue('tianhua')).toBeInTheDocument();
            expect(getByDisplayValue('tiger')).toBeInTheDocument();
            expect(getByDisplayValue('wu')).toBeInTheDocument();
        });

        expect(getFormutil().$params).toEqual({
            first_name: 'tianhua',
            middle_name: 'tiger',
            last_name: 'wu'
        });

        expect(getFormutil().$errors).toEqual({});
    });

    test('输入校验、为空校验', async () => {
        const { getFormutil, findByPlaceholderText, getByText, getByDisplayValue } = renderNameInfo({
            country: 'NZ'
        });

        const first = await findByPlaceholderText('请输入名');
        const middle = await findByPlaceholderText('中间名(可选)');
        const last = await findByPlaceholderText('请输入姓');

        expect(getFormutil().$params).toEqual({
            first_name: '',
            last_name: '',
            middle_name: ''
        });

        await userEvent.type(first, ' tianhua ');

        await userEvent.type(middle, ' tiger ');

        await userEvent.type(last, ' wu ');

        await waitFor(() => {
            expect(getByDisplayValue('tianhua')).toBeInTheDocument();
            expect(getByDisplayValue('tiger')).toBeInTheDocument();
            expect(getByDisplayValue('wu')).toBeInTheDocument();
        });

        fireEvent.change(first, { target: { value: '' } });

        fireEvent.change(middle, { target: { value: '' } });

        fireEvent.change(last, { target: { value: '' } });

        await waitFor(() => {
            expect(getByText('请输入名')).toBeInTheDocument();
            expect(getByText('请输入姓')).toBeInTheDocument();
        });
    });
});
