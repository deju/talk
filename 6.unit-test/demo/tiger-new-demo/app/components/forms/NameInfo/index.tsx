import React, { Component, Fragment } from 'react';
import { FormGroup, $Formutil, connect } from 'react-bootstrap-formutil';
import { FormControl } from 'react-bootstrap';

/**
 * @description country是指证件签发国，根据证件签发国来判断展示具体的内容，针对新加坡展示全名，其他则为first,last
 */

export interface INameProps {
    country: string;
    disabled?: boolean;
    $formutil: $Formutil<{
        pinyin_first;
        pinyin_last;
        real_name_en;
    }>;
}

class NameInfo extends Component<INameProps> {
    validMessage = {
        first_name: {
            required: __('请输入名')
        },
        last_name: {
            required: __('请输入姓')
        },
        fullname: {
            required: __('请输入姓名')
        }
    };

    $parser = (value, $setViewValue) => $setViewValue(value.replace(/[^a-z]+/gi, '').toUpperCase());

    public render() {
        const { country, disabled } = this.props;

        return (
            <div className="form-group">
                {country === 'SGP' ? (
                    <FormGroup label={__('姓名')} name="fullname" required validMessage={this.validMessage.fullname}>
                        <FormControl type="text" placeholder={__('请输入姓名')} disabled={disabled} />
                    </FormGroup>
                ) : (
                    <Fragment>
                        <FormGroup
                            label={__('名')}
                            name="first_name"
                            required
                            validMessage={this.validMessage.first_name}>
                            <FormControl disabled={disabled} placeholder={__('请输入名')} />
                        </FormGroup>
                        <FormGroup label={__('中间名')} name="middle_name">
                            <FormControl placeholder={__('中间名(可选)')} disabled={disabled} />
                        </FormGroup>
                        <FormGroup
                            label={__('姓')}
                            name="last_name"
                            required
                            validMessage={this.validMessage.last_name}>
                            <FormControl disabled={disabled} placeholder={__('请输入姓')} />
                        </FormGroup>
                    </Fragment>
                )}
            </div>
        );
    }
}

export default connect(NameInfo);
