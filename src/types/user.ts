import { Role, User } from "@prisma/client";

export type AuthUser = {
    id: number;
    name: string;
    login: {
        email: string;
        password: string;
        role: Role;
    } | null;
    image: string;
    sex: boolean;
    address: string;
    officeId: number;
}

export type UserApi = (User & {
    office: {
        name: string;
        salary: number;
    };
    login: {
        email: string;
    } | null;
})

export type UserContentModal = {
    type: "view" | "register" | "update";
    employeeSelect?: UserApi;
}