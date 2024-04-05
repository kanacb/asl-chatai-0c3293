import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useState } from "react";
import _ from "lodash";
import { Button } from "primereact/button";

import moment from "moment";

const RefFaDocsDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
  const pTemplate0 = (rowData, { rowIndex }) => <p>{rowData.filename}</p>;
  const pTemplate1 = (rowData, { rowIndex }) => <p>{rowData.bankId?.abbr}</p>;
  const pTemplate2 = (rowData, { rowIndex }) => (
    <p>{rowData.facilityid?.type}</p>
  );
  const pTemplate3 = (rowData, { rowIndex }) => (
    <p>{new Date(rowData.startDate).toLocaleDateString("en-GB")}</p>
  );
  const pTemplate4 = (rowData, { rowIndex }) => (
    <p>{new Date(rowData.endDate).toLocaleDateString("en-GB")}</p>
  );
  const pTemplate6 = (rowData, { rowIndex }) => <p>{rowData.s3Link}</p>;

  const editTemplate = (rowData, { rowIndex }) => (
    <Button
      onClick={() => onEditRow(rowData, rowIndex)}
      icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`}
      className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`}
    />
  );
  const deleteTemplate = (rowData, { rowIndex }) => (
    <Button
      onClick={() => onRowDelete(rowIndex)}
      icon="pi pi-times"
      className="p-button-rounded p-button-danger p-button-text"
    />
  );
  const pCreatedAt = (rowData, { rowIndex }) => (
    <p>{moment(rowData.createdAt).fromNow()}</p>
  );
  const pUpdatedAt = (rowData, { rowIndex }) => (
    <p>{moment(rowData.updatedAt).fromNow()}</p>
  );
  const pCreatedBy = (rowData, { rowIndex }) => (
    <p>{rowData.createdBy?.name}</p>
  );
  const pUpdatedBy = (rowData, { rowIndex }) => (
    <p>{rowData.updatedBy?.name}</p>
  );

  return (
    <DataTable
      value={items}
      onRowClick={onRowClick}
      scrollable
      rowHover
      stripedRows
      paginator
      rows={10}
      size={"small"}
      rowClassName="cursor-pointer"
    >
      <Column
        field="filename"
        header="Filename"
        body={pTemplate0}
        sortable
        style={{ minWidth: "8rem" }}
      />
      <Column
        field="bankId"
        header="Bank"
        body={pTemplate1}
        sortable
        style={{ minWidth: "8rem" }}
      />
      <Column
        field="facilityid"
        header="Facility Type"
        body={pTemplate2}
        sortable
        style={{ minWidth: "8rem" }}
      />
      <Column
        field="startDate"
        header="Start Date"
        body={pTemplate3}
        sortable
        style={{ minWidth: "8rem" }}
      />
      <Column
        field="endDate"
        header="End Date"
        body={pTemplate4}
        sortable
        style={{ minWidth: "8rem" }}
      />
      <Column field="version" header="Version" style={{ minWidth: "8rem" }} />
      <Column
        field="s3Link"
        header="S3 Link"
        body={pTemplate6}
        style={{ minWidth: "8rem" }}
      />

      <Column header="Edit" body={editTemplate} />
      <Column header="Delete" body={deleteTemplate} />
      <Column
        field="createdAt"
        header="created"
        body={pCreatedAt}
        sortable
        style={{ minWidth: "8rem" }}
      />
      <Column
        field="updatedAt"
        header="updated"
        body={pUpdatedAt}
        sortable
        style={{ minWidth: "8rem" }}
      />
      <Column
        field="createdBy"
        header="createdBy"
        body={pCreatedBy}
        sortable
        style={{ minWidth: "8rem" }}
      />
      <Column
        field="updatedBy"
        header="updatedBy"
        body={pUpdatedBy}
        sortable
        style={{ minWidth: "8rem" }}
      />
    </DataTable>
  );
};

export default RefFaDocsDataTable;
