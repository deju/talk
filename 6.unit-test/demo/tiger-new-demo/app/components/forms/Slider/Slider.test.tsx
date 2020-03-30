import React from 'react';
import { render, screen } from '@testing-library/react';

const imgs = ['1', '2'];

describe('mobile test', () => {
    const oldWidth = window.innerWidth;
    let SliderComp;

    beforeAll(() => {
        jest.resetModules();
        (window.innerWidth as any) = 350;
        SliderComp = require('./').default;
    });

    afterAll(() => {
        (window.innerWidth as any) = oldWidth;
    });

    test('mobile check', () => {
        const { container } = render(<SliderComp imgs={imgs} />);

        expect(container.querySelector('.mobile-slider')).toBeInTheDocument();
        screen.debug(container);
    });
});

describe('pc test', () => {
    const oldWidth = window.innerWidth;
    let SliderComp;

    beforeAll(() => {
        jest.resetModules();
        (window.innerWidth as any) = 1080;
        SliderComp = require('./').default;
    });

    afterAll(() => {
        (window.innerWidth as any) = oldWidth;
    });

    test('pc check', () => {
        const { container } = render(<SliderComp imgs={imgs} />);

        expect(container.querySelector('.pc-slider')).toBeInTheDocument();
        // screen.debug(container);
    });
});
