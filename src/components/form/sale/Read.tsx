import { SaleContentModal } from "../../../types/sale";
import { formatEua } from "../../../utils/formatDate";
import { fakeProps } from "../../../utils/global";
import Input from "../Input";
import Select from "../Select";

const SaleRead = ({saleSelect}: Pick<SaleContentModal, 'saleSelect'>) => {
    if(!saleSelect) return null;
    const { amount, productId, register, product: { name }, value } = saleSelect;
    return (
        <form className="flex flex-col gap-4">
            <Select label="Produto" value={productId.toString()} setValue={() => {}} options={[{id: 1, value: name}]}/>
            <div className="flex gap-6">
                <Input label="Quantidade" value={amount.toString()} {...fakeProps} />
                <Input label="Data" type="date" value={formatEua(new Date(register))} {...fakeProps}/>
            </div>
            <Input label="Valor" value={value.toString()} {...fakeProps} />
        </form>
    )
}

export default SaleRead;