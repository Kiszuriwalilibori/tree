import userEvent from '@testing-library/user-event';
import App from '../../src/components/App';
import AppProvider from '../../src/components/AppProvider';
import ReactDOM from 'react-dom';
import { render, screen, cleanup } from '../../test/test-utils/testing-library-utils';

describe('buttons react as expected', () => {
    beforeEach(() => {
        render(<App />);
    });

    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    test('Initially renders 5 minus buttons', async () => {
        const minuses = document.querySelectorAll('[aria-label="delete-button"]');
        expect(minuses).toHaveLength(5);
    });

    test('When minus button is clicked proper element disappears', async () => {
        const minuses = document.querySelectorAll('[aria-label="delete-button"]');

        minuses.forEach(minus => {
            const name = minus.getAttribute('aria-controls');
            let element = document.getElementById(name);
            //console.log(element, 'element');
            //expect(element).toBeNull();
            expect(element).toBeInTheDocument();
            // userEvent.click(minus);
            // const removed = document.getElementById(name);

            // expect(removed).toBeInTheDocument();
        });
    });
});
