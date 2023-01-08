import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { EmployeeProvider } from "../contexts/Employee";
import { authOptions } from "./api/auth/[...nextauth]";

import AlertsEmployees from "../components/employees/Alerts";
import RegisterEmployees from "../components/employees/Register";
import TableEmployees from "../components/employees/Table";
import LayoutMain from "../components/layout/Main";

import { getAllUsers } from "../lib/user/getAll";
import { getBests } from "../lib/user/getBests";
import { UserAlerts, UserApi } from "../types/user";

type EmployeesProps = {
    employees: UserApi[];
    alerts: UserAlerts;
}

const Employees = ({ employees, alerts }: EmployeesProps) => {
    return (
        <LayoutMain title="Funcionários">
            <EmployeeProvider>
                <RegisterEmployees />
                <AlertsEmployees data={alerts}/>
                <TableEmployees employees={employees}/>
            </EmployeeProvider>
        </LayoutMain>
    )
}

export default Employees;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res } = context;
    const session = await unstable_getServerSession(req, res, authOptions);

    if(!(session )) {
        return {
            redirect: { destination: '/', permanent: true }
        }
    }

    const employees = await getAllUsers();
    const alerts = await getBests();

    return {
        props: {
            employees: JSON.parse(JSON.stringify(employees)),
            alerts
        }
    }
}