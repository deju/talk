import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Comment from '.';

test('onChange监听', async () => {
    const changeSpy = jest.fn();
    const { getByRole } = render(<Comment onChange={changeSpy} />);

    await userEvent.type(getByRole('textbox'), 'a');
    expect(changeSpy).toHaveBeenCalled();
    expect(changeSpy).toHaveBeenCalledWith('a');

    await userEvent.type(getByRole('textbox'), 'abcd');
    expect(changeSpy).toHaveBeenCalled();

    await waitFor(() => {
        expect(changeSpy).toHaveBeenCalledTimes(5);
    });

    expect(changeSpy).toHaveBeenLastCalledWith('aabcd');
});
