import { ChangeEvent, Dispatch, InputHTMLAttributes, SetStateAction } from "react";
import Error from "./Error";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    label?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onClick?: () => void;
    validateAt?: () => boolean;
    error: string | null; 
}

const Input = ({ value, setValue, label, onChange, onClick, validateAt, error, ...rest }: IInputProps) => {
    return (
        <label className={'w-full text-lg text-white-50'}>
            {label}
            <input
                onClick={onClick}
                onChange={onChange}
                onBlur={validateAt} 
                className='block w-full px-3 py-2 mt-1 rounded text-base outline-none text-black-900 border-2 border-black-400 transition-colors  hover:border-black-800 focus:border-black-800 disabled:border-black-800 disabled:text-white-50' 
                {...rest} />
            {error && <Error>{ error }</Error>}
        </label>
    )
}

export default Input;