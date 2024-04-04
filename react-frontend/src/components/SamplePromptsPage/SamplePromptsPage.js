// REACT 18 TEMPLATE - <Service>Page.js

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import AreYouSureDialog from "../common/AreYouSureDialog";
import SamplePromptsDatatable from "./SamplePromptsDataTable";
import SamplePromptsEditDialogComponent from "./SamplePromptsEditDialogComponent";
import SamplePromptsCreateDialogComponent from "./SamplePromptsCreateDialogComponent";
import SamplePromptsFakerDialogComponent from "./SamplePromptsFakerDialogComponent";
import SamplePromptsSeederDialogComponent from "./SamplePromptsSeederDialogComponent";

const SamplePromptsPage = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showAreYouSureDialog, setShowAreYouSureDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showFakerDialog, setShowFakerDialog] = useState(false);
  const [showDeleteAllDialog, setShowDeleteAllDialog] = useState(false);
  const [showSeederDialog, setShowSeederDialog] = useState(false);
  const [selectedEntityIndex, setSelectedEntityIndex] = useState();
  const urlParams = useParams();

  useEffect(() => {
    //on mount
    client
      .service("samplePrompts")
      .find({
        query: {
          $limit: 10000,
          $populate: [
            {
              path: "createdBy",
              service: "users",
              select: ["name"],
            },
            {
              path: "updatedBy",
              service: "users",
              select: ["name"],
            },
            {
              path: "chatAiId",
              service: "chatais",
              select: ["name"],
            },
          ],
        },
      })
      .then((res) => {
        let results = res.data;

        setData(results);
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "SamplePrompts",
          type: "error",
          message: error.message || "Failed get samplePrompts",
        });
      });
  }, [showFakerDialog, showDeleteAllDialog]);

  const onEditRow = (rowData, rowIndex) => {
    setSelectedEntityIndex(rowIndex);
    setShowEditDialog(true);
  };

  const onCreateResult = (newEntity) => {
    setData([...data, newEntity]);
  };
  const onFakerCreateResults = (newEntities) => {
    setSelectedEntityIndex();
    setData([...data, ...newEntities]);
  };
  const onSeederResults = (newEntities) => {
    setSelectedEntityIndex();
    setData([...data, ...newEntities]);
  };

  const onEditResult = (newEntity) => {
    let _newData = _.cloneDeep(data);
    _newData[selectedEntityIndex] = newEntity;
    setData(_newData);
  };

  const deleteRow = async () => {
    try {
      await client
        .service("samplePrompts")
        .remove(data[selectedEntityIndex]?._id);
      let _newData = data.filter((_, i) => i !== selectedEntityIndex);
      setData(_newData);
      setSelectedEntityIndex();
      setShowAreYouSureDialog(false);
    } catch (error) {
      console.log({ error });
      props.alert({
        title: "SamplePrompts",
        type: "error",
        message: error.message || "Failed delete record",
      });
    }
  };
  const onRowDelete = (index) => {
    setSelectedEntityIndex(index);
    setShowAreYouSureDialog(true);
  };

  const onShowDeleteAll = (rowData, rowIndex) => {
    setShowDeleteAllDialog(true);
  };

  const deleteAll = async () => {
    setShowDeleteAllDialog(false);
    const countDataItems = data?.length;
    const promises = data.map((e) =>
      client.service("samplePrompts").remove(e._id),
    );
    await Promise.all(
      promises.map((p) =>
        p.catch((error) => {
          props.alert({
            title: "SamplePrompts",
            type: "error",
            message: error.message || "Failed to delete all records",
          });
          console.log({ error });
        }),
      ),
    );
    await props.alert({
      title: "SamplePrompts",
      type: "warn",
      message: `Successfully dropped ${countDataItems} records`,
    });
  };

  const onRowClick = ({ data }) => {
    navigate(`/samplePrompts/${data._id}`);
  };

  const menuItems = [
    {
      label: "Faker",
      icon: "pi pi-sliders-h",
      command: (e) => {
        setShowFakerDialog(true);
      },
    },
    {
      label: "Seeder",
      icon: "pi pi-forward",
      command: (e) => {
        setShowSeederDialog(true);
      },
    },
    {
      label: `Drop ${data?.length}`,
      icon: "pi pi-trash",
      command: (e) => {
        setShowDeleteAllDialog(true);
      },
    },
  ];

  return (
    <div className="mt-5">
      <div className="grid">
        <div className="col-6 flex justify-content-start">
          <h3 className="mb-0 ml-2">Sample Prompts </h3>
        </div>
        <div className="col-6 flex justify-content-end">
          <Button
            label="add"
            icon="pi pi-plus"
            onClick={() => setShowCreateDialog(true)}
            role="samplePrompts-add-button"
          />
          <SplitButton
            model={menuItems.filter(
              (m) => !(m.icon === "pi pi-trash" && data?.length === 0),
            )}
            dropdownIcon="pi pi-ellipsis-v"
            buttonClassName="hidden"
            menuButtonClassName="ml-1 p-button-text"
          ></SplitButton>
        </div>
      </div>
      <div className="grid align-items-center">
        <div className="col-12" role="samplePrompts-datatable">
          <SamplePromptsDatatable
            items={data}
            onRowDelete={onRowDelete}
            onEditRow={onEditRow}
            onRowClick={onRowClick}
          />
        </div>
      </div>
      <AreYouSureDialog
        header="Delete"
        body="Are you sure you want to delete this record?"
        show={showAreYouSureDialog}
        onHide={() => setShowAreYouSureDialog(false)}
        onYes={() => deleteRow()}
      />
      <SamplePromptsEditDialogComponent
        entity={data[selectedEntityIndex]}
        show={showEditDialog}
        onHide={() => setShowEditDialog(false)}
        onEditResult={onEditResult}
      />
      <SamplePromptsCreateDialogComponent
        show={showCreateDialog}
        onHide={() => setShowCreateDialog(false)}
        onCreateResult={onCreateResult}
      />
      <SamplePromptsFakerDialogComponent
        show={showFakerDialog}
        onHide={() => setShowFakerDialog(false)}
        onFakerCreateResults={onFakerCreateResults}
      />
      <SamplePromptsSeederDialogComponent
        show={showSeederDialog}
        onHide={() => setShowSeederDialog(false)}
        onSeederResults={onSeederResults}
      />
      <AreYouSureDialog
        header={`Drop ${data?.length} records`}
        body={`Are you sure you want to drop ${data?.length} records?`}
        show={showDeleteAllDialog}
        onHide={() => setShowDeleteAllDialog(false)}
        onYes={() => deleteAll()}
      />
    </div>
  );
};
const mapState = (state) => ({
  //
});
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SamplePromptsPage);
