import React from 'react';

interface TextInputProps {
    placeholder: string;
    type: string;
    color: 'black' | 'white';
}

const TextInput: React.FC<TextInputProps> = ({ placeholder, type, color }) => {
    const textColorClass = color === 'white' ? 'text-white' : 'text-black';
    const borderColorClass = color === 'white' ? 'border-white' : 'border-black';
    const placeholderColorClass = color === 'white' ? 'placeholder-white' : 'placeholder-black';

    return (
        <div className={`relative w-full mb-5 border-b ${borderColorClass}`}>
            <input
                type={type}
                placeholder={placeholder}
                className={`border-0 p-0 m-0 bg-transparent ${textColorClass} w-full focus:outline-none ${placeholderColorClass}`}
            />
        </div>
    );
};

export default TextInput;
