import { getAllProducts } from "./getAll";

export const getAlerts = async () => {
    const products = await getAllProducts();
    
    const ending = products.filter(({amount}) => amount < 15).length;
    const excess = products.filter(({amount}) => amount > 100).length;

    const sumPriceSale = products.reduce((acc, {amount, saleValue}) => acc+=amount*saleValue,0);
    const sumPricePurchase = products.reduce((acc, {amount, purchasePrice}) => acc+=amount*purchasePrice,0);

    return {ending, excess, expectedProfit: sumPriceSale - sumPricePurchase};
}