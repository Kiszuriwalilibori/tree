import BasicNode from '../../../src/components/common/BasicNode';
import { render, cleanup } from '../../test-utils/testing-library-utils';

const props = {
    item: 'testItem',
    header: 'testHeader',
};

const sampleText1 = 'TextItem';
const sampleText2 = 'DeleteItemButton';

beforeEach(() => {
    render(<BasicNode {...props} />);
});
afterEach(() => cleanup());

const mockTextItem = jest.fn();

jest.mock('../../../src/components/common/TextItem', () => props => {
    mockTextItem(props);
    return <div>{sampleText1}</div>;
});

const mockDeletItemButton = jest.fn();

jest.mock('../../../src/components/DeleteItemButton/DeleteItemButton', () => props => {
    mockDeletItemButton(props);
    return <div>{sampleText2}</div>;
});

describe('Given BasicNode component', () => {
    describe('when called with given props', () => {
        test('It displays div with id being item and proper class', () => {
            const div = document.querySelector('div.node#testItem');
            expect(div).toBeInTheDocument();
        });
        test('It has first child being span with text content being item', () => {
            const firstChild = document.getElementById(props.item).children[0];
            expect(firstChild).toHaveTextContent(sampleText1);
        });
        test('It has second child being being button', () => {
            const secondChild = document.getElementById(props.item).children[1];
            expect(secondChild).toHaveTextContent(sampleText2);
        });

        test('passes expected props to TextItem child component', () => {
            expect(mockTextItem).toHaveBeenCalledWith(
                expect.objectContaining({
                    str: props.item,
                }),
            );
        });
        test('passes expected props to DeleteItemButton child component', () => {
            expect(mockDeletItemButton).toHaveBeenCalledWith(
                expect.objectContaining({
                    nodeText: props.item,
                }),
            );
        });
    });
});
