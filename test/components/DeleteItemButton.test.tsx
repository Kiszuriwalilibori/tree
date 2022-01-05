import userEvent from '@testing-library/user-event';
import App from '../../src/components/App';

import {
    render,
    screen,
    cleanup,
    waitFor,
    fireEvent,
    waitForElementToBeRemoved,
} from '../../test/test-utils/testing-library-utils';
import DeleteItemButton from '../../src/components/DeleteItemButton';

describe('buttons react as expected', () => {
    beforeEach(() => {
        render(<App />);
    });

    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    test('Initially renders 5 minus buttons', () => {
        const minuses = document.querySelectorAll('[aria-label="delete-button"]');
        expect(minuses).toHaveLength(5);
    });

    test('When minus button is clicked proper element disappears', async () => {
        const minuses = document.querySelectorAll('[aria-label="delete-button"]');

        minuses.forEach(async minus => {
            const name = minus.getAttribute('aria-controls');
            const element = screen.getByText(new RegExp(name, 'i'));
            expect(element).toBeInTheDocument();
            userEvent.click(minus);
            await waitForElementToBeRemoved(() => screen.queryByText(new RegExp(name, 'i')));
        });

        const minus = minuses[0];
        const name = minus.getAttribute('aria-controls');
        const element = screen.getByText(new RegExp(name, 'i'));
        expect(element).toBeInTheDocument();
        userEvent.click(minus);
        await waitForElementToBeRemoved(() => screen.queryByText(new RegExp(name, 'i')));
    });
});

describe('buttons fires event passed by handleClickProp when clicked', () => {
    const handleClickMock = jest.fn();
    beforeEach(() => {
        render(<DeleteItemButton nodeText={'test'} handleClick={handleClickMock} />);
    });

    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });
    test('buttons fires event when clicked', () => {
        const minus = document.querySelector('[aria-label="delete-button"]');
        fireEvent.click(minus);
        expect(handleClickMock).toBeCalled();
    });
});
