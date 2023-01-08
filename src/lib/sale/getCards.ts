import prismadb from "../prismadb";
import { getAllSales } from "./getAll";

export const getCardsSales = async () => {
    const sales = await getAllSales();
    const categoriesRegister = await prismadb.category.findMany({});
    
    const value = Array(12).fill(undefined).map((_, index) => {
        const saleMounth = sales.filter(({register}) => {
            const dateRegister = new Date(register);
            const mounth = dateRegister.getMonth();

            return mounth === index;
        });

        const total = saleMounth.reduce((acc, {value}) => acc+=value, 0);

        return total;
    });

    const categories = categoriesRegister.map(({id, name}) => {
        const hasCategory = sales.filter(({product: { category: { id: idCat } }}) => idCat === id);

        const valueCategory = hasCategory.reduce((acc, {value}) => acc+=value, 0);

        return {
            name,
            valueCategory
        }
    });

    return {value, categories};
}