import userEvent from '@testing-library/user-event';
import { TextItem } from '../../../../src/components/Tree/parts/TextItem';
import AppProvider from '../../../../src/components/AppProvider';
import ReactDOM from 'react-dom';
import enhanced from '../../../../src/components/Tree/parts/enhanced';
import { render, screen, cleanup } from '../../../test-utils/testing-library-utils';

var testString = 'testString';
let Component = <TextItem string={testString}></TextItem>;

describe('Enhanced test suite', () => {
    var testString = 'testString';
    beforeEach(() => {
        const Result = enhanced(Component);
        render(enhanced(Component));
    });

    afterEach(() => cleanup());
    test.skip('It displays component with its prop string and class as it was without enhancing', () => {
        const text = screen.getByText(new RegExp(testString, 'i'));
        expect(text).toBeInTheDocument();
        expect(text).toHaveClass('TextItem');
    });
});
