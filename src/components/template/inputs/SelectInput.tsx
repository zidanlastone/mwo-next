import React, { forwardRef, useEffect, useImperativeHandle, useRef, InputHTMLAttributes, ReactNode, Children, ReactElement, cloneElement } from 'react';

export default forwardRef(function SelectInput(
    { className = '', isFocused = false, children, ...props }: InputHTMLAttributes<HTMLSelectElement> & { isFocused?: boolean },
    ref
) {
    const localRef = useRef<HTMLSelectElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, []);

    return (
        <select
            {...props}
            className={
                'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6' +
                className
            }
            ref={localRef}
        >
            {children}
        </select>
    );
});
