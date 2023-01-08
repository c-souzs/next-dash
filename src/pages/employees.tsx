import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { EmployeeProvider } from "../contexts/Employee";
import { authOptions } from "./api/auth/[...nextauth]";
import Head from 'next/head'

import AlertsEmployees from "../components/employees/Alerts";
import RegisterEmployees from "../components/employees/Register";
import TableEmployees from "../components/employees/Table";
import LayoutMain from "../components/layout/Main";

import { getAllUsers } from "../lib/user/getAll";
import { getBests } from "../lib/user/getBests";
import { AuthUser, UserAlerts, UserApi } from "../types/user";
import { useSession } from "next-auth/react";
import React, { use } from "react";

type EmployeesProps = {
    employees: UserApi[];
    alerts: UserAlerts;
}

const Employees = ({ employees, alerts }: EmployeesProps) => {
    const [adm, setAdm] = React.useState(false);
    const { data: session } = useSession();
    
    React.useEffect(() => {
        if(session){
            const { user } = session;
            const { login } = user as AuthUser;
            const { role } = login!;

            if(role === "ADMIN") setAdm(true);
            else setAdm(false);
        }
    }, [session]);
    
    return (
        <>
            <Head>
                <title>Funcionários - Dash next</title>
            </Head>
            <LayoutMain title="Funcionários">
                {
                    adm ? (
                        <EmployeeProvider>
                            <RegisterEmployees />
                            <AlertsEmployees data={alerts}/>
                            <TableEmployees employees={employees}/>
                        </EmployeeProvider>
                    ) : (
                        <div className="h-full w-full flex flex-col gap-4 items-center justify-center">
                            <span className="text-2xl font-bold text-white-50">Área restrita aos administradores.</span>
                            <p className="max-w-[440px] text-sm text-white-800 text-center">Essa área é restrtira á administração. Caso esteja com problemas de login entre em contato com o setor do rh para configurar uma nova senha.</p>
                        </div>
                    )
                }
            </LayoutMain>
        </>
    )
}

export default Employees;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res } = context;
    const session = await unstable_getServerSession(req, res, authOptions);

    if(!session ) return ({ redirect: { destination: '/login', permanent: true } });

    const employees = await getAllUsers();
    const alerts = await getBests();

    return {
        props: {
            employees: JSON.parse(JSON.stringify(employees)),
            alerts
        }
    }
}