import prismadb from "../prismadb";

export const getAllUsers = async () => {
    const users = await prismadb.user.findMany({
        include: {
            office: {
                select: {
                    salary: true,
                    name: true
                }
            },
            login: {
                select: {
                    email: true
                }
            }
        }
    });
    
    return users;
}