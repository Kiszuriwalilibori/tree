import userEvent from '@testing-library/user-event';
import App from '../../src/components/App';
import AppProvider from '../../src/components/AppProvider';
import ReactDOM from 'react-dom';
import { render, screen, cleanup, waitFor } from '../../test/test-utils/testing-library-utils';

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
        const tree_items = screen.getAllByRole('treeitem');
        console.log();
        // minuses.forEach(async minus => {
        //     const name = minus.getAttribute('aria-controls');
        //     //let element = document.getElementById(name);
        //     const element = screen.getByText(new RegExp(name, 'i'));
        //     //console.log(element, 'element');
        //     //expect(element).toBeNull();
        //     expect(element).toBeInTheDocument();
        //     userEvent.click(minus);
        //     //const target =  document.getElementById(name);
        //     const target = await document.getElementById(name);
        //     console.log(target);
        //     expect(target).toBeNull();
        // });

        const minus = minuses[0];
        const name = minus.getAttribute('aria-controls');
        const element = screen.getByText(new RegExp(name, 'i'));
        expect(element).toBeInTheDocument();
        userEvent.click(minus);
        const target = await waitFor(() => document.getElementById(name));
        expect(target).toBeNull();
    });
});
