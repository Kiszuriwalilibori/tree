import { Items } from "types";
import { areTablesFittingEachOther } from "./common";

const addItem = (ary1: Items, ary2: Items) => ary1.push(ary2[1]);

export default function createComplementedStore(store: any[], item: Items) {
    if (areTablesFittingEachOther(store, item)) {
        addItem(store, item);
    } else {
        const modifiedArray = [...store.find((element: Items) => areTablesFittingEachOther(element, item)), item[1]];
        const index = store.findIndex((element: Items) => areTablesFittingEachOther(element, item));
        if (index !== -1) {
            store[index] = modifiedArray;
        }
    }

    return store;
}
