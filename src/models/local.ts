import { ID, Items } from "types/index";

export function isIdUnique(items: Items, id: ID) {
    const result = items.some(item => item.id === id);
    return result === false ? true : false;
}
