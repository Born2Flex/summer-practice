import React from 'react';

interface SignUpButtonProps {
    color: string;
}

// ATTENTION: animations for buttons are default to ease debugging and analising layout
const SignUpButton: React.FC<SignUpButtonProps> = ({ color = 'black' }) => {
    return (
        <button
            style={{ backgroundColor: color }}
            className={`text-white rounded-full px-4 py-4 flex items-center`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 ml-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M18 6l4 6m0 0l-4 6m4-6H3"
                    className="text-white"
                />
            </svg>
        </button>
    );
};

export default SignUpButton;
