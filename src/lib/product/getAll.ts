import prismadb from "../prismadb";

export const getAllProducts = async () => {
    const products = await prismadb.product.findMany({
        include: {
            category: true
        }
    });
    
    return products;
}