import React from "react";
import { GlobalCtx } from "../../contexts/Global";

import HeaderRegister from "../elements/HeaderRegister";
import ContentModalProduct from "./ContentModal";

const RegisterProducts = () => {
    const { setContentModal, setShowModal } = React.useContext(GlobalCtx);

    const handleClickEmployees = () => {
        setShowModal(true);
        setContentModal(<ContentModalProduct type="register"/>); 
    }
    
    return (
        <HeaderRegister label="Adicione um novo produto 📦" textButton="adicione aqui" handleClick={handleClickEmployees}/>
    )
}

export default RegisterProducts;