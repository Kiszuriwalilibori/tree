import userEvent from '@testing-library/user-event';
import { render, screen, cleanup, fireEvent, waitFor } from '../../test/test-utils/testing-library-utils';
import App from '../../src/components/App';
import { AppendItemModal as Modal } from '../../src/components/AppendItemModal';
import { Modal as ModalWithProps } from '../../src/components/AppendItemModal';
import { InitialNodes } from '../../src/config';
import { Items } from '../../src/types';
import * as Yup from 'yup';

const actions = {
    closeInput: jest.fn(),
    appendItem: jest.fn(),
};
// const fns = {
//     validateAgainstDuplicate: jest.fn(),
// };

jest.mock('../../src/hooks/useDispatchAction', () => () => actions);
//jest.mock('../../src/js/functions/validateAgainstDuplicate', () => fns);
const testValidInputString = 'abcdefghijk0123456789';
const testActiveScope = 'testActiveScope';
const testFalseInputsAry = ['', '   ', '@#$%^'];
const testValidInputsAry = ['abcdefghijk0123456789', 'a b 1 2 ', 'a@##', '@#1##'];

describe('Modal is initially hidden and opens', () => {
    beforeEach(() => {
        render(<App />);
    });

    afterEach(() => cleanup());

    test('Initially, no modal is opened', () => {
        let modal = document.querySelector('[role="dialog"]');
        expect(modal).not.toBeInTheDocument();
    });
    const crosses = document.querySelectorAll('.append__cross');
    crosses.forEach(plus => {
        test('When plus button is clicked append modal opens', async () => {
            userEvent.click(plus);
            await waitFor(() => {
                const modal = document.querySelector('[role="dialog"]');
                expect(modal).toBeInTheDocument();
            });
        });
    });
});

describe('Test elements of AppendItemModal', () => {
    beforeEach(() => {
        render(<Modal />);
    });
    afterEach(() => cleanup());
    test('Modal displays correctly initial elements', () => {
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
    test('text input displays what is typed in', () => {
        const textInput = screen.getByRole('textbox');
        userEvent.type(textInput, testValidInputString);
        /* input takes value as typed */
        expect(textInput).toHaveValue(testValidInputString);
        const givenText = screen.getByDisplayValue(testValidInputString);
        /*the typed value is really displayed */
        expect(givenText).toBeInTheDocument();
    });
});

describe('Test elements of Modal as Primary', () => {
    beforeEach(() => {
        render(<ModalWithProps items={InitialNodes} activeScope={Items.VERY_FIRST_ITEM} />);
    });
    afterEach(() => cleanup());
    test('Modal as Primary displays correctly initial elements', () => {
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

describe('Test elements of Modal as Secondary', () => {
    beforeEach(() => {
        render(<ModalWithProps items={InitialNodes} activeScope={testActiveScope} />);
    });
    afterEach(() => cleanup());
    test('Modal as Secondary does not display checkbox', () => {
        const checkbox = screen.queryByRole('checkbox');
        /*checks if checkbox is NOT displayed */
        expect(checkbox).toBeNull();
    });
});

describe('Given Modal component', () => {
    describe('when "Zamknij" button is clicked', () => {
        it('should call closeInput function', async () => {
            actions.closeInput.mockClear();
            const { findByText, getByText } = render(<Modal />);
            const closeButton = await findByText('Zamknij');
            fireEvent.click(closeButton);
            expect(actions.closeInput).toHaveBeenCalledTimes(1);
        });
    });
    describe('when "Dodaj" button is clicked initially without any text in input', () => {
        it('should NOT call appendItem function', async () => {
            actions.appendItem.mockClear();
            const { getByText } = render(<Modal />);
            const appendButton = getByText('Dodaj');
            fireEvent.click(appendButton);
            expect(actions.appendItem).not.toHaveBeenCalled();
        });
    });

    describe('given Modal component being secondary when "Dodaj" button is clicked after some valid text is in input', () => {
        it('should call appendItem function with proper args, and closeInput function', async () => {
            actions.appendItem.mockClear();
            const { getByText } = render(
                <ModalWithProps items={InitialNodes} activeScope={testActiveScope} />,
            );
            const appendButton = getByText('Dodaj');
            const input = screen.getByRole('textbox');
            expect(input).toBeInTheDocument();
            userEvent.type(input, testValidInputString);
            fireEvent.click(appendButton);
            await waitFor(() => {
                /*calls appendItem function once*/
                expect(actions.appendItem).toHaveBeenCalledTimes(1);
                /*calls closeInput function*/
                expect(actions.closeInput).toHaveBeenCalled();
                /*calls appendItem function with proper args*/
                expect(actions.appendItem).toHaveBeenCalledWith([testActiveScope, testValidInputString]);
            });
        });
    });

    describe('given Modal component as primary when "Dodaj" button is clicked after some valid text is in input', () => {
        testValidInputsAry.forEach(validInput => {
            it('should call appendItem function with proper args, and closeInput function', async () => {
                actions.appendItem.mockClear();
                const { getByText } = render(
                    <ModalWithProps items={InitialNodes} activeScope={Items.VERY_FIRST_ITEM} />,
                );
                const appendButton = getByText('Dodaj');
                const input = screen.getByRole('textbox');
                expect(input).toBeInTheDocument();
                userEvent.type(input, validInput);
                fireEvent.click(appendButton);
                await waitFor(() => {
                    /*calls appendItem function once*/
                    expect(actions.appendItem).toHaveBeenCalledTimes(1);
                    /*calls closeInput function*/
                    expect(actions.closeInput).toHaveBeenCalled();
                    /*calls appendItem function with proper args*/
                    expect(actions.appendItem).toHaveBeenCalledWith([Items.VERY_FIRST_ITEM, validInput]);
                    //expect(fns.validateAgainstDuplicate).toHaveBeenCalled();
                });
            });
        });
    });

    describe('given Modal component being secondary when "Dodaj" button is clicked after some INVALID text is typed', () => {
        testFalseInputsAry.forEach(invalidInput => {
            it('should NOT call appendItem function, and closeInput function', async () => {
                actions.appendItem.mockClear();
                const { getByText } = render(
                    <ModalWithProps items={InitialNodes} activeScope={testActiveScope} />,
                );
                const appendButton = getByText('Dodaj');
                const input = screen.getByRole('textbox');
                expect(input).toBeInTheDocument();
                userEvent.type(input, invalidInput);
                fireEvent.click(appendButton);
                await waitFor(() => {
                    /* does NOT call appendItem function */
                    expect(actions.appendItem).not.toHaveBeenCalled();
                });
            });
        });
    });
});
