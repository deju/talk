import React from 'react';
import { render } from '@testing-library/react';
import { getRandom } from './util';

jest.mock('./util', () => ({
    getRandom: jest.fn()
}));

describe('language切换', () => {
    test('zh_CN', () => {
        jest.mock('utils/i18n', () => ({ language: 'zh_CN' }));
        // @ts-ignore
        getRandom.mockImplementation(() => '123123');

        let LanguageComp;

        jest.isolateModules(() => {
            LanguageComp = require('./').default;
        });

        const { getByText } = render(<LanguageComp />);

        expect(getByText('zh_CN - 123123')).toBeInTheDocument();
    });

    test('en_US', () => {
        jest.mock('utils/i18n', () => ({ language: 'en_US' }));
        // @ts-ignore
        getRandom.mockImplementation(() => '456456');

        let LanguageComp;

        jest.isolateModules(() => {
            LanguageComp = require('./').default;
        });

        const { getByText } = render(<LanguageComp />);

        // debug();
        expect(getByText('en_US - 456456')).toBeInTheDocument();
    });
});
