import React from 'react';

interface LinkTextProps {
    text: string;
    onClick: () => void;
}

const LinkText: React.FC<LinkTextProps> = ({ text, onClick }) => {
    return (
        <div className="text-black w-fit text-left cursor-pointer hover:underline" onClick={onClick}>
            {text}
        </div>
    );
};

export default LinkText;
