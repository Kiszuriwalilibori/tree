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

const handleClickMock = jest.fn();

describe('DeleteItem Buttons(those with minus)', () => {
    beforeEach(() => {
        render(<App />);
    });

    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    test('render in 5 copies initially', () => {
        const minuses = document.querySelectorAll('[aria-label="delete-button"]');
        expect(minuses).toHaveLength(5);
    });

    test('For each of them, when clicked, component it controls disappears', () => {
        const minuses = document.querySelectorAll('[aria-label="delete-button"]');
        minuses.forEach(async minus => {
            const name = minus.getAttribute('aria-controls');
            const element = screen.getByText(new RegExp(name, 'i'));
            expect(element).toBeInTheDocument();
            userEvent.click(minus);
            await waitForElementToBeRemoved(() => screen.queryByText(new RegExp(name, 'i')));
        });
    });
});

describe('Each of DeleteItem buttons ', () => {
    beforeEach(() => {});
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });
    test('call function passed by handleClick Prop when clicked', () => {
        render(<DeleteItemButton nodeText={'test'} handleClick={handleClickMock} />);
        const minuses = document.querySelectorAll('[aria-label="delete-button"]');
        minuses.forEach(minus => {
            fireEvent.click(minus);
            expect(handleClickMock).toBeCalled();
        });
    });
});
