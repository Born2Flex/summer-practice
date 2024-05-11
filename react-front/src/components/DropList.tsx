import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ComponentProps } from 'react';

interface DropListProps extends ComponentProps<"div"> {
    items: { text: string, icon: IconDefinition }[];
    disabled?: boolean;
}

function DropList({ items, disabled = false, ...props }: DropListProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleList = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const onItemClick = (item: { text: string, icon: IconDefinition }) => {
        // Do something with the selected item
        console.log(item.text);
        setIsOpen(false);
    };

    return (
        <div {...props}>
            <button
                onClick={toggleList}
                disabled={disabled}
                className="flex items-center justify-center"
            >
                <FontAwesomeIcon icon={items[0].icon} className='text-white w-6 h-6' />
            </button>
            {isOpen && (
                <div className="absolute top-full mt-1 w-48 bg-white shadow-lg rounded-md">
                    {items.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => onItemClick(item)}
                            className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100 focus:bg-gray-100"
                        >
                            <FontAwesomeIcon icon={item.icon} className='text-gray-500 mr-2' />
                            {item.text}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DropList;
