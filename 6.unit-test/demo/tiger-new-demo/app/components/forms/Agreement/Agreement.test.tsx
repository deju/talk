import React from 'react';
import { render } from '@testing-library/react';
import Agreement from './';

test('CHN snapshot', () => {
    const { asFragment } = render(<Agreement country="CHN" />);

    expect(asFragment()).toMatchSnapshot();
});

test('USA snapshot', () => {
    const { asFragment } = render(<Agreement country="USA" />);

    expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <div>
             this is for USA 
          </div>
        </DocumentFragment>
    `);
});
