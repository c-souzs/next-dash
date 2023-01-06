import React, { createContext, ReactNode } from "react";

import { UserApi } from "../types/user";
import { api } from "../utils/api";
import { GlobalCtx } from "./Global";

type EmployeeProviderProps = {
    children: ReactNode;
}

type EmployeeCtxType = {
    employees: UserApi[];
    setEmployees: React.Dispatch<React.SetStateAction<UserApi[]>>;
}

const initialValue = {
    employees: [],
    setEmployees: () => {},
}

export const EmployeeCtx = createContext<EmployeeCtxType>(initialValue);

export const EmployeeProvider = ({ children }: EmployeeProviderProps) => {
    const [employees, setEmployees] = React.useState<UserApi[]>(initialValue.employees);
    const { refresh, setRefresh } = React.useContext(GlobalCtx);

    const refreshItems = async () => {
        const listEmployees = await api.get<{data: UserApi[]}>("user");
        
        if(listEmployees.status !== 200) return;

        const { data: { data: dataListEmployees } } = listEmployees;
        
        setEmployees(dataListEmployees);
        setRefresh(false);
    }

    React.useEffect(() => {
        if(refresh) refreshItems();
    }, [refresh]);

    return (
        <EmployeeCtx.Provider value={{employees, setEmployees}}>
            {children}
        </EmployeeCtx.Provider>
    )
}