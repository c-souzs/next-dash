import React from "react";

import Button from "./Button";

type HeaderRegister = {
    label: string;
    textButton: string;
    handleClick: () => void;
}

const HeaderRegister = ({ label, textButton, handleClick }: HeaderRegister) => {
    return (
        <div className="mt-8">
            <div className="mb-3 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white-50">{ label }</h3>
                <Button onClick={handleClick} color="blue" >{ textButton }</Button>
            </div>
        </div>
    )
}

export default HeaderRegister;