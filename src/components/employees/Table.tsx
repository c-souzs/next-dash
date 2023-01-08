import React from "react";
import { Prisma } from "@prisma/client";

import DataTable, { TableColumn } from "react-data-table-component";
import { EmployeeCtx } from "../../contexts/Employee";
import { GlobalCtx } from "../../contexts/Global";
import { UserApi } from "../../types/user";
import { api } from "../../utils/api";
import { customStylesTable } from "../../utils/table";
import StructureTable from "../elements/Table";
import ContentModalEmployee from "./ContentModal";
import { formatBr } from "../../utils/formatDate";
import generatePdf from "../../utils/generatePdf";

type TableEmployeesProps = {
    employees: UserApi[]
}

type DataRow = UserApi;

type SelectedRowsChange<T> = {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: T[]
}

const columns: TableColumn<DataRow>[] = [
    {
      name: 'Id',
      selector: (row) => row.id,
      sortable: true,
      width: '7%'
    },
    {
      name: 'Nome',
      selector: (row) => row.name,
      sortable: true,
      width: '20%'
    },
    {
        name: 'Email',
        selector: (row) => row.login!.email,
        sortable: true,
    },
    {
        name: 'Endereço',
        selector: (row) => row.address,
        sortable: true,
    },
    {
        name: 'Contratação',
        selector: (row) => formatBr(new Date(row.register)),
        sortable: true
    },
    {
        name: 'Cargo',
        selector: (row) => row.office.name,
        sortable: true,
    },
    {
      name: 'Salário',
      selector: (row) => row.office.salary,
      sortable: true,
      width: '12%'
    },
    {
        name: 'Vendas',
        selector: (row) => row.amountSales,
        sortable: true
    }
];

const TableEmployees = ({ employees }: TableEmployeesProps) => {
    const { setEmployees, employees: employeesCtx } = React.useContext(EmployeeCtx);
    const { setNotify, setContentModal, setShowModal, setRefresh } = React.useContext(GlobalCtx);

    React.useEffect(() => setEmployees(employees), []);

    const [selectedRows, setSelectedRows] = React.useState<DataRow[]>([]);
    const handleChange = ({ selectedRows }: SelectedRowsChange<DataRow>) => setSelectedRows(selectedRows);

    const handleDeleteEmployee = async () => {
        if(!selectedRows[0]) return;
        const { id } = selectedRows[0];

        await api.delete<Prisma.BatchPayload, {id: number}>(`user/${id}`);
        setRefresh(true);
        setNotify({
            show: true,
            type: 'success'
        });
        setSelectedRows([]);
    }

    const handleDeleteEmployees = async () => {
        const ids = selectedRows.map(({id}) => id);

        await api.delete<Prisma.BatchPayload, {ids: number[]}>("user", { ids });
        setRefresh(true);
        setNotify({
            show: true,
            type: 'success'
        });
        setSelectedRows([]);
    }

    const handleEditEmployee = () => {
        if(!selectedRows[0]) return;

        setContentModal(<ContentModalEmployee type="update" employeeSelect={selectedRows[0]}/>)
        setShowModal(true);
    }

    const handleViewEmployee = () => {
        if(!selectedRows[0]) return;

        setContentModal(<ContentModalEmployee type="view" employeeSelect={selectedRows[0]}/>);
        setShowModal(true);
    }

    const generatePdfEmployees = () => {
        const heads = ['Id', 'Nome', 'Email', 'Contratação', 'Endereço', 'Cargo', 'Salário', 'Vendas'];
        
        const body = employeesCtx.map(employee => {
            const { id, name, login, address, office, amountSales, register } = employee;
            const { email } = login!;
            const { name: nameOffice, salary } = office;
            const dateFormat = formatBr(new Date(register));

            return [id, name, email, dateFormat, address, nameOffice, salary, amountSales]
        });

        generatePdf('Seus funcionários', heads, body, 'employees');
    }

    return (
        <div className="mt-6">
            <StructureTable 
                title="Funcionários 🙎🏼‍♂️"
                handleDeleteItens={handleDeleteEmployees}
                lengthRowsSeletec={selectedRows.length}
                handleDelete={handleDeleteEmployee}
                handleEdit={handleEditEmployee}
                handleView={handleViewEmployee}
                handleDownloadPdf={generatePdfEmployees}
            >
                <DataTable columns={columns} data={employeesCtx} theme='darkCustom' customStyles={customStylesTable} selectableRows onSelectedRowsChange={handleChange} pagination />
            </StructureTable>
        </div>
    )

}

export default TableEmployees;