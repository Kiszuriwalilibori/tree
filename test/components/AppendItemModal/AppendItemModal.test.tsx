import { act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { screen, render, cleanup } from '../../../test/test-utils/testing-library-utils';
import * as Yup from 'yup';
import { Modal as AppendModal } from '../../../src/components/AppendItemModal/AppendItemModal';
import AppendItemModal from '../../../src/components/AppendItemModal/AppendItemModal';
import { InitialNodes } from '../../../src/config';
import { Items } from '../../../src/types';
import App from '../../../src/components/App';
import { warnings } from '../../../src/config';

const actions = {
    closeInput: jest.fn(),
    appendItem: jest.fn(),
};

jest.mock('../../../src/hooks/useDispatchAction.ts', () => () => actions);

const validateAgainstDuplicate: jest.Mock = jest.fn();

jest.mock('../../../src/js/functions/validateAgainstDuplicate.ts', () => () => validateAgainstDuplicate());

jest.mock('../../../src/components/AppendItemModal/validators.ts', () => ({
    validators: Yup.object().shape({
        inputValue: Yup.string().matches(/fake-but-valid/, 'INVALID!'), //fake but valid
    }),
}));

describe('Given AppendItemModal', () => {
    afterEach(() => cleanup());
    describe('when initially rendered', () => {
        it('displays correctly initial elements', () => {
            render(<AppendItemModal />);
            const title = screen.getByText(/wpisz nowe kryterium/i);
            /*checks if title is rendered*/
            expect(title).toBeInTheDocument();
            const buttons = screen.getAllByRole('button');
            /*checks if two buttons are rendered*/
            expect(buttons).toHaveLength(2);

            const appendButton = screen.getByRole('button', { name: 'Dodaj' });
            /*checks Dodaj button is displayed*/
            expect(appendButton).toBeInTheDocument();

            const closeButton = screen.getByRole('button', { name: 'Zamknij' });
            /*checks Zamknij button is displayed*/
            expect(closeButton).toBeInTheDocument();

            const textInput = screen.getByRole('textbox');
            /*checks text input is displayed*/
            expect(textInput).toBeInTheDocument();
            /*checks text input is initially empty*/
            expect(textInput).toHaveTextContent('');
            /*checks input with label "kryterium" is displayed*/
            const label = document.querySelector('label');
            expect(label).toHaveTextContent('Kryterium');
        });
    });
    describe('when any text is written in its input field', () => {
        test('displays what is typed in', () => {
            render(<AppendItemModal />);
            const textInput = screen.getByRole('textbox');
            userEvent.type(textInput, 'abcdefghijk0123456789');
            /* input takes value as typed */
            expect(textInput).toHaveValue('abcdefghijk0123456789');
            const givenText = screen.getByDisplayValue('abcdefghijk0123456789');
            expect(givenText).toBeInTheDocument();
        });
    });

    describe('when rendered as Primary Modal', () => {
        it('displays correctly initial elements', () => {
            render(<AppendModal items={InitialNodes} activeScope={Items.VERY_FIRST_ITEM} />);
            const checkbox = screen.getByRole('checkbox');
            /* checkbox is displayed */
            expect(checkbox).toBeInTheDocument();
            /* checkbox is unchecked */
            expect(checkbox).not.toBeChecked();
            userEvent.click(checkbox);
            /* checkbox checks when clicked */
            expect(checkbox).toBeChecked();
            userEvent.click(checkbox);
            /* checkbox unchecks when clicked again */
            expect(checkbox).not.toBeChecked();
        });
    });
    describe('when rendered as Secondary Modal', () => {
        it('does not display checkbox', () => {
            render(<AppendModal items={InitialNodes} activeScope={'test'} />);
            const checkbox = screen.queryByRole('checkbox');
            expect(checkbox).toBeNull();
        });
    });
    describe('when "Zamknij" button is clicked', () => {
        it('should call closeInput function', async () => {
            actions.closeInput.mockClear();

            const { findByText } = render(<AppendItemModal />);
            const closeButton = await findByText('Zamknij');

            fireEvent.click(closeButton);

            expect(actions.closeInput).toHaveBeenCalledTimes(1);
        });
    });
    describe('when trying to add an already existing criterion name', () => {
        it('should display correct duplication warning message', async () => {
            const items = ['fake-but-valid', 'other', 'fake-but-valid'];
            const activeScope = '';
            const inputValue = 'fake-but-valid';

            validateAgainstDuplicate.mockReturnValue(false);

            const { findByRole, findByText } = render(
                <AppendModal items={items} activeScope={activeScope} />,
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
                <AppendModal items={items} activeScope={activeScope} />,
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
                <AppendModal items={items} activeScope={activeScope} />,
            );

            await act(async () => {
                const input = await findByRole('textbox');

                userEvent.type(input, inputValue);

                const submitButton = await findByText('Dodaj');

                fireEvent.click(submitButton);
            });

            try {
                await findByTestId('warning'); //findbyrzucierrorem a getby by chyba nie nzlazło i rzucilo by nulla
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
                <AppendModal items={items} activeScope={activeScope} />,
            );

            actions.appendItem.mockClear();

            await act(async () => {
                const input = await findByRole('textbox');

                userEvent.type(input, inputValue);

                const submitButton = await findByText('Dodaj');

                fireEvent.click(submitButton);
            });

            expect(actions.appendItem).toHaveBeenCalledWith([activeScope, inputValue]);
        });

        it('should close the modal', async () => {
            const items = ['a1', 'a2'];
            const activeScope = '';
            const inputValue = 'fake-but-valid';

            validateAgainstDuplicate.mockReturnValue(true);

            const { findByRole, findByText } = render(
                <AppendModal items={items} activeScope={activeScope} />,
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
