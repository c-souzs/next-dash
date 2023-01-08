import { SaleApi } from "../../types/sale";
import { getAllSales } from "./getAll";

export const getAlertsSales = async () => {
    const sales = await getAllSales();
    
    const profitSales = sales.reduce((acc, {value}) => acc+=value, 0);

    let sale: SaleApi | null = null;
    let amountSale = 0;

    for (let i = 0; i < sales.length; i++) {
        const saleRef = sales[i];
        const amount = sales.filter(({id}) => id === saleRef.id).reduce((acc, {amount}) => acc+=amount,0);

        if(amount > amountSale) {
            sale = saleRef;
            amountSale = amount;
        }
    }
    
    const salesMouth = sales.filter(({register}) => {
        const dateActual = new Date();
        const dateSale = new Date(register);

        return dateActual.getMonth() === dateActual.getMonth();
    }).reduce((acc, {value}) => acc+=value, 0);

    return {profitSales, salesMouth: salesMouth, moreSale: {sale, amountSale}};
}