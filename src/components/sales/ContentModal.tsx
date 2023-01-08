import { Money } from "phosphor-react";
import { SaleContentModal } from "../../types/sale";

import HeaderModal from "../elements/Modal/Header";
import SaleRead from "../form/sale/Read";
import SaleWrite from "../form/sale/Write";

const ContentModalSale = ({type, saleSelect}: SaleContentModal) => {
    return (
        <>
            <HeaderModal 
                    icon={Money}
                    title="Informações de venda"
            />
            {type === "view" && <SaleRead saleSelect={saleSelect}/>}
            {type === "update" && <SaleWrite type={type} saleSelect={saleSelect}/>}
            {type === "register" && <SaleWrite type={type} />}
        </>
    )
}

export default ContentModalSale;