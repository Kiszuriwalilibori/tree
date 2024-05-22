import { InitialItems } from "assets/InitialItems";
import { Items } from "types";
import { create } from "zustand";
import createSelectors from "./createSelectors";

interface ItemsState {
    items: Items;
    updateItemsStore: (updatedItems: Items) => void;
}

const useItemsStoreBase = create<ItemsState>()(set => ({
    items: InitialItems,
    updateItemsStore: updatedItems => {
        set(() => ({ items: updatedItems }));
    },
}));

export const useItemsStore = createSelectors(useItemsStoreBase);
