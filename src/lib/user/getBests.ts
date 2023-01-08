import prismadb from "../prismadb";

export const getBests = async () => {
    const users = await prismadb.user.findMany({
        orderBy: {
            amountSales: 'desc'
        }
    });

    const { amountSales: aSFrist, name: nameFrist } = users[0];
    const { amountSales: aSSecond, name: nameSecond } = users[1];
    const { amountSales: aSThird, name: nameThird } = users[2];
    
    const frist = {amount: aSFrist, name: nameFrist};
    const second = {amount: aSSecond, name: nameSecond};
    const third = {amount: aSThird, name: nameThird};

    return {frist, second, third};
}