import React, { ChangeEvent } from "react";

const rgxs = {
    email: {
        rgx: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        message: "Preencha um e-mail válido"
    }
}

type TUseInputParams = {
    type: keyof typeof rgxs | null;
}

const useInput = ({ type }: TUseInputParams) => {
    const [value, setValue] = React.useState("");
    const [error, setError] = React.useState<string | null>(null);

    const validate = (enteredValue: string) => {        
        if(!enteredValue.length){
            setError("Campo vazio, preencha um valor.");
            return false;
        } 

        if(!type) return true;

        const applyRgx = rgxs[type].rgx.test(enteredValue);
        if(!applyRgx){
            setError(rgxs[type].message);
            return false;
        }

        setError(null);
        return true;
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const elementValue = e.target.value;
    
        if (error) validate(elementValue);
        // Formatar o valor baseado no type
        setValue(elementValue);
    };

    const onClick = (): void => setError(null);

    return {
        value,
        setValue,
        onChange,
        onClick,
        validateAt: () => validate(value),
        error,
      };
}

export default useInput;