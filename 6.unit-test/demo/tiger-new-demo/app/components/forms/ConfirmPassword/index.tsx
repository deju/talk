import React, { Component, Fragment } from 'react';
import { connect, FormGroup, $Formutil } from 'react-bootstrap-formutil';
import { FormControl } from 'react-bootstrap';
import PwdRisk from 'components/forms/PwdRisk';
import { Fade } from 'components/Transition';

export interface IConfirmPasswordProps {
    $formutil: $Formutil<{
        login_password: string;
        confirm_password: string;
    }>;
}

class ConfirmPassword extends Component<IConfirmPasswordProps> {
    parser = value => value.trim();

    onFieldChange = name => this.props.$formutil.$validate(name);

    checkPassword = (confirmed, value) => {
        if (!value || value.length < 8 || value.length > 24) {
            return '请输入密码';
        }

        if (PwdRisk.judgeRisk(value) <= 1.5) {
            return '密码强度不足，请增加更多类型';
        }

        const confirmedValue = this.props.$formutil.$params[confirmed];

        if (confirmedValue && value && value !== confirmedValue) {
            return '确认密码与设置密码不同';
        }

        return true;
    };

    public render() {
        // this.props.
        return (
            <Fragment>
                <FormGroup
                    name="login_password"
                    required={null}
                    label="密码"
                    checker={this.checkPassword.bind(this, 'confirm_password')}
                    $parser={this.parser}
                    $onFieldChange={this.onFieldChange.bind(this, 'confirm_password')}>
                    <FormControl type="password" placeholder="请输入密码" autoComplete="new-password" />
                </FormGroup>
                <Fade in={!!this.props.$formutil.$params.login_password} exit={false}>
                    <PwdRisk password={this.props.$formutil.$params.login_password} />
                </Fade>
                <FormGroup
                    name="confirm_password"
                    label="确认密码"
                    checker={this.checkPassword.bind(this, 'login_password')}
                    $parser={this.parser}
                    $onFieldChange={this.onFieldChange.bind(this, 'login_password')}>
                    <FormControl type="password" placeholder="请输入确认密码" autoComplete="new-password" />
                </FormGroup>
            </Fragment>
        );
    }
}

export default connect(ConfirmPassword);
