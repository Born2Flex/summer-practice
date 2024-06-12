import Select, { StylesConfig } from 'react-select'
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

//Styling for the select input
const colourStyles: StylesConfig<any> = {
    control: (styles, { isFocused }) => ({
        ...styles,
        backgroundColor: 'transparent',
        outline: 'none !important',
        border: isFocused ? '1px solid black !important' : '1px solid #b0bec5 !important',
        boxShadow: 'none !important',

        ':active': {
            ...styles[':active'],
            outline: 'none',
            border: '1px solid black !important',
        },
        ':focus': {
            ...styles[':focus'],
            outline: 'none',
            border: '1px solid black !important',
        }

    }),
    option: (styles) => {
        return {
            ...styles,

            ':active': {
                ...styles[':active'],
                outline: 'none',
                border: 'none',
            },
            ':focus': {
                ...styles[':active'],
                outline: 'none',
                border: 'none',
            }
        };
    },
    multiValue: (styles) => {
        return {
            ...styles,
            backgroundColor: '#0e9f6e',
            fontWeight: 'bold',
            borderRadius: '4px',
        };
    },
    multiValueLabel: (styles) => ({
        ...styles,
        color: 'white',
    }),
    multiValueRemove: (styles) => ({
        ...styles,
        color: 'white',
        ':hover': {
            background: '#075239',
            color: 'white',
        },
    }),
};

//SelectInput component, displays customizable a select input field
function SelectInput({ name, options }: { name: string, options: { value: string, label: string }[] }) {
    return (
        <Select
            name={name}
            isSearchable={false}
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={options}
            styles={colourStyles}
            maxMenuHeight={200}
        />
    )
}

export default SelectInput