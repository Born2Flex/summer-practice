import React, { ComponentProps } from 'react';

interface InputProps extends ComponentProps<"input"> {
    color: 'black' | 'white';
}

const TextInput: React.FC<InputProps> = ({ color, ...props }) => {

    return (
        <div className={`relative w-full mb-5 border-b border-${color}`}>
            <input
                className={`border-0 p-0 m-0 bg-transparent text-${color} w-full placeholder-${color} focus:outline-none focus:ring-0`}
                {...props}
            />
        </div>
    );
};

export default TextInput;
