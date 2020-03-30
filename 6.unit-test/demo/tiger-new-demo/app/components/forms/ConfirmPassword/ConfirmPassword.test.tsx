import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, FormProps, $Formutil } from 'react-bootstrap-formutil';
import ConfirmPassword, { IConfirmPasswordProps } from './';

function renderConfirmPassword(
    passwordProps: Omit<IConfirmPasswordProps, '$formutil'> = {},
    formProps: FormProps = {}
) {
    let formutil: $Formutil<any>;
    const wrapper = render(
        <Form
            {...formProps}
            render={$formutil => {
                formutil = $formutil;

                return <ConfirmPassword {...passwordProps} />;
            }}
        />
    );

    return {
        ...wrapper,
        getFormutil: () => formutil
    };
}

test.todo('默认值');

test.todo('密码required');

describe('密码安全性校验', () => {
    test.todo('低等级');
});

test.todo('确认密码required');

test.todo('确认密码需要一致');
