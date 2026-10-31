import { useState } from 'react';

export function useToggle<T>(initial: T) {
    const [value, setValue] = useState(initial);
    return { value, setValue };
}
