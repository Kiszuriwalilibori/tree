import isMainTree from '../../../../src/components/AppendItemModal/scripts/isMainTree';

const mockPropsFalse = {
    items: ['Cats', 'Dogs'],
    activeScope: 'People',
};
const mockPropsFalseBis = {
    items: ['Cats', 'People', 'Dogs'],
    activeScope: 'People',
};
const mockPropsTrue = {
    items: ['People', 'Cats', 'Dogs'],
    activeScope: 'People',
};

describe('Given isMainTree function', () => {
    test('when called with certain arguments gives expected results', () => {
        expect(isMainTree(mockPropsFalse)).toBe(false);
        expect(isMainTree(mockPropsTrue)).toBe(true);
        expect(isMainTree(mockPropsFalseBis)).toBe(false);
    });
});
