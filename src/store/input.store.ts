import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { VERY_FIRST_ITEM } from "../config";

interface Input {
    activeScope: string;
    isAppendItemModalVisible: boolean;
}
const initialInputState: Input = {
    activeScope: VERY_FIRST_ITEM,
    isAppendItemModalVisible: false,
};

interface InputState {
    input: Input;
    initAppend: (item: string) => void;
    closeInput: () => void;
}

const useInput = create<InputState>()(
    devtools(set => ({
        input: initialInputState,
        initAppend: payload => {
            set(() => ({ input: { activeScope: payload, isAppendItemModalVisible: true } }));
        },
        closeInput: () => {
            set(() => ({ input: initialInputState }));
        },
    }))
);

export default useInput;
