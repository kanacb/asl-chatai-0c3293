import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleSamplePromptsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [chataiid, setChataiid] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("samplePrompts")
            .get(urlParams.singleSamplePromptsId, { query: { $populate: ["chataiid"] }})
            .then((res) => {
                set_entity(res || {});
                const chataiid = Array.isArray(res.chataiid)
            ? res.chataiid.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.chataiid
                ? [{ _id: res.chataiid._id, name: res.chataiid.name }]
                : [];
        setChataiid(chataiid);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "SamplePrompts", type: "error", message: error.message || "Failed get samplePrompts" });
            });
    }, [props,urlParams.singleSamplePromptsId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">SamplePrompts</h3>
                </div>
                <p>samplePrompts/{urlParams.singleSamplePromptsId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">ChatAi</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.chataiid?.name}</p></div>
                    <label className="text-sm text-primary">Prompts</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.prompts}</p></div>
            <label className="text-sm">ChatAi</label>
            {chataiid.map((elem) => (
                    <Link key={elem._id} to={`/chatai/${elem._id}`}>
                        <div className="card">
                            <p>{elem.name}</p>
                        </div>
                    </Link>
                ))}
                    <label className="text-sm text-primary">created</label>
                    <div className="ml-3">
                        <p className="m-0 ml-3">{moment(_entity?.createdAt).fromNow()}</p>
                    </div>
                    <label className="text-sm text-primary">updated</label>
                    <div className="ml-3">
                        <p className="m-0 ml-3">{moment(_entity?.updatedAt).fromNow()}</p>
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

export default connect(mapState, mapDispatch)(SingleSamplePromptsPage);
