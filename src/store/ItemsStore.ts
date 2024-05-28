import { INITIAL_ITEMS } from "config";
import ItemsClass from "model/Items";

import { create } from "zustand";

interface State {
    items: ItemsClass;
    updateItems: (updatedItems: ItemsClass) => void;
}

export const useItemsStore = create<State>(set => ({
    items: new ItemsClass(INITIAL_ITEMS),
    updateItems: (updatedItems: ItemsClass) => {
        set(() => ({ items: updatedItems }));
    },
}));
