import { getFlattenArray } from './functions';
import { itemsType } from '../../types';

function validateAgainstDuplicate(array: itemsType, item: string[]): boolean {
    const flatten = getFlattenArray(array);
    return !flatten.includes(item[1]);
}

export default validateAgainstDuplicate;
