import { useCallback } from "react";
import debounce from "lodash/debounce";

function useDebouncedCallback<T>(fn: Function, args?: any): React.MouseEventHandler<T> {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const result: React.MouseEventHandler<T> = useCallback(
        debounce(() => {
            fn(args);
        }, 200),
        [fn, args]
    );
    return result;
}

export default useDebouncedCallback;
