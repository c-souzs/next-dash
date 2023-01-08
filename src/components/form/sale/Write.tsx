import React, { FormEvent} from "react";

import { Sale } from "@prisma/client";
import { useSession } from "next-auth/react";

import { GlobalCtx } from "../../../contexts/Global";
import useInput from "../../../hooks/useInput";
import { SaleContentModal } from "../../../types/sale";
import { AuthUser } from "../../../types/user";
import { api } from "../../../utils/api";
import { formatEua } from "../../../utils/formatDate";
import { fakeProps } from "../../../utils/global";

import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import Error from "../Error";

const SaleWrite = ({type, saleSelect}: SaleContentModal) => {
    const { value: valueAmount, setValue: setAmount, ...restAmount } = useInput({type: null});

    const [productId, setProductId] = React.useState("0");
    
    const { products } = React.useContext(GlobalCtx);
    
    const optionsProducts = products.filter(({amount}) => amount > 0).map(({id, name}) => ({id, value: name}));
    const [date, setDate] = React.useState('');
    const [value, setValue] = React.useState('');

    const { setNotify, setShowModal, setRefresh } = React.useContext(GlobalCtx);
    const {data: session} = useSession();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<null | string>(null);

    React.useEffect(() => {
        const date = new Date();
        const dateInput = formatEua(date);
        setDate(dateInput);
        
        if(type !== "update" && !saleSelect) return;
        const { amount, productId, register, value } = saleSelect!;

        setValue(value.toString());
        setAmount(amount.toString());;
        setProductId(productId.toString());
        setDate(formatEua(new Date(register)));
    }, []);

    React.useEffect(() => {
        if(productId === "0" || valueAmount === "") return;
        const dataProduct = products.find(({id}) => id === Number(productId));
        if(!dataProduct) return;

        const { saleValue } = dataProduct;
        const saleValueTotal = Number(valueAmount) * saleValue;

        setValue(saleValueTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }));

    }, [productId, valueAmount]);

    const handleSubmitSaleWrite = async (e: FormEvent) => {
        e.preventDefault();
        
        if(productId === "0" || valueAmount === "") {
            setError("Campos incompletos.");

            return;
        }

        const { user } = session!;
        const { id } = user! as AuthUser;

        const clearMoney = (value: string) => Number(value.substring(3).replace(",", "."));

        const dataSale = {
            amount: Number(valueAmount),
            productId: Number(productId),
            userId: id,
            value: clearMoney(value)
        }

        try {
            if(type == "update" && saleSelect){
                const { id } = saleSelect;
                await api.put<Sale, typeof dataSale>(`sale/${id}`, dataSale);
            } else {
                await api.post<Sale, typeof dataSale>("sale", dataSale);
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
        <form className="flex flex-col gap-4" onSubmit={handleSubmitSaleWrite}>
            <Select label="Produto" value={productId} setValue={setProductId} options={optionsProducts}/>
            <div className="flex gap-6">
                <Input label="Quantidade" type="number" value={valueAmount} setValue={setAmount} {...restAmount} />
                <Input label="Data" type="date" value={date} {...fakeProps}/>
            </div>
            {productId !== "0" && valueAmount !== "" && <Input label="Valor" value={value} {...fakeProps}/>}
            {error && <Error>{error}</Error>}
            <Button disabled={loading}>Vender</Button>
        </form>
    )
}

export default SaleWrite;