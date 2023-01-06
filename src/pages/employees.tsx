import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import RegisterEmployees from "../components/employees/Register";
import TableEmployees from "../components/employees/Table";
import LayoutMain from "../components/layout/Main";
import { EmployeeProvider } from "../contexts/Employee";
import { getAllUsers } from "../lib/user/getAll";
import { UserApi } from "../types/user";
import { authOptions } from "./api/auth/[...nextauth]";

type EmployeesProps = {
    employees: UserApi[];
}

const Employees = ({ employees }: EmployeesProps) => {
    
    return (
        <LayoutMain title="Funcionários">
            <EmployeeProvider>
                <RegisterEmployees />
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

    return {
        props: {
            employees: JSON.parse(JSON.stringify(employees)),
        }
    }
}