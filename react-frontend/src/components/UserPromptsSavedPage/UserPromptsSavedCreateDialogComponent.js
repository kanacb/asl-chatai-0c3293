import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

const getSchemaValidationErrorsStrings = (errorObj) => {
  let errMsg = [];
  for (const key in errorObj.errors) {
    if (Object.hasOwnProperty.call(errorObj.errors, key)) {
      const element = errorObj.errors[key];
      if (element?.message) {
        errMsg.push(element.message);
      }
    }
  }
  return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const UserPromptsSavedCreateDialogComponent = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [chatAiId, setChataiid] = useState([]);
  const [saveduserid, setSaveduserid] = useState([]);
  const [configid, setConfigid] = useState([]);

  useEffect(() => {
    // replace this when there is a date field
    // const init  = { todate : new Date(), from : new Date()};
    // set_entity({...init});
    set_entity({});
  }, [props.show]);

  const onSave = async () => {
    let _data = {
      chatAiId: _entity.chatAiId?._id,
      saveduserid: props.user?._id,
      configid: _entity.configid?._id,
      prompt: _entity.prompt,
      others: _entity.others,
      createdBy: props.user._id,
      updatedBy: props.user._id,
    };

    setLoading(true);

    try {
      const result = await client.service("userPromptsSaved").create(_data);
      const eagerResult = await client.service("userPromptsSaved").find({
        query: {
          $limit: 10000,
          _id: { $in: [result._id] },
          $populate: [
            {
              path: "chatAiId",
              service: "chatai",
              select: ["name"],
            },
            {
              path: "saveduserid",
              service: "users",
              select: ["name"],
            },
            {
              path: "configid",
              service: "config",
              select: ["name"],
            },
          ],
        },
      });
      props.onHide();
      props.alert({
        type: "success",
        title: "Create info",
        message: "Info userPromptsSaved updated successfully",
      });
      props.onCreateResult(eagerResult.data[0]);
    } catch (error) {
      console.log("error", error);
      setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
      props.alert({
        type: "error",
        title: "Create",
        message: "Failed to create",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    //on mount chatai
    client
      .service("chatai")
      .find({ query: { $limit: 10000 } })
      .then((res) => {
        setChataiid(
          res.data.map((e) => {
            return { name: e["name"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "Chatai",
          type: "error",
          message: error.message || "Failed get chatai",
        });
      });
  }, []);

  useEffect(() => {
    //on mount users
    client
      .service("users")
      .find({ query: { $limit: 10000 } })
      .then((res) => {
        setSaveduserid(
          res.data.map((e) => {
            return { name: e["name"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "Users",
          type: "error",
          message: error.message || "Failed get users",
        });
      });
  }, []);

  useEffect(() => {
    //on mount config
    client
      .service("config")
      .find({ query: { $limit: 10000 } })
      .then((res) => {
        setConfigid(
          res.data.map((e) => {
            return { name: e["name"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "Config",
          type: "error",
          message: error.message || "Failed get config",
        });
      });
  }, []);

  const renderFooter = () => (
    <div className="flex justify-content-end">
      <Button
        label="save"
        className="p-button-text no-focus-effect"
        onClick={onSave}
        loading={loading}
      />
      <Button
        label="close"
        className="p-button-text no-focus-effect p-button-secondary"
        onClick={props.onHide}
      />
    </div>
  );

  const setValByKey = (key, val) => {
    let new_entity = { ..._entity, [key]: val };
    set_entity(new_entity);
    setError("");
  };

  const chataiidOptions = chatAiId
    .map((elem) => ({
      name: elem.name,
      value: elem.value,
    }))
    .sort((a, b) =>
      a.name.localeCompare(b.name, undefined, {
        numeric: true,
        sensitivity: "base",
      }),
    );

  const configidOptions = configid
    .map((elem) => ({
      name: elem.name,
      value: elem.value,
    }))
    .sort((a, b) =>
      a.name.localeCompare(b.name, undefined, {
        numeric: true,
        sensitivity: "base",
      }),
    );

  return (
    <Dialog
      header="Create"
      visible={props.show}
      closable={false}
      onHide={props.onHide}
      modal
      style={{ width: "40vw" }}
      className="min-w-max"
      footer={renderFooter()}
      resizable={false}
    >
      <div role="userPromptsSaved-create-dialog-component">
        <div>
          <p className="m-0">ChatAi:</p>
          <Dropdown
            value={_entity?.chatAiId?._id}
            optionLabel="name"
            optionValue="value"
            options={chataiidOptions}
            onChange={(e) => setValByKey("chatAiId", { _id: e.value })}
          />
        </div>
        <div>
          <p className="m-0">Config:</p>
          <Dropdown
            value={_entity?.configid?._id}
            optionLabel="name"
            optionValue="value"
            options={configidOptions}
            onChange={(e) => setValByKey("configid", { _id: e.value })}
          />
        </div>
        <div>
          <p className="m-0">Prompt:</p>
          <InputText
            className="w-full mb-3"
            value={_entity?.prompt}
            onChange={(e) => setValByKey("prompt", e.target.value)}
          />
        </div>
        <div>
          <p className="m-0">Others:</p>
          <InputText
            className="w-full mb-3"
            value={_entity?.others}
            onChange={(e) => setValByKey("others", e.target.value)}
          />
        </div>
        <small className="p-error">
          {Array.isArray(error)
            ? error.map((e, i) => (
                <p className="m-0" key={i}>
                  {e}
                </p>
              ))
            : error}
        </small>
      </div>
    </Dialog>
  );
};

const mapState = (state) => {
  const { user } = state.auth;
  return { user };
};
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(
  mapState,
  mapDispatch,
)(UserPromptsSavedCreateDialogComponent);
