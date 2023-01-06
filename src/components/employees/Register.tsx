import React from "react";
import { GlobalCtx } from "../../contexts/Global";

import HeaderRegister from "../elements/HeaderRegister";
import ContentModalEmployee from "./ContentModal";

const RegisterEmployees = () => {
    const { setContentModal, setShowModal } = React.useContext(GlobalCtx);

    const handleClickEmployees = () => {
        setShowModal(true);
        setContentModal(<ContentModalEmployee type="register"/>); 
    }
    
    return (
        <HeaderRegister label="Contrate um novo funcionário 📋" textButton="adicione aqui" handleClick={handleClickEmployees}/>
    )
}

export default RegisterEmployees;