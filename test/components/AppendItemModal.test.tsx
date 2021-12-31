import userEvent from '@testing-library/user-event';
import App from '../../src/components/App';
import { AppendItemModal as Modal } from '../../src/components/AppendItemModal';
import AppProvider from '../../src/components/AppProvider';
import ReactDOM from 'react-dom';
import { render, screen, cleanup } from '../../test/test-utils/testing-library-utils';

describe('App by React', () => {
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

        crosses.forEach(plus => {
            userEvent.click(plus);
            const modal = document.querySelector('[role="dialog"]');
            expect(modal).toBeInTheDocument();
        });
    });

    test('modal hides when Zamknij is clicked', () => {});
});

describe('App by React', () => {
    beforeEach(() => {
        render(<Modal />);
    });

    test('modal hides when Zamknij is clicked', () => {
        const close = screen.getByText(/zamknij/i);
        userEvent.click(close);
        const modal = screen.queryByRole('dialog');
        expect(modal).toBeNull();
    });
});
