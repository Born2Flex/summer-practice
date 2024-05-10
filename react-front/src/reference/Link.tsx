import React from 'react';

interface ClickableTextProps {
    text: string;
    onClick: () => void;
}

const Link: React.FC<ClickableTextProps> = ({ text, onClick }) => {
    return (
        <div className="text-black w-fit text-left cursor-pointer hover:underline" onClick={onClick}>
            {text}
        </div>
    );
};

export default Link;
