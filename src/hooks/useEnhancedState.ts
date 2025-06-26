import { useCallback, useMemo, useState } from "react";
function useEnhancedState<T>(initialValue: T) {
    const [value, setValue] = useState<T>(initialValue);

    const resetState = useCallback(() => {
        setValue(initialValue);
    }, [initialValue]);

    const setState = useCallback((newValue: T) => {
        setValue(newValue);
    }, []);

    const isStateSet = useMemo(() => {
        return Boolean(value !== initialValue);
    }, [value, initialValue]);

    return [value, resetState, setState, isStateSet] as const;
}

export default useEnhancedState;
