import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';
import { getCountry } from './request';

export interface ICountrySelectProps {
    disabled?: boolean;
}

export interface ICountrySelectStates {
    countries: any[];
    error: Error | null;
}

let cache = null;

class CountrySelect extends Component<ICountrySelectProps, ICountrySelectStates> {
    constructor(props) {
        super(props);
        this.state = { countries: [], error: null };
    }

    componentDidMount() {
        this.fetchData();
    }

    // get from server
    async fetchData() {
        try {
            const rets: any = cache || (await getCountry());

            cache = rets;

            this.setState({
                countries: rets
            });
        } catch (e) {
            this.setState({
                error: e
            });
        }
    }

    public render() {
        const { countries } = this.state;

        return (
            <FormControl as="select" {...this.props}>
                <option value="" disabled>
                    {__('请选择国家或者地区')}
                </option>
                {countries.map(item => (
                    <option key={item.numericCode} value={item.numericCode}>
                        {item.name}
                    </option>
                ))}
            </FormControl>
        );
    }
}

export default CountrySelect;
