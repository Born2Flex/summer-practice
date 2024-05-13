import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { ComponentProps } from 'react';

interface DropListProps extends ComponentProps<"div"> {
    items: string[];
    disabled?: boolean;
}

function DropList({ items, disabled = false, ...props }: DropListProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(items[0]); 
    const dropListRef = useRef<HTMLDivElement>(null);

    const toggleList = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const onItemClick = (item: string) => {
        console.log(item);
        setSelectedItem(item);
        setIsOpen(false);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropListRef.current && !dropListRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div>
        <div {...props} ref={dropListRef}>
            <button
                onClick={toggleList}
                disabled={disabled}
                className="flex items-center justify-center"
            >
                <div className="mr-3 font-medium text-white">{selectedItem}</div>
                <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} className='text-white w-6 h-6' />
            </button>
            {isOpen && (
                <div className="absolute z-10 top-full left-0 mt-1 min-w-full max-h-52 w-fit bg-white shadow-2xl rounded-md overflow-y-auto">
                    {items.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => onItemClick(item)}
                            className="block px-4 py-2 text-sm text-gray-700 w-full text-left overflow-wrap rounded-md hover:bg-gray-100 focus:bg-gray-100"
                        >
                            {item}
                        </button>
                    ))}
                </div>
            )}
        </div>
        </div>
    );
}

export default DropList;
