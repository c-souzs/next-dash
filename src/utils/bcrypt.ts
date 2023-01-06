import { genSaltSync, hashSync, compareSync } from "bcrypt";


export const encodePassword = (rawPassword: string) => {
    const SALT = genSaltSync();
    return hashSync(rawPassword, SALT);
}

export const comparePassword = (rawPassword: string, hash: string) => {
    return compareSync(rawPassword, hash);
}