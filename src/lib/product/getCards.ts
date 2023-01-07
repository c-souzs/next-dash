import prismadb from "../prismadb";
import { getAllProducts } from "./getAll";

export const getCards = async () => {
    const products = await getAllProducts();
    const categoriesRegister = await prismadb.category.findMany({});
    
    const categories = categoriesRegister.map(({id, name}) => {
        const hasCategory = products.filter(({categoryId}) => categoryId === id);

        const amountCategory = hasCategory.reduce((acc, {amount}) => acc+=amount, 0);

        return {
            name,
            amount: amountCategory
        }
    });

    const spending = Array(12).fill(undefined).map((_, index) => {
        const productMounth = products.filter(({register}) => {
            const dateRegister = new Date(register);
            const mounth = dateRegister.getMonth();

            return mounth === index;
        });

        const spendingTotal = productMounth.reduce((acc, {amount, purchasePrice}) => amount * purchasePrice, 0);

        return spendingTotal;
    });

    return {categories, spending};
}