import { useRef, useState } from 'react';

interface EditableFieldProps extends React.ComponentProps<"input"> {
    name: string;
    type?: string;
    color?: string;
    initialValue?: string;
}

function EditableField({ name, initialValue, type = "text", color = "white", ...rest }: EditableFieldProps) {
    const [value, setValue] = useState<string | undefined>(initialValue);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);

        if (inputRef.current) {
            inputRef.current.style.width = '0px';
            const newWidth = inputRef.current.scrollWidth + 'px';
            inputRef.current.style.width = newWidth;
        }
    };

    return (
        <div className="relative z-0 w-full mb-4">
            <input
                ref={inputRef}
                {...rest}
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={handleChange}
                placeholder=" "
                style={{
                    borderColor: `var(--color-${color})`,
                    width: '30%',
                    maxWidth: '100%',
                    minWidth: '30%',
                }}
                className={`pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 focus:outline-none focus:ring-0 text-${color}`}
                required
            />
        </div>
    );
}

export default EditableField;
