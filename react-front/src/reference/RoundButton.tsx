import React from 'react';

interface RoundButtonProps {
    iconUrl: string;
    backgroundColor?: string;
    padding?: number;
}

const RoundButton: React.FC<RoundButtonProps> = ({ iconUrl, backgroundColor = 'transparent', padding=2 }) => {
    const backgroundColorClass = backgroundColor;
    const paddingClass = padding;

    return (
        <button
            style={{ backgroundColor: backgroundColorClass }}
            className={`flex items-center justify-center rounded-full p-${paddingClass} w-fit h-fit`}
        >
            <img src={iconUrl} className="w-6 h-6" />
        </button>
    );
};

export default RoundButton;
