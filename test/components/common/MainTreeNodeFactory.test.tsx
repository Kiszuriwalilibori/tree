import MainTreeNodeFactory from '../../../src/components/common/MainTreeNodeFactory';
import { render, screen, cleanup, act, waitFor } from '../../test-utils/testing-library-utils';

const propsString = {
    itemOrItemsArray: 'testString',
    header: 'testHeader',
};

const propsArray = {
    itemOrItemsArray: ['testString1', 'teststring2'],
    header: 'testHeader',
};

const mockBasicNode = jest.fn();

jest.mock('../../../src/components/common/BasicNode', () => props => {
    mockBasicNode(props);
    return null;
});

const mockBranch = jest.fn();

jest.mock('../../../src/components/Branch/Branch', () => props => {
    mockBranch(props);
    return null;
});

afterEach(() => cleanup());

describe('Given BasicNode component', () => {
    describe('when called with itemOrItemsArray prop being string', () => {
        test('renders BasicNode component', () => {
            render(<MainTreeNodeFactory {...propsString} />);
            expect(mockBasicNode).toHaveBeenCalledWith(
                expect.objectContaining({
                    item: propsString.itemOrItemsArray,
                    header: propsString.header,
                }),
            );
        });

        describe('when called with itemOrItemsArray prop being array of strings', () => {
            test('renders Branch component', () => {
                render(<MainTreeNodeFactory {...propsArray} />);
                expect(mockBranch).toHaveBeenCalledWith(
                    expect.objectContaining({
                        ary: propsArray.itemOrItemsArray,
                    }),
                );
            });
        });
    });
});
