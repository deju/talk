import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, FormProps, $Formutil, FormGroup, FormGroupComponentProps } from 'react-bootstrap-formutil';
import CountrySelect, { ICountrySelectProps } from './';

function renderCountrySelect(
    phoneProps: Omit<ICountrySelectProps, '$formutil'> = {},
    formGroupProps: Omit<FormGroupComponentProps, 'children'> = {},
    formProps: FormProps = {}
) {
    let formutil: $Formutil<any>;
    const wrapper = render(
        <Form
            {...formProps}
            render={$formutil => {
                formutil = $formutil;

                return (
                    <FormGroup name="country_code" {...formGroupProps}>
                        <CountrySelect {...phoneProps} />
                    </FormGroup>
                );
            }}
        />
    );

    return {
        ...wrapper,
        getFormutil: () => formutil
    };
}

jest.mock('./request');

test('disabled 及 默认值', async () => {
    const { findByDisplayValue, getFormutil } = renderCountrySelect(
        {
            disabled: true
        },
        {},
        { $defaultValues: { country_code: '80' } }
    );

    const sele = await findByDisplayValue('A');

    expect(sele).toHaveAttribute('disabled');
    expect(getFormutil().$params).toEqual({ country_code: '80' });
    expect(getFormutil().$errors).toEqual({});
});

test('选择', async () => {
    const { findByDisplayValue, getByDisplayValue, getFormutil } = renderCountrySelect(
        {
            disabled: true
        },
        {},
        { $defaultValues: { country_code: '80' } }
    );

    const sele = await findByDisplayValue('A');

    userEvent.selectOptions(sele, '81');

    await waitFor(() => expect(getByDisplayValue('B')).toBeInTheDocument());
    expect(getFormutil().$params).toEqual({ country_code: '81' });
    expect(getFormutil().$errors).toEqual({});
});
