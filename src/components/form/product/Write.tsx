import React, { FormEvent } from "react";
import { Product } from "@prisma/client";
import { GlobalCtx } from "../../../contexts/Global";

import useInput from "../../../hooks/useInput";
import { ProductApi, ProductContentModal } from "../../../types/product";
import { api } from "../../../utils/api";
import { formatEua } from "../../../utils/formatDate";
import { fakeProps } from "../../../utils/global";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import Error from "../Error";

const ProductWrite = ({ type, productSelect }: ProductContentModal) => {
    const {value: valueName, setValue: setName, ...restName} = useInput({type: null});
    const {value: valueAmount, setValue: setAmount, ...restAmount} = useInput({type: null});
    const {value: valuePurchase, setValue: setPurchase, ...restPurchase} = useInput({type: "money"});
    const {value: valueSale, setValue: setSale, ...restSale} = useInput({type: "money"});

    const [categoryId, setCategoryId] = React.useState('0');

    const { categories, setNotify, setShowModal, setRefresh } = React.useContext(GlobalCtx);
    const optionsCategory = categories.map(({id, name}) => ({id, value: name}));
    const [date, setDate] = React.useState('');

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<null | string>(null);

    React.useEffect(() => {
        const date = new Date();
        const dateInput = formatEua(date);
        setDate(dateInput);

        if(type !== "update" || !productSelect) return;
        const { name, amount, categoryId, purchasePrice, saleValue, register } = productSelect;
        const dateRegisterFormat = formatEua(new Date(register));

        setDate(dateRegisterFormat);
        setName(name);
        setAmount(amount.toString());
        setPurchase(purchasePrice.toString());
        setSale(saleValue.toString());
        setCategoryId(categoryId.toString());
    }, []);
    
    const handleSubmitProduct = async (e: FormEvent) => {
        e.preventDefault();

        if(categoryId === "0" || valueName === "" || valueAmount === "" || valuePurchase === "" || valueSale === ""){
            setError("Campos incompletos.");

            return;
        }

        const clearMoney = (value: string) => Number(value.substring(3).replace(",", "."));

        const dataProduct = {
            name: valueName, 
            amount: Number(valueAmount), 
            purchase: clearMoney(valuePurchase),
            sale: clearMoney(valueSale), 
            categoryId: Number(categoryId) 
        }

        try {
            if(type == "update" && productSelect){
                const { id } = productSelect;
                await api.put<Product, typeof dataProduct>(`product/${id}`, dataProduct);
            } else {
                await api.post<ProductApi, typeof dataProduct>("product", dataProduct);
            }

            setNotify({
                show: true,
                type: "success"
            });
        } catch (error) {
            setNotify({
                show: true,
                type: "failure"
            });
        } finally {
            setLoading(false);
        }

        setShowModal(false);
        setRefresh(true);
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmitProduct}>
            <Select label="Categoria" value={categoryId} setValue={setCategoryId} options={optionsCategory} />
            <div className="flex gap-6">
                <Input label="Nome" value={valueName} setValue={setName} {...restName} placeholder="Nome"/>
                <Input label="Quantidade" type="number" value={valueAmount} setValue={setAmount} {...restAmount} placeholder="X unidades"/>
            </div>
            <div className="flex gap-6">
                <Input label="Valor de compra" value={valuePurchase} setValue={setPurchase} {...restPurchase} placeholder="R$ 000,00"/>
                <Input label="Valor de venda" value={valueSale} setValue={setSale} {...restSale} placeholder="R$ 000,00"/>
            </div>
            <Input label="Data" type="date" value={date} {...fakeProps}/>
            {error && <Error>{error}</Error>}
            <Button disabled={loading}>Cadastrar</Button>
        </form>
    )
}

export default ProductWrite;