import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../test/test-utils/testing-library-utils';
import { InitialNodes } from '../../src/config';
import App from '../../src/components/App';
import AppProvider from '../../src/components/AppProvider';
import ReactDOM from 'react-dom';

describe('App tests suite', () => {
    test('App renders initially all nodes with tree_item role that are specified in InitialNodes, as well as buttons', () => {
        render(<App />);
        const tree_items = screen.getAllByRole('tree_item');
        const tree_items_texts = tree_items.map(item => {
            return item.textContent;
        });
        expect(tree_items.length).toBe(InitialNodes.length);
        expect(tree_items_texts).toEqual(InitialNodes);
    });
});

describe('App by Jest', () => {
    let container: HTMLDivElement;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(
            <AppProvider>
                <App />
            </AppProvider>,
            container,
        );
    });

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
        jest.clearAllMocks();
    });

    test('checks total number of buttons', () => {
        const inputs = document.querySelectorAll('button');
        expect(inputs).toHaveLength(7);
    });
    test('checks total number of crosses', () => {
        const crosses = document.querySelectorAll('.append__cross');
        expect(crosses).toHaveLength(2);
    });

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
});

////////////////////////////////////////////////////////////////////////
