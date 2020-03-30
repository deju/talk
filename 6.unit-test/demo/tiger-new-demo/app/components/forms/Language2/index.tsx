import React, { Component } from 'react';
import { language } from 'utils/i18n';
import getRandom from './util';

export interface ILanguageStates {
    random: any;
}

export default class Language2 extends Component<{}, ILanguageStates> {
    constructor(props) {
        super(props);

        this.state = {
            random: getRandom()
        };
    }

    render() {
        return (
            <div>
                {language} - {this.state.random}
            </div>
        );
    }
}
