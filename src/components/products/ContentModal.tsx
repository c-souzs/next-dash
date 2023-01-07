import { Money } from "phosphor-react";
import { ProductContentModal } from "../../types/product";

import HeaderModal from "../elements/Modal/Header";
import ProductRead from "../form/product/Read";
import ProductWrite from "../form/product/Write";

const ContentModalProduct = ({type, productSelect}: ProductContentModal) => {
    return (
        <>
            <HeaderModal 
                    icon={Money}
                    title="Informações de venda"
            />
            {type === "view" && <ProductRead productSelect={productSelect}/>}
            {type === "update" && <ProductWrite type={type} productSelect={productSelect}/>}
            {type === "register" && <ProductWrite type={type} />}
        </>
    )
}

export default ContentModalProduct;