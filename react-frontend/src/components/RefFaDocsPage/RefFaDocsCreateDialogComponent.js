import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";

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

const RefFaDocsCreateDialogComponent = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [bankId, setBankId] = useState([]);
  const [facilityid, setFacilityid] = useState([]);

  useEffect(() => {
    // replace this when there is a date field
    const init = { startDate: new Date(), endDate: new Date(), version: 1 };
    set_entity({ ...init });
  }, [props.show]);

  const onSave = async () => {
    let _data = {
      filename: _entity.filename,
      bankId: _entity.bankId?._id,
      facilityid: _entity.facilityid?._id,
      startDate: _entity.startDate,
      endDate: _entity.endDate,
      version: _entity.version,
      s3Link: _entity.s3Link,
      createdBy: props.user._id,
      updatedBy: props.user._id,
    };

    setLoading(true);

    try {
      const result = await client.service("refFaDocs").create(_data);
      const eagerResult = await client.service("refFaDocs").find({
        query: {
          $limit: 10000,
          _id: { $in: [result._id] },
          $populate: [
            {
              path: "bankId",
              service: "refBanks",
              select: ["abbr"],
            },
            {
              path: "facilityid",
              service: "refFacilities",
              select: ["type"],
            },
          ],
        },
      });
      props.onHide();
      props.alert({
        type: "success",
        title: "Create info",
        message: "Info refFaDocs updated successfully",
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
    //on mount refBanks
    client
      .service("refBanks")
      .find({ query: { $limit: 10000 } })
      .then((res) => {
        setBankId(
          res.data.map((e) => {
            return { name: e["abbr"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "RefBanks",
          type: "error",
          message: error.message || "Failed get refBanks",
        });
      });
  }, []);

  useEffect(() => {
    //on mount refFacilities
    client
      .service("refFacilities")
      .find({ query: { $limit: 10000 } })
      .then((res) => {
        setFacilityid(
          res.data.map((e) => {
            return { name: e["type"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "RefFacilities",
          type: "error",
          message: error.message || "Failed get refFacilities",
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

  const bankIdOptions = bankId
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
  const facilityidOptions = facilityid
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
      <div role="refFaDocs-create-dialog-component">
        <div className="grid flex">
          <div className="col-6">
            <p className="m-0">Filename:</p>
            <InputText
              className="w-full mb-3"
              value={_entity?.filename}
              onChange={(e) => setValByKey("filename", e.target.value)}
            />
          </div>
          <div className="col-3">
            <p className="m-0">Version:</p>
            <InputText
              type="number"
              className="w-full mb-3"
              length={5}
              value={_entity?.version}
              onChange={(e) => setValByKey("version", e.target.value)}
            />
          </div>

          <div className="col-6">
            <p className="m-0">Relations:</p>
            <Dropdown
              value={_entity?.bankId?._id}
              optionLabel="name"
              optionValue="value"
              options={bankIdOptions}
              onChange={(e) => setValByKey("bankId", { _id: e.value })}
            />
          </div>
          <div className="col-6">
            <p className="m-0">Document Type:</p>
            <Dropdown
              value={_entity?.facilityid?._id}
              optionLabel="name"
              optionValue="value"
              options={facilityidOptions}
              onChange={(e) => setValByKey("facilityid", { _id: e.value })}
            />
          </div>

          <div className="col-6">
            <p className="m-0">Start Date:</p>
            <Calendar
              dateFormat="dd/mm/yy"
              placeholder={"dd/mm/yy"}
              value={new Date(_entity?.startDate)}
              onChange={(e) =>
                setValByKey("startDate", new Date(e.target.value))
              }
              showIcon
              showButtonBar
            ></Calendar>
          </div>
          <div className="col-6">
            <p className="m-0">End Date:</p>
            <Calendar
              dateFormat="dd/mm/yy"
              placeholder={"dd/mm/yy"}
              value={new Date(_entity?.endDate)}
              onChange={(e) => setValByKey("endDate", new Date(e.target.value))}
              showIcon
              showButtonBar
            ></Calendar>
          </div>
        </div>

        {/* <div>
          <p className="m-0">S3 Link:</p>
          <InputText
            className="w-full mb-3"
            value={_entity?.s3Link}
            onChange={(e) => setValByKey("s3Link", e.target.value)}
          />
        </div> */}
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

export default connect(mapState, mapDispatch)(RefFaDocsCreateDialogComponent);
