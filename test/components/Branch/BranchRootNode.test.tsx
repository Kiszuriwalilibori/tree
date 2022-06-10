import BranchRootNode from '../../../src/components/Branch/BranchRootNode';
import { render, cleanup } from '../../test-utils/testing-library-utils';

const props = {
    string: '123testString',
};
const deleteButtonText = 'DeleteButton';
const secondaryHeaderText = 'mocksecondaryHeaderText';
const mockDeletItemButton = jest.fn();

jest.mock('../../../src/components/DeleteItemButton/DeleteItemButton', () => props => {
    mockDeletItemButton(props);
    return <div>{deleteButtonText}</div>;
});

const mockSecondaryHeaderText = jest.fn();

jest.mock('../../../src/components/Branch/SecondaryHeaderText', () => props => {
    mockSecondaryHeaderText(props);
    return <div>{secondaryHeaderText}</div>;
});

beforeEach(() => {
    render(<BranchRootNode {...props} />);
});
afterEach(() => cleanup());

describe('Given BranchRootNode component', () => {
    describe('when called with given props', () => {
        test('It displays div with proper class', () => {
            const div = document.querySelector('div.element');
            expect(div).toBeInTheDocument();
        });
        test('It has second child being component DeleteItemButton', () => {
            const secondChild = document.querySelector('div.element').children[1];
            expect(secondChild).toBeInTheDocument();
            expect(secondChild).toHaveTextContent(deleteButtonText);
        });
        test('Its second child is called with proper props', () => {
            expect(mockDeletItemButton).toHaveBeenCalledWith(
                expect.objectContaining({
                    nodeText: props.string,
                }),
            );
        });
        test('It has first child being component SecondaryHeaderText', () => {
            const firstChild = document.querySelector('div.element').children[0];
            expect(firstChild).toBeInTheDocument();
            expect(firstChild).toHaveTextContent(secondaryHeaderText);
        });
        test('Its first child is called with proper props', () => {
            expect(mockSecondaryHeaderText).toHaveBeenCalledWith(
                expect.objectContaining({
                    str: props.string,
                }),
            );
        });
    });
});
