import { create } from "zustand";
import createSelectors from "./createSelectors";

const INITIAL_MODAL_STATE = false;

interface ModalState {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    // toggleModal:() => void;
}

const useModalStoreBase = create<ModalState>()(set => ({
    isModalOpen: INITIAL_MODAL_STATE,
    closeModal: () => {
        set(() => ({ isModalOpen: INITIAL_MODAL_STATE }));
    },
    openModal: () => {
        set(() => ({ isModalOpen: true }));
    },


}));

export const useModalStore = createSelectors(useModalStoreBase);
