import { ComponentProps, useState, useRef, useEffect } from 'react';

interface EditableFieldProps extends ComponentProps<"input"> {
    name: string;
    type?: string;
    color?: string;
    initialValue?: string;
}

function EditableField({name, initialValue, type = "text", color = "white", ...rest }: EditableFieldProps) {
    const [value, setValue] = useState(initialValue);
    const [inputWidth, setInputWidth] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (inputRef.current && containerRef.current) {
            const containerWidth = containerRef.current.clientWidth;
            const inputWidth = inputRef.current.scrollWidth;
            setInputWidth(Math.min(containerWidth, inputWidth));
        }
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);
    };

    return (
        <div ref={containerRef} className="relative z-0 w-full mb-4">
            <input
                {...rest}
                ref={inputRef}
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={handleChange}
                placeholder=" "
                style={{
                    borderColor: `var(--color-${color})`,
                    width: inputWidth ? `${inputWidth}px` : 'auto',
                    maxWidth: '100%',
                }}
                className={`pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 focus:outline-none focus:ring-0 text-${color}`}
                required
            />
            {/*<label
                htmlFor={name}
                className={`absolute duration-300 top-3 -z-1 origin-0 text-${color}`}
            >
                {label}
            </label>*/}
        </div>
    );
};

export default EditableField;
