import { SelectHTMLAttributes } from "react";

export interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    options: {id: number; value: string}[];
}

const Select = ({label, value, setValue, options, ...rest}: ISelectProps) => {
    return (
        <label className="text-lg w-full text-white-50">
            { label }
            <select value={value} onChange={e => setValue(e.target.value)} className='w-full block mt-1 py-1 px-2 cursor-pointer rounded transition-colors outline-none disabled:cursor-auto bg-black-700 text-white-50' {...rest}>
                <option key={0} value='0' className='cursor-pointer bg-black-700'>  Selecione uma opção </option>
                {
                    options.map((option) => {
                        const { id, value } = option;
                        return (
                            <option key={id || value} value={id || value} className='cursor-pointer bg-black-700'>  { value }</option>
                        )
                    })
                }
            </select>
        </label>
    )
}

export default Select;