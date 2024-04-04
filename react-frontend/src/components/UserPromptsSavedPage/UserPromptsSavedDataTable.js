import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useState } from "react";
import _ from "lodash";
import { Button } from "primereact/button";

import moment from "moment";

const UserPromptsSavedDataTable = ({
  items,
  onEditRow,
  onRowDelete,
  onRowClick,
}) => {
  const pTemplate1 = (rowData, { rowIndex }) => (
    <p>{rowData.saveduserid?.name}</p>
  );
  const pTemplate2 = (rowData, { rowIndex }) => <p>{rowData.configid?.name}</p>;
  const pTemplate3 = (rowData, { rowIndex }) => <p>{rowData.prompt?.name}</p>;
  const pTemplate4 = (rowData, { rowIndex }) => <p>{rowData.others}</p>;

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
      paginator
      rows={10}
      rowClassName="cursor-pointer"
    >
      <Column
        field="saveduserid"
        header="User"
        body={pTemplate1}
        sortable
        style={{ minWidth: "8rem" }}
      />
      <Column
        field="configid"
        header="Config"
        body={pTemplate2}
        style={{ minWidth: "8rem" }}
      />
      <Column
        field="prompt"
        header="Prompt"
        body={pTemplate3}
        style={{ minWidth: "8rem" }}
      />
      <Column
        field="others"
        header="Others"
        body={pTemplate4}
        style={{ minWidth: "8rem" }}
      />

      <Column header="Edit" body={editTemplate} />
      <Column header="Delete" body={deleteTemplate} />
      <Column
        field="createdAt"
        header="created"
        body={pCreatedAt}
        style={{ minWidth: "8rem" }}
      />
      <Column
        field="updatedAt"
        header="updated"
        body={pUpdatedAt}
        style={{ minWidth: "8rem" }}
      />
      <Column
        field="createdBy"
        header="createdBy"
        body={pCreatedBy}
        style={{ minWidth: "8rem" }}
      />
      <Column
        field="updatedBy"
        header="updatedBy"
        body={pUpdatedBy}
        style={{ minWidth: "8rem" }}
      />
    </DataTable>
  );
};

export default UserPromptsSavedDataTable;
