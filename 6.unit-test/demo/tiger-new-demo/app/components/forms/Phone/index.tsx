import React, { Component } from 'react';
import { FormGroup, connect, $Formutil } from 'react-bootstrap-formutil';
import { FormControl } from 'react-bootstrap';

export const isCNPhone = val => /^1[3456789][0-9]{9}$/.test(val);

export const isGlobalPhone = val => /^[0-9]{5,20}$/.test(val);

export interface IPhoneProps {
    label?: string;
    name?: string;
    disabled?: boolean;
    defaultPhone?: string;
    defaultTelcode?: string;
    $formutil: $Formutil<{
        tel_code;
    }>;
}

class Phone extends Component<IPhoneProps> {
    static defaultProps = {
        name: 'phone',
        defaultTelcode: '86',
        label: __('手机号码')
    };

    parser = value => value.trim();

    $validators = {
        isPhone: (value, prop, { validMessage: { isPhone } }) => {
            if (this.props.disabled) {
                return true;
            }

            const { tel_code = this.props.defaultTelcode } = this.props.$formutil.$params;

            if (tel_code === '86' ? isCNPhone(value) : isGlobalPhone(value)) {
                return true;
            }

            return isPhone;
        }
    };

    public render() {
        const { label, name, defaultPhone, disabled } = this.props;

        return (
            <FormGroup
                label={label}
                name={name}
                $validators={this.$validators}
                $defaultValue={defaultPhone || ''}
                isPhone
                $parser={this.parser}
                required
                validMessage={{ required: __('请输入手机号'), isPhone: __('请输入正确的手机号') }}>
                <FormControl disabled={disabled} placeholder={__('请输入手机号')} autoComplete="tel-national" />
            </FormGroup>
        );
    }
}

export default connect(Phone);
