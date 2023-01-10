import React, { createContext, ReactNode } from "react";

import { UserAlerts, UserApi } from "../types/user";
import { api } from "../utils/api";
import { GlobalCtx } from "./Global";

type EmployeeProviderProps = {
    children: ReactNode;
}

type EmployeeCtxType = {
    employees: UserApi[];
    setEmployees: React.Dispatch<React.SetStateAction<UserApi[]>>;
    alerts: UserAlerts;
    setAlerts: React.Dispatch<React.SetStateAction<UserAlerts>>;
}

const initialValue = {
    employees: [],
    setEmployees: () => {},
    alerts: {
        frist: {amount: 0, name: ""},
        second: {amount: 0, name: ""},
        third: {amount: 0, name: ""},
    },
    setAlerts: () => {}
}

export const EmployeeCtx = createContext<EmployeeCtxType>(initialValue);

export const EmployeeProvider = ({ children }: EmployeeProviderProps) => {
    const [employees, setEmployees] = React.useState<UserApi[]>(initialValue.employees);
    const [alerts, setAlerts] = React.useState<UserAlerts>(initialValue.alerts);
    
    const { refresh, setRefresh, setNotify } = React.useContext(GlobalCtx);

    const refreshItems = async () => {
        const listEmployees = await api.get<{data: UserApi[]}>("user");
        //const listAlerts = await api.get<{data: UserAlerts}>("user/bests");
        
        if(listEmployees.status !== 200 ) {
            setNotify({
                show: true,
                type: "failure"
            });

            return;
        };

        const { data: { data: dataListEmployees } } = listEmployees;
        //const { data: { data: dataListAlerts } } = listAlerts;
        
        //setAlerts(dataListAlerts);
        setEmployees(dataListEmployees);
        setRefresh(false);
    }

    React.useEffect(() => {
        if(refresh) refreshItems();
    }, [refresh]);

    return (
        <EmployeeCtx.Provider value={{employees, alerts, setAlerts, setEmployees}}>
            {children}
        </EmployeeCtx.Provider>
    )
}