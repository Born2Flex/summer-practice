import { ComponentProps } from 'react';

interface InputProps extends ComponentProps<"input"> {
    label: string;
    name: string;
    type?: string;
    color?: string;
}

function Input({ label, name, type = "text", color = "white", ...rest }: InputProps) {
    return (
        <div className="relative z-0 w-full mb-5">
            <input
                {...rest}
                id={name}
                name={name}
                type={type}
                placeholder=" "
                className={`pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 focus:outline-none focus:ring-0 text-${color}`}
                style={{
                    borderColor: `var(--color-${color})`
                }}
                required
            />
            <label
                htmlFor={name}
                className={`absolute duration-300 top-3 -z-1 origin-0 text-${color}`}
            >
                {label}
            </label>
        </div>
    );
};

export default Input;