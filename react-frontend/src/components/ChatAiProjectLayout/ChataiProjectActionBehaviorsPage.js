import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import ConfigCreateDialogComponent from "../ConfigPage/ConfigCreateDialogComponent";

const ChataiProjectActionBehaviorsPage = (props) => {
  const [selectedConfig, setSelectedConfig] = useState({});
  const [refUserConfig, setRefUserConfig] = useState([]);
  const [name, setName] = useState();
  const [human, setHuman] = useState();
  const [noCondition, setNoCondition] = useState();
  const [yesCondition, setYesCondition] = useState();
  const [task, setTask] = useState();
  const [example, setExample] = useState();
  const [preamble, setPreamble] = useState();
  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    //on mount
    getUserConfig();
  }, []);

  const setBehaviorForm = (config) => {
    setName(config.name);
    setHuman(config?.human);
    setNoCondition(config?.noCondition);
    setYesCondition(config?.yesCondition);
    setTask(config?.task);
    setExample(config?.example);
    setPreamble(config?.preamble);
    setSelectedConfig(config);
  };

  const getUserConfig = () => {
    client
      .service("config")
      .find({ query: { $limit: 10000, createdBy: props.user._id } })
      .then((res) => {
        const results = res.data;
        if (results && results.length > 0) {
          setRefUserConfig(results);
          setBehaviorForm(results[0]);
        } else {
          getRefConfig();
        }
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "fa docs",
          type: "error",
          message: error.message || "Failed get ref config",
        });
      });
  };

  const getRefConfig = () => {
    client
      .service("refconfig")
      .find({ query: { $limit: 10000 } })
      .then((res) => {
        const results = res.data;
        if (results && results.length > 0) {
          setRefUserConfig(results);
          setBehaviorForm(results[0]);
        }
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "fa docs",
          type: "error",
          message: error.message || "Failed get user config",
        });
      });
  };

  return (
    <div className="card grid grid-nogutter flex" style={{ width: "40vw" }}>
      <div className="col-6">
        <h3>Control behaviors </h3>
      </div>
      <div className="col-6 flex justify-content-end">
        <i className="pi pi-fw pi-angle-left mt-4"></i>
        <span className="mt-4">{` ${refUserConfig?.length} `}</span>
        <i className="pi pi-fw pi-angle-right mt-4"></i>
        {isEdit ? (
          <Button
            label="Save"
            icon="pi pi-save"
            className="m-2"
            size="small"
            iconPos="right"
            rounded
            text
            severity="danger"
            aria-label="Save"
            onClick={() => {
              // ConfigCreateDialogComponent.onSave(refUserConfig[0]);
              setEdit(false)
            }}
          />
        ) : (
          <Button
            label="Edit"
            icon="pi pi-pencil"
            className="m-2"
            size="small"
            iconPos="right"
            rounded
            text
            severity="danger"
            aria-label="Edit"
            onClick={() => setEdit(true)}
          />
        )}
      </div>
      {isEdit ? (
        
        <div className="col-12 fadein animation-duration-2000">
          <label id="label_name" className="mb-2 flex justify-content-start">
            Name <small className="ml-3 mt-1">(short identifier)</small>:
          </label>
          <InputText
            className="w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEdit}
          />
        </div>
      ) : null}

      <div className="col-12">
        <label id="label_human" className="mb-2 flex justify-content-start">
          Human:
        </label>
        <InputTextarea
          autoResize
          rows={5}
          className="w-full"
          value={human}
          onChange={(e) => setHuman(e.target.value)}
          disabled={!isEdit}
        />
      </div>

      <div className="col-12">
        <label
          id="label_noCondition"
          className="mb-2 flex justify-content-start"
        >
          No Condition:
        </label>
        <InputTextarea
          autoResize
          className="w-full"
          value={noCondition}
          onChange={(e) => setNoCondition(e.target.value)}
          disabled={!isEdit}
        />
      </div>

      <div className="col-12">
        <label
          id="label_yesCondition"
          className="mb-2 flex justify-content-start"
        >
          Yes Condition:
        </label>
        <InputTextarea
          autoResize
          rows={5}
          className="w-full"
          value={yesCondition}
          onChange={(e) => setYesCondition(e.target.value)}
          disabled={!isEdit}
        />
      </div>

      <div className="col-12">
        <label id="label_task" className="mb-2 flex justify-content-start">
          The task:
        </label>
        <InputTextarea
          autoResize
          className="w-full"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          disabled={!isEdit}
        />
      </div>

      <div className="col-12">
        <label id="label_example" className="mb-2 flex justify-content-start">
          Example Output:
        </label>
        <InputTextarea
          autoResize
          rows={12}
          className="w-full"
          value={example}
          onChange={(e) => setExample(e.target.value)}
          disabled={!isEdit}
        />
      </div>

      <div className="col-12">
        <label id="label_preamble" className="mb-2 flex justify-content-start">
          Preamble:
        </label>
        <InputTextarea
          autoResize
          rows={5}
          className="w-full"
          value={preamble}
          onChange={(e) => setPreamble(e.target.value)}
          disabled={!isEdit}
        />
      </div>
    </div>
  );
};

const mapState = (state) => {
  const { user } = state.auth;
  return { user };
};
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(ChataiProjectActionBehaviorsPage);
