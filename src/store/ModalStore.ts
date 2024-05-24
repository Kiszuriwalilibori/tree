import { create } from "zustand";
import createSelectors from "./createSelectors";
import { Item } from "types/index";

const INITIAL_MODAL_STATE = false;

interface ModalState {
    currentItem: Item | undefined;
    isModalOpen: boolean;
    openModal: (currentItem: Item) => void;
    closeModal: () => void;
    // toggleModal:() => void;
}

const useModalStoreBase = create<ModalState>()(set => ({
    currentItem: undefined,
    isModalOpen: INITIAL_MODAL_STATE,
    closeModal: () => {
        set(() => ({ isModalOpen: INITIAL_MODAL_STATE }));
    },
    openModal: currentItem => {
        set(() => ({ isModalOpen: true, currentItem }));
    },
}));

export const useModalStore = createSelectors(useModalStoreBase);
