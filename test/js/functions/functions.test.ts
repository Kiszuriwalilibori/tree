import { tablesFit, validateAgainstDuplicate } from '../../../src/js/functions/functions';
import { initialData } from '../../../src/config';
import { Items } from '../../../src/config';

describe('functions tests suite', () => {
    test('function tableFits', () => {
        expect(tablesFit(initialData, ['1', '2'])).toBe(false);
        expect(tablesFit(initialData, [Items.VERY_FIRST_ITEM, '2'])).toBe(true);
    });

    test('function validateAgainstDuplicate', () => {
        console.log(initialData);
        expect(validateAgainstDuplicate(initialData, ['xxxxxxxxxxxxxxxx', Items.VERY_FIRST_ITEM])).toBe(
            false,
        );
        expect(validateAgainstDuplicate(initialData, ['2', 'xxxxxxxxxxx'])).toBe(true);
    });
});
