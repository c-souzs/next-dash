import React from "react";
import { GlobalCtx } from "../../contexts/Global";

import HeaderRegister from "../elements/HeaderRegister";
import ContentModalSale from "./ContentModal";

const RegisterSales = () => {
    const { setContentModal, setShowModal } = React.useContext(GlobalCtx);

    const handleClickEmployees = () => {
        setShowModal(true);
        setContentModal(<ContentModalSale type="register"/>); 
    }
    
    return (
        <HeaderRegister label="Adicione uma nova venda 💸" textButton="adicione aqui" handleClick={handleClickEmployees}/>
    )
}

export default RegisterSales;