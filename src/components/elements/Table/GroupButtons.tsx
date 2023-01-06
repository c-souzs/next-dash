import { Eye, FilePdf, Pencil, Trash } from "phosphor-react";
import Button from "../Button";

type GroupsButtonsProps = {
    lengthRowsSelect: number;
    handleEdit: () => void;
    handleView: () => void;
    handleDelete: () => void;
    handleDownloadPdf: () => void;
    handleDeleteItens: () => void;
}

const GroupButtons = ({ lengthRowsSelect, handleDelete, handleEdit, handleView, handleDownloadPdf, handleDeleteItens }: GroupsButtonsProps) => {
    return (
        <div className='flex justify-end gap-6 mb-4'>
            {lengthRowsSelect > 1 && <Button color="red" onClick={handleDeleteItens} icon={Trash} > Deletar itens </Button>}
            {lengthRowsSelect === 1 && <Button color="blue" onClick={handleEdit} icon={Pencil} >Editar item </Button>}
            {lengthRowsSelect === 1 && <Button color="yellow" onClick={handleView} icon={Eye} >Visualizar item  </Button>}
            {lengthRowsSelect === 1 && <Button color="red" onClick={handleDelete} icon={Trash} >Deletar item </Button>}
            <Button color="green" onClick={handleDownloadPdf} icon={FilePdf} > Baixar tabela em PDF  </Button>
        </div>
    )
};

export default GroupButtons;