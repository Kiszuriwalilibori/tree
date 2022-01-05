import userEvent from '@testing-library/user-event';

import {
    render,
    screen,
    cleanup,
    fireEvent,
} from '../../test/test-utils/testing-library-utils';

import App from '../../src/components/App';
import { AppendItemModal as Modal } from '../../src/components/AppendItemModal';
import { Modal as ModalWithProps } from '../../src/components/AppendItemModal';
import { InitialNodes } from '../../src/config';
import { Items } from '../../src/types';

const actions = {
    closeInput: jest.fn(),
    appendItem: jest.fn(),
};

jest.mock('../../src/hooks/useDispatchAction', () => () => actions);

describe('Modal is initially hidden and opens', () => {
    beforeEach(() => {
        render(<App />);
    });

    afterEach(() => cleanup());

    test('Initially, no modal is opened', () => {
        let modal = document.querySelector('[role="dialog"]');
        expect(modal).not.toBeInTheDocument();
    });

    test('When plus button is clicked append modal opens', () => {
        const crosses = document.querySelectorAll('.append__cross');
        expect(crosses).toHaveLength(2);

        crosses.forEach((plus) => {
            userEvent.click(plus);
            const modal = document.querySelector('[role="dialog"]');
            expect(modal).toBeInTheDocument();
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
        userEvent.type(textInput, 'abcdefghijk0123456789');
        /* input takes value as typed */
        expect(textInput).toHaveValue('abcdefghijk0123456789');
        const givenText = screen.getByDisplayValue('abcdefghijk0123456789');
        expect(givenText).toBeInTheDocument();
    });
});

describe('Test elements of Modal as Primary', () => {
    beforeEach(() => {
        render(
            <ModalWithProps
                items={InitialNodes}
                activeScope={Items.VERY_FIRST_ITEM}
            />
        );
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
        render(<ModalWithProps items={InitialNodes} activeScope={'test'} />);
    });
    afterEach(() => cleanup());
    test('Modal as Secondary does not display checkbox', () => {
        //screen.debug();
        const checkbox = screen.queryByRole('checkbox');
        /*checks checkbox is NOT displayed */
        expect(checkbox).toBeNull();
    });
});

describe('Given Modal component', () => {
    describe('when "Zamknij" button is clicked', () => {
        it('should call closeInput function', async () => {
            actions.closeInput.mockClear();

            const { findByText } = render(<Modal />);
            const closeButton = await findByText('Zamknij');

            fireEvent.click(closeButton);

            expect(actions.closeInput).toHaveBeenCalledTimes(1);
        });
    });
});
