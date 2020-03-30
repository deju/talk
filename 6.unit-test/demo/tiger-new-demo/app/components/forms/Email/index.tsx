import React, { Component } from 'react';
import { FormGroup } from 'react-bootstrap-formutil';
import { FormControl } from 'react-bootstrap';

export const isRealEmail = value =>
    new RegExp('^(?![\\-_.])[\\w\\-.]+@(?:(?![\\-_])[\\w\\-\u4e00-\u9fa5]{1,63}\\.)+[A-Za-z0-9]{2,}$').test(value);

export interface IEmailProps {
    name: string;
    label?: React.ReactNode;
    defaultEmail?: string;
    placeholder?: string;
    disabled?: boolean;
}

class Email extends Component<IEmailProps> {
    static defaultProps = {
        name: 'email',
        label: '邮箱'
    };

    parser = value => value.trim();

    $validators = {
        isEmail: (value, prop, { validMessage: { isEmail } }) => isRealEmail(value) || isEmail
    };

    validMessage = {
        required: '请输入邮箱地址',
        isEmail: '请输入正确的邮箱'
    };

    public render() {
        return (
            <FormGroup
                label={this.props.label}
                name={this.props.name}
                $validators={this.$validators}
                $defaultValue={this.props.defaultEmail || ''}
                isEmail
                $parser={this.parser}
                required
                validMessage={this.validMessage}>
                <FormControl
                    placeholder={this.props.placeholder || __('请输入邮箱地址')}
                    autoComplete="email"
                    disabled={this.props.disabled}
                />
            </FormGroup>
        );
    }
}

export default Email;
