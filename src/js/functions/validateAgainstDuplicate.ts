import { getFlattenArray } from "./functions";
import { Items } from "../../types";

function validateAgainstDuplicate(array: Items, item: string[]): boolean {
    const flatten = getFlattenArray(array);
    return !flatten.includes(item[1]);
}

export default validateAgainstDuplicate;
