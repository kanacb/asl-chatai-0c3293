import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from "primereact/inputtext";

const SingleRefConfigPage = (props) => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [_entity, set_entity] = useState();

  const [chatAiId, setChatAiId] = useState([]);

  useEffect(() => {
    //on mount
    client
      .service("refConfig")
      .get(urlParams.singleRefConfigId, {
        query: {
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
            "chatAiId",
          ],
        },
      })
      .then((res) => {
        set_entity(res || {});
        const chatAiId = Array.isArray(res.chatAiId)
          ? res.chatAiId.map((elem) => ({ _id: elem._id, name: elem.name }))
          : res.chatAiId
            ? [{ _id: res.chatAiId._id, name: res.chatAiId.name }]
            : [];
        setChatAiId(chatAiId);
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "RefConfig",
          type: "error",
          message: error.message || "Failed get refConfig",
        });
      });
  }, [props, urlParams.singleRefConfigId]);

  const goBack = () => {
    navigate(-1, { replace: true });
  };

  return (
    <div className="col-12 flex flex-column align-items-center">
      <div className="col-10">
        <div className="flex align-items-center justify-content-start">
          <Button
            className="p-button-text"
            icon="pi pi-chevron-left"
            onClick={() => goBack()}
          />
          <h3 className="m-0">RefConfig</h3>
        </div>
        <p>refConfig/{urlParams.singleRefConfigId}</p>
        {/* ~cb-project-dashboard~ */}
      </div>
      <div className="grid col-10">
        <div className="card w-full">
          <label className="text-sm text-primary">ChatAi</label>
          <div className="ml-3">
            <p className="m-0 ml-3">{_entity?.chatAiId?.name}</p>
          </div>
          <label className="text-sm text-primary">Name</label>
          <div className="ml-3">
            <p className="m-0 ml-3">{_entity?.name}</p>
          </div>
          <label className="text-sm text-primary">Description</label>
          <div className="ml-3">
            <p className="m-0 ml-3">{_entity?.description}</p>
          </div>
          <label className="text-sm text-primary">Bedrock Model Id</label>
          <div className="ml-3">
            <p className="m-0 ml-3">{_entity?.bedrockModelId}</p>
          </div>
          <label className="text-sm text-primary">Human</label>
          <div className="ml-3">
            <p className="m-0 ml-3">{_entity?.human}</p>
          </div>
          <label className="text-sm text-primary">Task</label>
          <div className="ml-3">
            <p className="m-0 ml-3">{_entity?.task}</p>
          </div>
          <label className="text-sm text-primary">No Condition</label>
          <div className="ml-3">
            <p className="m-0 ml-3">{_entity?.noCondition}</p>
          </div>
          <label className="text-sm text-primary">Yes Condition</label>
          <div className="ml-3">
            <p className="m-0 ml-3">{_entity?.yesCondition}</p>
          </div>
          <label className="text-sm text-primary">Format</label>
          <div className="ml-3">
            <p className="m-0 ml-3">{_entity?.format}</p>
          </div>
          <label className="text-sm text-primary">Example</label>
          <div className="ml-3">
            <p className="m-0 ml-3">{_entity?.example}</p>
          </div>
          <label className="text-sm text-primary">Preamble</label>
          <div className="ml-3">
            <p className="m-0 ml-3">{_entity?.preamble}</p>
          </div>
          <label className="text-sm">ChatAi</label>
          <p>
            {chatAiId.map((elem) => (
              <Link key={elem._id} to={`/chatai/${elem._id}`}>
                <div className="card">
                  <p>{elem.name}</p>
                </div>
              </Link>
            ))}
          </p>
          <label className="text-sm text-primary">created</label>
          <div className="ml-3">
            <p className="m-0 ml-3">{moment(_entity?.createdAt).fromNow()}</p>
          </div>
          <label className="text-sm text-primary">updated</label>
          <div className="ml-3">
            <p className="m-0 ml-3">{moment(_entity?.updatedAt).fromNow()}</p>
          </div>
          <label className="text-sm text-primary">createdBy</label>
          <div className="ml-3">
            <p className="m-0 ml-3">{_entity?.createdBy?.name}</p>
          </div>
          <label className="text-sm text-primary">lastUpdatedBy</label>
          <div className="ml-3">
            <p className="m-0 ml-3">{_entity?.updatedBy?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {};
};

const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
  //
});

export default connect(mapState, mapDispatch)(SingleRefConfigPage);
