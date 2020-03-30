import React from 'react';
import { render } from '@testing-library/react';
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

jest.mock('axios');

test('disabled 及 默认值', async () => {
    const { findByDisplayValue, getFormutil } = renderCountrySelect(
        {
            disabled: true
        },
        {},
        { $defaultValues: { country_code: '80' } }
    );

    const sele = await findByDisplayValue('A');

    expect(sele).toBeDisabled();
    expect(getFormutil().$params).toEqual({ country_code: '80' });
    expect(getFormutil().$errors).toEqual({});
});
