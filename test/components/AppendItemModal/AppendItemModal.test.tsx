import { act, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Yup from 'yup';

import { Modal as AppendItemModal } from '../../../src/components/AppendItemModal/AppendItemModal';
import { warnings } from '../../../src/config';

const actions = {
    closeInput: jest.fn(),
    appendItem: jest.fn(),
};

jest.mock('../../../src/hooks/useDispatchAction.ts', () => () => actions);

const validateAgainstDuplicate: jest.Mock = jest.fn();

jest.mock(
    '../../../src/js/functions/validateAgainstDuplicate.ts',
    () => () => validateAgainstDuplicate()
);

jest.mock('../../../src/components/AppendItemModal/validators.ts', () => ({
    validators: Yup.object().shape({
        inputValue: Yup.string().matches(/fake-but-valid/, 'INVALID!'),
    }),
}));

fdescribe('Given AppendItemModal', () => {
    describe('when trying to add an already existing criterion name', () => {
        it('should display correct duplication warning message', async () => {
            const items = ['fake-but-valid', 'other', 'fake-but-valid'];
            const activeScope = '';
            const inputValue = 'fake-but-valid';

            validateAgainstDuplicate.mockReturnValue(false);

            const { findByRole, findByText } = render(
                <AppendItemModal items={items} activeScope={activeScope} />
            );

            await act(async () => {
                const input = await findByRole('textbox');

                userEvent.type(input, inputValue);

                const submitButton = await findByText('Dodaj');

                fireEvent.click(submitButton);
            });

            const warning = await findByText(warnings.duplicate);

            expect(warning).toBeInTheDocument();
        });
    });

    describe('when trying to add an invalid criterion name', () => {
        it('should display a warning message', async () => {
            const items = [];
            const activeScope = '';
            const inputValue = 'fake-and-invalid';

            validateAgainstDuplicate.mockReturnValue(true);

            const { findByRole, findByText } = render(
                <AppendItemModal items={items} activeScope={activeScope} />
            );

            await act(async () => {
                const input = await findByRole('textbox');

                userEvent.type(input, inputValue);

                const submitButton = await findByText('Dodaj');

                fireEvent.click(submitButton);
            });

            const warning = await findByText('INVALID!');

            expect(warning).toBeInTheDocument();
        });
    });

    describe('when submitting a new and unique criterion name', () => {
        it('should NOT display any warnings', async () => {
            const items = ['a1', 'a2'];
            const activeScope = '';
            const inputValue = 'fake-but-valid';

            validateAgainstDuplicate.mockReturnValue(true);

            const { findByRole, findByText, findByTestId } = render(
                <AppendItemModal items={items} activeScope={activeScope} />
            );

            await act(async () => {
                const input = await findByRole('textbox');

                userEvent.type(input, inputValue);

                const submitButton = await findByText('Dodaj');

                fireEvent.click(submitButton);
            });

            try {
                await findByTestId('warning');
            } catch (error: unknown) {
                expect(error).toBeTruthy();
            }
        });

        it('should append it to existing criteria list', async () => {
            const items = ['a1', 'a2'];
            const activeScope = '';
            const inputValue = 'fake-but-valid';

            validateAgainstDuplicate.mockReturnValue(true);

            const { findByRole, findByText } = render(
                <AppendItemModal items={items} activeScope={activeScope} />
            );

            actions.appendItem.mockClear();

            await act(async () => {
                const input = await findByRole('textbox');

                userEvent.type(input, inputValue);

                const submitButton = await findByText('Dodaj');

                fireEvent.click(submitButton);
            });

            expect(actions.appendItem).toHaveBeenCalledWith([
                activeScope,
                inputValue,
            ]);
        });

        it('should close the modal', async () => {
            const items = ['a1', 'a2'];
            const activeScope = '';
            const inputValue = 'fake-but-valid';

            validateAgainstDuplicate.mockReturnValue(true);

            const { findByRole, findByText } = render(
                <AppendItemModal items={items} activeScope={activeScope} />
            );

            actions.closeInput.mockClear();

            await act(async () => {
                const input = await findByRole('textbox');

                userEvent.type(input, inputValue);

                const submitButton = await findByText('Dodaj');

                fireEvent.click(submitButton);
            });

            expect(actions.closeInput).toHaveBeenCalledTimes(1);
        });
    });
});
