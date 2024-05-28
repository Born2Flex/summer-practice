import Select, { StylesConfig } from 'react-select'
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' }
// ]

const colourStyles: StylesConfig<any> = {
    control: (styles) => ({
        ...styles,
        backgroundColor: 'transparent',
        outline: 'none !important',
        border: '1px solid #b0bec5 !important',
        boxShadow: 'none !important',
    }),
    option: (styles, { }) => {
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
};

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
        />
    )
}

export default SelectInput