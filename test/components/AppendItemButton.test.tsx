import AppendItemButton from '../../src/components/AppendItemButton';
import { render, cleanup } from '../test-utils/testing-library-utils';
import { fireEvent } from '@testing-library/react';

afterEach(() => cleanup());

const propsFalse = {
    str: '123testString',
    primary: false,
};
const propsTrue = {
    str: '123testString',
    primary: true,
};

const actions = {
    initAppend: jest.fn(),
};

jest.mock('../../src/hooks/useDispatchAction.ts', () => () => actions);

describe('Given AppendItem component', () => {
    describe('when called with propsFalse props', () => {
        test('It displays button with proper class, title and aria-label and div with cross', () => {
            render(<AppendItemButton {...propsFalse} />);
            const button = document.querySelector(
                `button.append-secondary[title=${`append-secondary-button`}][aria-label=${`append-button`}]`,
            );
            expect(button).toBeInTheDocument();
            const cross = document.querySelector('div.append__cross');
            expect(cross).toBeInTheDocument();
        });
    });

    describe('when called with propsTrue props', () => {
        test('It displays button with proper class, title and aria-label and div with cross', () => {
            render(<AppendItemButton {...propsTrue} />);
            const button = document.querySelector(
                `button.append-primary[title=${`append-primary-button`}][aria-label=${`append-button`}]`,
            );
            expect(button).toBeInTheDocument();
            const cross = document.querySelector('div.append__cross');
            expect(cross).toBeInTheDocument();
        });
    });
    describe('displayed button, when clicked', () => {
        test('dispatches proper action', () => {
            render(<AppendItemButton {...propsTrue} />);
            const button = document.querySelector(
                `button.append-primary[title=${`append-primary-button`}][aria-label=${`append-button`}]`,
            );
            fireEvent.click(button);
            expect(actions.initAppend).toHaveBeenCalledTimes(1);
            expect(actions.initAppend).toHaveBeenCalledWith(propsTrue.str);
        });
    });
});
