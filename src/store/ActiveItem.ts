import { Item } from "types";
import { create } from "zustand";
import createSelectors from "./createSelectors";

const initialActiveItem = undefined;

interface ActiveItemState {
    activeItem: Item | undefined;
    setActiveItem: (item: Item) => void;
}

const useActiveItemStoreBase = create<ActiveItemState>()(set => ({
    activeItem: initialActiveItem,
    setActiveItem: item => set(state => ({ activeItem: item })),
}));

export const useActiveItemStore = createSelectors(useActiveItemStoreBase);
