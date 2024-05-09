import React from 'react';

const LeftArrowIcon: React.FC = () => {
    return (
        <svg
            className="absolute top-0 left-0 transform -translate-x-3 -translate-y-3 h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 12H4"></path>
            <path d="M14 16l-4-4 4-4"></path>
        </svg>
    );
};

export default LeftArrowIcon;
