import React from "react";
import { Prisma, Sale } from "@prisma/client";
import { GlobalCtx } from "../../contexts/Global";

import DataTable, { TableColumn } from "react-data-table-component";

import { SaleCtx } from "../../contexts/Sale";
import { SaleApi } from "../../types/sale";
import { api } from "../../utils/api";
import { formatEua } from "../../utils/formatDate";
import { customStylesTable } from "../../utils/table";
import StructureTable from "../elements/Table";
import ContentModalSale from "./ContentModal";

type TableSaleProps = {
    sales: SaleApi[]
}

type DataRow = SaleApi;

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
      selector: (row) => row.product.name,
      sortable: true,
      width: '20%'
    },
    {
        name: 'Categoria',
        selector: (row) => row.product.category.name,
        sortable: true,
    },
    {
        name: 'Quantidade',
        selector: (row) => row.amount,
        sortable: true,
    },
    {
        name: 'Valor',
        selector: (row) => row.value,
        sortable: true,
    },
    {
        name: 'Funcionário',
        selector: (row) => row.user.name,
    },
    {
        name: 'Data',
        selector: (row) => formatEua(new Date(row.register)),
        sortable: true,
    }
];

const TableSale = ({ sales }: TableSaleProps) => {
    const { setNotify, setContentModal, setShowModal, setRefresh } = React.useContext(GlobalCtx);
    const { sales: salesCtx, setSales } = React.useContext(SaleCtx);

    React.useEffect(() => setSales(sales), []);

    const [selectedRows, setSelectedRows] = React.useState<DataRow[]>([]);
    const handleChange = ({ selectedRows }: SelectedRowsChange<DataRow>) => setSelectedRows(selectedRows);

    const handleDeleteSale = async () => {
        if(!selectedRows[0]) return;
        const { id } = selectedRows[0];

        await api.delete<Sale, {id: number}>(`sale/${id}`);
        setRefresh(true);
        setNotify({
            show: true,
            type: 'success'
        });
        setSelectedRows([]); 
    }

    const handleDeleteSales = async () => {
        const ids = selectedRows.map(({id}) => id);
        const idsUser = selectedRows.map(({userId}) => userId);

        await api.delete<Prisma.BatchPayload, {ids: number[], idsUser: number[]}>("product", {ids, idsUser});
        setRefresh(true);
        setNotify({
            show: true,
            type: 'success'
        });
        setSelectedRows([]);   
    }

    const handleEditSale = () => {
        if(!selectedRows[0]) return;

        setContentModal(<ContentModalSale type="update" saleSelect={selectedRows[0]} />)
        setShowModal(true);
    }

    const handleViewSale = () => {
        if(!selectedRows[0]) return;

        setContentModal(<ContentModalSale type="view" saleSelect={selectedRows[0]} />);
        setShowModal(true);
    }

    const generatePdfSales = () => {
        
    }

    return (
        <div className="mt-6">
            <StructureTable 
                title="Vendas 💸"
                handleDeleteItens={handleDeleteSales}
                lengthRowsSeletec={selectedRows.length}
                handleDelete={handleDeleteSale}
                handleEdit={handleEditSale}
                handleView={handleViewSale}
                handleDownloadPdf={generatePdfSales}
            >
                <DataTable columns={columns} data={salesCtx} theme='darkCustom' customStyles={customStylesTable} selectableRows onSelectedRowsChange={handleChange} pagination />
            </StructureTable>
        </div>
    )
}

export default TableSale;