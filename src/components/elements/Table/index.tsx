import React, { ReactNode } from "react";
import GroupButtons from "./GroupButtons";

type StructureTableProps = {
    title: string;
    children: ReactNode;
    lengthRowsSeletec: number;
    handleView: () => void;
    handleEdit: () => void;
    handleDelete: () => void;
    handleDownloadPdf: () => void;
    handleDeleteItens: () => void;
}

const StructureTable = ({ title, children, lengthRowsSeletec, handleEdit, handleDeleteItens, handleView, handleDelete, handleDownloadPdf}: StructureTableProps) => {
    const [renderTable, setRenderTable] = React.useState(false);

    React.useEffect(() => setRenderTable(true), []);

    return (
        <div>
            <h3 className="text-lg font-semibold text-white-50 mb-3">{title}</h3>
            <GroupButtons 
                lengthRowsSelect={lengthRowsSeletec}
                handleDeleteItens={handleDeleteItens}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleView={handleView}
                handleDownloadPdf={handleDownloadPdf}
            />
            { renderTable && <div className="rounded">{children}</div> }
        </div>
    )
}

export default StructureTable;