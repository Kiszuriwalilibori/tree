import TextItem from '../../../src/components/common/TextItem';
import { render, screen, cleanup } from '../../test-utils/testing-library-utils';

var testString = 'testString';

beforeEach(() => {
    render(<TextItem str={testString} />);
});
afterEach(() => cleanup());

describe('Given TextItem component', () => {
    describe('when called with given props', () => {
        test('It displays text passed in props', () => {
            const text = screen.getByText(new RegExp(testString, 'i'));
            expect(text).toBeInTheDocument();
        });
        test('It displays component with proper class', () => {
            const text = screen.getByText(new RegExp(testString, 'i'));
            expect(text).toHaveClass('TextItem');
        });
    });
});
