import userEvent from '@testing-library/user-event';
import { TextItem } from '../../../../src/components/Tree/parts/TextItem';
import AppProvider from '../../../../src/components/AppProvider';
import ReactDOM from 'react-dom';
import { render, screen, cleanup } from '../../../test-utils/testing-library-utils';

describe('TextItem test suite', () => {
    var testString = 'testString';
    beforeEach(() => {
        render(<TextItem string={testString} />);
    });

    afterEach(() => cleanup());
    test('It displays text passed in props', () => {
        const text = screen.getByText(new RegExp(testString, 'i'));
        expect(text).toBeInTheDocument();
        expect(text).toHaveClass('TextItem');
    });
});
