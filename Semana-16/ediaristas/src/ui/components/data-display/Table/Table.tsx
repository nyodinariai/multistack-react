import React from "react";
//import { } from '@material-ui/core'
import { TablePaper, TableStyled, TableContainerStyled, TableHeadStyled, TableRowStyled, TableCellStyled, TableBodyStyled, TablePaginationStyled } from './Table.styled'

export interface TableProps<T>{
    header: string[];
    data: T[];
    rowElement: (item: T, index: number) => React.ReactNode;
}

export type TableComponentType = <T>(props:TableProps<T>) => React.ReactElement; 


const Table: TableComponentType = ({data, ...props}) =>{

    return (
        <TablePaper>
            <TableContainerStyled>
                <TableHeadStyled>
                    <TableRowStyled>
                        {props.header.map((title, index) => (
                        <TableCellStyled key={index}>{title}</TableCellStyled>
                        ))}
                    </TableRowStyled>
                </TableHeadStyled>

                <TableBodyStyled>
                    {data.map(props.rowElement)}

                </TableBodyStyled>
            </TableContainerStyled>
        </TablePaper>
    );
}

export default Table;
export const TableRow = TableRowStyled;
export const TableCell = TableCellStyled;
export const TablePagination = TablePaginationStyled
