import Branch from '../../../src/components/Branch/Branch';
import { render, cleanup, screen } from '../../test-utils/testing-library-utils';

const props = {
    ary: ['123testString', '456test'],
};

beforeEach(() => {
    render(<Branch {...props} />);
});
afterEach(() => cleanup());

const mockAppendItemButtonText = 'Hi from MockAppendItemButton';
const mockAppendItemButton = jest.fn();

jest.mock('../../../src/components/AppendItemButton', () => props => {
    mockAppendItemButton(props);
    return <div>{mockAppendItemButtonText}</div>;
});

const mockEnhancedElement = jest.fn();

const mockEnhancedElementText = 'Hi from enHancedElement';

jest.mock('../../../src/components/Branch/SecondaryHeaderText', () => props => {
    mockEnhancedElement(props);
    return <div>{mockEnhancedElementText}</div>;
});

describe('Given Branch component', () => {
    describe('when called with given props', () => {
        test('It displays div with proper class', () => {
            const div = document.querySelector('div.contentWrapperSecondary');
            expect(div).toBeInTheDocument();
        });
        test('It has last child being component AppendItemButton', () => {
            const lastChild = document.querySelector('div.contentWrapperSecondary').lastElementChild;
            expect(lastChild).toBeInTheDocument();
            expect(lastChild).toHaveTextContent(mockAppendItemButtonText);
        });
        test('Its last child is called with proper props', () => {
            const header = props.ary.shift() as string;
            expect(mockAppendItemButton).toHaveBeenCalledWith(
                expect.objectContaining({
                    str: header,
                    primary: false,
                }),
            );
        });
        test('It has children being EnancedElement components which are called with proper props', () => {
            const header = props.ary.shift() as string;
            props.ary.forEach((item, index) => {
                const child = document.querySelector('div.contentWrapperSecondary').children[index];
                expect(child).toHaveTextContent(mockEnhancedElementText);
                expect(mockEnhancedElement).toHaveBeenCalledWith(
                    expect.objectContaining({
                        key: item,
                        item: item,
                        header: header,
                    }),
                );
            });
        });
    });
});
