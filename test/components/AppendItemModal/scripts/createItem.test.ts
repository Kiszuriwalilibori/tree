import createItem from '../../../../src/components/AppendItemModal/scripts/createItem';

const isMainTree: jest.Mock = jest.fn();

jest.mock('../../../../src/components/AppendItemModal/scripts/isMainTree', () => () => isMainTree());

const args = {
    props: { activeScope: 'mockActiveScope', items: ['a', 'b'] },
    visibleValues: { inputValue: 'aaaaa', isNotValidated: false, shouldInitializeCategory: false },
    submittedValues: { inputValue: 'aaaaa', isNotValidated: false, shouldInitializeCategory: false },
};
const argsX = {
    props: { activeScope: 'mockActiveScope', items: ['a', 'b'] },
    visibleValues: {
        inputValue: 'mockXvaiiblevaluesinputvalue',
        isNotValidated: false,
        shouldInitializeCategory: true,
    },
    submittedValues: { inputValue: 'aaaaa', isNotValidated: false, shouldInitializeCategory: true },
};

describe('Given createItem function', () => {
    test('', () => {
        isMainTree.mockReturnValue(false);
        expect(createItem(args.props, args.visibleValues, args.submittedValues)).toBe(
            args.submittedValues.inputValue,
        );
    });
    test('', () => {
        isMainTree.mockReturnValue(true);
        expect(createItem(args.props, args.visibleValues, args.submittedValues)).toBe(
            args.visibleValues.inputValue,
        );
    });
    test('', () => {
        isMainTree.mockReturnValue(true);
        expect(createItem(argsX.props, argsX.visibleValues, argsX.submittedValues)).toStrictEqual([
            argsX.visibleValues.inputValue,
        ]);
    });
});
