import prismadb from "../prismadb";

export const getAllSales = async () => {
    const sales = await prismadb.sale.findMany({
        include: {
            user: {
                select: {
                    name: true
                }
            },
            product: {
                select: {
                    name: true,
                    category: {
                        select: {
                            name: true,
                            id: true
                        }
                    }
                }
            }
        }
    });
    
    return sales;
}