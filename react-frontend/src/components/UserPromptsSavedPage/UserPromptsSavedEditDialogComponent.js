import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';



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
    const [saveduserid, setSaveduserid] = useState([])
    const [configid, setConfigid] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    useEffect(() => {
                    //on mount users 
                    client
                        .service("users")
                        .find({ query: { $limit: 10000 } })
                        .then((res) => {
                            setSaveduserid(res.data.map((e) => ({ name: e['name'], value: e._id })));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Users", type: "error", message: error.message || "Failed get users" });
                        });
                }, []);
   useEffect(() => {
                    //on mount config 
                    client
                        .service("config")
                        .find({ query: { $limit: 10000 } })
                        .then((res) => {
                            setConfigid(res.data.map((e) => ({ name: e['name'], value: e._id })));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Config", type: "error", message: error.message || "Failed get config" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            saveduserid: _entity.saveduserid,
            configid: _entity.configid,
            prompt: _entity.prompt,
            others: _entity.others,
        };

        setLoading(true);
        try {
            
        await client.service("userPromptsSaved").patch(_entity._id, _data);
        const eagerResult = await client
            .service("userPromptsSaved")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                
                {
                    path : "saveduserid",
                    service : "users",
                    select:["name"]
                }
            ,
                {
                    path : "configid",
                    service : "config",
                    select:["name"]
                }
            
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info userPromptsSaved updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError("");
    };
    // children dropdown options

    const saveduseridOptions = saveduserid.map((elem) => ({ name: elem.name, value: elem.value }));
    const configidOptions = configid.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Info" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="userPromptsSaved-edit-dialog-component">
                <div>
                <p className="m-0">User:</p>
                <Dropdown value={_entity?.saveduserid?._id} options={saveduseridOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("saveduserid", e.value)} />
            </div>
            <div>
                <p className="m-0">Config:</p>
                <Dropdown value={_entity?.configid?._id} options={configidOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("configid", e.value)} />
            </div>
            <div>
                <p className="m-0">Prompt:</p>
                <InputText className="w-full mb-3" value={_entity?.prompt} onChange={(e) => setValByKey("prompt", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Others:</p>
                <InputText className="w-full mb-3" value={_entity?.others} onChange={(e) => setValByKey("others", e.target.value)}  />
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
    return{}
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(UserPromptsSavedCreateDialogComponent);
