import React from 'react';
import security from 'stores/security';
import { render } from '@testing-library/react';
import Footer from './';

describe('mobile test', () => {
    let oldUser = security.user;

    afterAll(() => {
        security.setUser(oldUser);
    });

    test('level 1', () => {
        security.setUser({ level: 1, channel: 'B', token: 'xxxx' });

        const { getByText } = render(<Footer />);

        expect(getByText(/level one/)).toBeInTheDocument();
    });

    test('level 2', () => {
        security.setUser({ level: 2, channel: 'B', token: 'xxxx' });

        const { getByText } = render(<Footer />);

        expect(getByText(/level two/)).toBeInTheDocument();
    });
});
