import React, { Component } from 'react';
import { $Formutil, FormGroup, withForm } from 'react-bootstrap-formutil';

import Button from 'components/Button';
import { RouteComponentProps } from 'react-router-dom';
import Toast from 'components/Toast';
import Phone from 'components/forms/Phone';
import ConfirmPassword from 'components/forms/ConfirmPassword';
import Email from 'components/forms/Email';
import CountrySelect from 'components/forms/CountrySelect';
import NameInfo from 'components/forms/NameInfo';
import FormLayout from 'components/FormLayout';
import './style.scss';

export interface ISignupProps {
    $formutil: $Formutil;
}

class Signup extends Component<
    ISignupProps & RouteComponentProps<{}>,
    {
        loading: boolean;
    }
> {
    readonly state = {
        loading: false
    };

    onSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault();

        const { $invalid, $batchState, $params, $getFirstError } = this.props.$formutil;

        if ($invalid) {
            $batchState({
                $dirty: true,
                $touched: true
            });

            Toast.show($getFirstError());
        } else {
            this.setState({
                loading: true
            });

            console.log($params);

            return this.setState({
                loading: false
            });
        }
    };

    public render() {
        return (
            <form className="signup-root" noValidate onSubmit={this.onSubmit}>
                <h3>请填写个人信息</h3>
                <FormGroup required name="country_code" label={__('常住国家/地区')}>
                    <CountrySelect />
                </FormGroup>
                <NameInfo country={this.props.$formutil.$params.country_code} />
                <FormLayout layout="1:2">
                    <FormGroup required name="tel_code" label={__('手机国家区号')}>
                        <CountrySelect />
                    </FormGroup>
                    <Phone />
                </FormLayout>

                <Email />
                <ConfirmPassword />
                <Button
                    block
                    type="primary"
                    size="lg"
                    htmlType="submit"
                    loading={this.state.loading}
                    disabled={this.state.loading}>
                    {__('注册')}
                </Button>
            </form>
        );
    }
}

export default withForm(Signup);
