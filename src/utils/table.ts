import { createTheme, TableStyles } from "react-data-table-component";

createTheme('darkCustom', {
    background: {
        default: '#1A1A1A',
    },
    text: {
        primary: '#fff',
        secondary: '#CCCCCC'
    },
    divider: {
        default: '#0D0D0D'
    }
});

export const customStylesTable: TableStyles = {
    headCells: {
        style: {
            fontSize: '14px',
        }
    }
}