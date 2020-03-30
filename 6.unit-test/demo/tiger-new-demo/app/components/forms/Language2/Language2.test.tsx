import React from 'react';
import { render } from '@testing-library/react';

jest.doMock('./util', () => ({
    __esModule: true,
    default: jest.fn()
}));

describe('language切换', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    test('zh_CN', () => {
        jest.mock('utils/i18n', () => ({ language: 'zh_CN' }));

        // @ts-ignore
        const getRandom = require('./util').default;

        getRandom.mockImplementation(() => '123123');

        // @ts-ignore
        const LanguageComp = require('./').default;
        const { getByText } = render(<LanguageComp />);

        expect(getByText('zh_CN - 123123')).toBeInTheDocument();
    });

    test('en_US', () => {
        jest.mock('utils/i18n', () => ({ language: 'en_US' }));

        // @ts-ignore
        const getRandom = require('./util').default;

        getRandom.mockImplementation(() => '456456');

        // @ts-ignore
        const LanguageComp = require('./').default;
        const { getByText } = render(<LanguageComp />);

        // debug();
        expect(getByText('en_US - 456456')).toBeInTheDocument();
    });
});
