import { useMemo, useState } from "react";
import PropTypes from 'prop-types';

import { useTable, usePagination, useGlobalFilter, useSortBy } from "react-table";

// @mui material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

// Soft UI Dashboard PRO React components
import SoftBox from "../SoftBox";
import SoftTypography from "../SoftTypography";
// import  from "../SoftBox";
import SoftInput from "../SoftInput";
import SoftSelect from "../SoftSelect";
//import SoftPagination from "../SoftPagination";

import DataTableHeadCell from "./DataTableHeadCell";
import DataTableBodyCell from "./DataTableBodyCell";

function DataTable({
  entriesPerPage,
  canSearch,
  // showTotalEntries,
  table,
  // pagination,
  //isSorted,
  noEndBorder,
}) {
  const defaultValue = entriesPerPage.defaultValue ? entriesPerPage.defaultValue : 10;
  const entries = entriesPerPage.entries ? entriesPerPage.entries : [5, 10, 15, 20, 25];
  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table]);
  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    // pageOptions,
    // canPreviousPage,
    // canNextPage,
    // gotoPage,
    // nextPage,
    // previousPage,
    setPageSize,
    // setGlobalFilter,
    state: { globalFilter },
  } = tableInstance;

  const setEntriesPerPage = ({ value }) => setPageSize(value);

  // Search input value state
  const [search, setSearch] = useState(globalFilter);

  return (
    <TableContainer sx={{ boxShadow: "none" }}>
      {entriesPerPage || canSearch ? (
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          {entriesPerPage && (
            <SoftBox display="flex" alignItems="center">
              <SoftSelect
                defaultValue={{ value: defaultValue, label: defaultValue }}
                options={entries.map((entry) => ({ value: entry, label: entry }))}
                onChange={setEntriesPerPage}
                size="small"
              />
              <SoftTypography variant="caption" color="secondary">
                &nbsp;&nbsp;entries per page
              </SoftTypography>
            </SoftBox>
          )}
          {canSearch && (
            <SoftBox width="12rem" ml="auto">
              <SoftInput
                placeholder="Search..."
                value={search}
                onChange={() => {
                  setSearch(search);
                  // onSearchChange(currentTarget.value);
                }}
              />
            </SoftBox>
          )}
        </SoftBox>
      ) : null}
      <Table {...getTableProps()}>
        <SoftBox component="thead">
          {headerGroups.map((headerGroup, key) => {
            return (
              <TableRow key={key} row={headerGroup.row}>
                {headerGroup.headers.map((column, key) => (
                  <DataTableHeadCell
                    key={key}
                    // {...column.getHeaderProps(isSorted && column.getSortByToggleProps())}
                    width={column.width ? column.width : "auto"}
                    align={column.align ? column.align : "left"}
                    //sorted={setSortedValue(column)}
                  >
                    {column.render("Header")}
                  </DataTableHeadCell>
                ))}
              </TableRow>
            )
          })}
        </SoftBox>
        <TableBody {...getTableBodyProps()}>
          {page.map((row, ) => {
            prepareRow(row);
            return (
              <TableRow key={row.id} role='row'>
                {row.cells.map((cell, key) => {
                  let props = { noBorder: noEndBorder && rows.length - 1 === key, align: cell.column.align ? cell.column.align : "left",};
                  return (
                    <DataTableBodyCell
                      key={key}
                      {...props}
                    >
                      {cell.render("Cell")}
                    </DataTableBodyCell>
                  )
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* <SoftBox
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
      >
        {showTotalEntries && (
          <SoftBox mb={{ xs: 3, sm: 0 }}>
            <SoftTypography variant="button" color="secondary" fontWeight="regular">
              Showing {entriesStart} to {entriesEnd} of {rows.length} entries
            </SoftTypography>
          </SoftBox>
        )}
        {pageOptions.length > 1 && (
          <SoftPagination
            variant={pagination.variant ? pagination.variant : "gradient"}
            color={pagination.color ? pagination.color : "info"}
          >
            {canPreviousPage && (
              <SoftPagination item onClick={() => previousPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
              </SoftPagination>
            )}
            {renderPagination.length > 6 ? (
              <SoftBox width="5rem" mx={1}>
                <SoftInput
                  inputProps={{ type: "number", min: 1, max: customizedPageOptions.length }}
                  value={customizedPageOptions[pageIndex]}
                  onChange={(handleInputPagination, handleInputPaginationValue)}
                />
              </SoftBox>
            ) : (
              renderPagination
            )}
            {canNextPage && (
              <SoftPagination item onClick={() => nextPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
              </SoftPagination>
            )}
          </SoftPagination>
        )}
      </SoftBox> */}
    </TableContainer>
  )
}

export default DataTable;

DataTable.propTypes = {
  entriesPerPage: PropTypes.object,
  canSearch: PropTypes.bool,
  // showTotalEntries,
  table: PropTypes.object,
  // pagination,
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool,
};