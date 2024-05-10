import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ComponentProps } from 'react';

interface ButtonProps extends ComponentProps<"button"> {
    icon: IconDefinition;
    disabled?: boolean
}

function RoundButton({ icon, disabled = false, ...props }: ButtonProps) {

    return (
        <button
            disabled={disabled}
            {...props}
        >
            {disabled ? <div className="absolute w-full h-full bg-black opacity-50 rounded-full" /> : <FontAwesomeIcon icon={icon} className='text-white w-6 h-6' />}
        </button>
    );
};

export default RoundButton;
