import { ProductContentModal } from "../../../types/product";
import { formatEua } from "../../../utils/formatDate";
import { fakeProps } from "../../../utils/global";
import Input from "../Input";
import Select from "../Select";

type ProductRead = Pick<ProductContentModal, 'productSelect'>;

const ProductRead = ({ productSelect }: ProductRead) => {
    if(!productSelect) return null;
    const { name: nameProduct, amount, purchasePrice, saleValue, register, categoryId, category: { id, name }} = productSelect;

    const optionsCategories = [{id, value: name}];
    const dateFormat = formatEua(new Date(register));

    return (
        <form className="flex flex-col gap-4" >
            <Select label="Categoria" value={categoryId.toString()} setValue={() => {}} options={optionsCategories} />
            <div className="flex gap-6">
                <Input label="Nome" value={nameProduct} {...fakeProps} />
                <Input label="Quantidade" value={amount.toString()} {...fakeProps} placeholder="X unidades"/>
            </div>
            <div className="flex gap-6">
                <Input label="Valor de compra" value={purchasePrice.toString()} {...fakeProps} placeholder="R$ 000,00"/>
                <Input label="Valor de venda" value={saleValue.toString()} {...fakeProps} placeholder="R$ 000,00"/>
            </div>
            <Input label="Data" type="date" value={dateFormat} {...fakeProps}/>
        </form>
    )
}

export default ProductRead;