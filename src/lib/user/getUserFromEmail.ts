import prismadb from "../prismadb";

export const getUserFromEmail = async (email: string) => {

    const user = await prismadb.user.findFirst({
        where: {
            login: {
                email
            }
        },
        select: {
            id: true,
            address: true,
            image: true,
            name: true,
            login: {
                select: {
                    email: true,
                    password: true,
                    role: true
                }
            },
            officeId: true,
            sex: true
        }
    });

    if(user) return ({ user })
    else return null;
}