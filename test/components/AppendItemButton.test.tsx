import userEvent from '@testing-library/user-event';
import App from '../../src/components/App';
import AppProvider from '../../src/components/AppProvider';
import ReactDOM from 'react-dom';
import { render, screen, cleanup } from '../../test/test-utils/testing-library-utils';

describe('App by React', () => {
    beforeEach(() => {
        render(<App />);
    });

    afterEach(() => cleanup());

    test('checks total number of buttons', () => {
        const inputs = document.querySelectorAll('button');
        expect(inputs).toHaveLength(7);
    });
    test('checks total number of crosses', () => {
        const crosses = document.querySelectorAll('.append__cross');
        expect(crosses).toHaveLength(2);
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
});
