import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { Items } from "../types";
import { INITIAL_ITEMS } from "../config";
import { createComplementedStore, removeNode } from "../functions";

interface ItemsState {
    items: Items;
    removeItem: (item: string[]) => void;
    appendItem: (items: Items) => void;
}

const useItems = create<ItemsState>()(
    devtools(set => ({
        items: INITIAL_ITEMS,
        removeItem: (payload: string[]) => {
            set((state: ItemsState) => ({ items: removeNode([...state.items], payload) }));
        },
        appendItem: (payload: Items) => {
            set((state: ItemsState) => ({ items: createComplementedStore([...state.items], payload) }));
        },
    }))
);

export default useItems;

export const useItemsSelector = () => {
    return useItems(state => state.items);
};
