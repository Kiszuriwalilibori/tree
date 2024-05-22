import { useCallback, useMemo, useState } from "react";

function useEnhancedState(initialValue) {
    const [value, setValue] = useState(initialValue);

    const resetState = useCallback(() => {
        setValue(initialValue);
    }, [initialValue]);

    const setState = useCallback(newValue => {
        setValue(newValue);
    }, []);

    const isStateSet = useMemo(() => {
        return Boolean(value !== initialValue);
    }, [value, initialValue]);

    return [value, resetState, setState, isStateSet] as const;
}

export default useEnhancedState;
