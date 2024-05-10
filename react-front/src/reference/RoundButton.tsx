import React from 'react';

interface RoundButtonProps {
    iconUrl: string;
    backgroundColor?: string;
    padding?: number;
    disabled?: boolean;
}

const RoundButton: React.FC<RoundButtonProps> = ({ iconUrl, backgroundColor = 'transparent', padding = 2, disabled = false }) => {
    const backgroundColorClass = backgroundColor;
    const paddingClass = padding;

    return (
        <button
            style={{ backgroundColor: backgroundColorClass }}
            className={`flex items-center justify-center rounded-full p-${paddingClass} w-fit h-fit`}
            disabled={disabled}
        >
            {disabled ? <div className="absolute w-full h-full bg-black opacity-50 rounded-full" /> : <img src={iconUrl} className="w-6 h-6" />}
        </button>
    );
};

export default RoundButton;
