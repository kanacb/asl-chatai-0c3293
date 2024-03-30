import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleRefFaDocsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [bankId, setBankId] = useState([]);
    const [facilityid, setFacilityid] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("refFaDocs")
            .get(urlParams.singleRefFaDocsId, { query: { $populate: ["bankId","facilityid"] }})
            .then((res) => {
                set_entity(res || {});
                const bankId = Array.isArray(res.bankId)
            ? res.bankId.map((elem) => ({ _id: elem._id, abbr: elem.abbr }))
            : res.bankId
                ? [{ _id: res.bankId._id, abbr: res.bankId.abbr }]
                : [];
        setBankId(bankId);
                const facilityid = Array.isArray(res.facilityid)
            ? res.facilityid.map((elem) => ({ _id: elem._id, type: elem.type }))
            : res.facilityid
                ? [{ _id: res.facilityid._id, type: res.facilityid.type }]
                : [];
        setFacilityid(facilityid);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "RefFaDocs", type: "error", message: error.message || "Failed get refFaDocs" });
            });
    }, [props,urlParams.singleRefFaDocsId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">RefFaDocs</h3>
                </div>
                <p>refFaDocs/{urlParams.singleRefFaDocsId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">Filename</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.filename}</p></div>
                    <label className="text-sm text-primary">Bank</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.bankId?.abbr}</p></div>
                    <label className="text-sm text-primary">Facility Type</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.facilityid?.type}</p></div>
                    <label className="text-sm text-primary">Start Date</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.startDate}</p></div>
                    <label className="text-sm text-primary">End Date</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.endDate}</p></div>
                    <label className="text-sm text-primary">S3 Link</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.s3Link}</p></div>
            <label className="text-sm">Bank</label>
            {bankId.map((elem) => (
                    <Link key={elem._id} to={`/refBanks/${elem._id}`}>
                        <div className="card">
                            <p>{elem.abbr}</p>
                        </div>
                    </Link>
                ))}
            <label className="text-sm">Facility Type</label>
            {facilityid.map((elem) => (
                    <Link key={elem._id} to={`/refFacilities/${elem._id}`}>
                        <div className="card">
                            <p>{elem.type}</p>
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

export default connect(mapState, mapDispatch)(SingleRefFaDocsPage);
