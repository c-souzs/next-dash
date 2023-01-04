import { Role } from "@prisma/client";

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