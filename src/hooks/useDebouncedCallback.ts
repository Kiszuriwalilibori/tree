import { useCallback } from 'react';
import debounce from 'lodash/debounce';

const useDebouncedCallback = (fn: Function, args: any): React.MouseEventHandler<HTMLButtonElement> => {
    const result = useCallback(
        debounce(() => {
            fn(args);
        }, 200),
        [fn],
    );
    return result;
};

export default useDebouncedCallback;
