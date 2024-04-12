import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { TabView, TabPanel } from "primereact/tabview";
import { MultiStateCheckbox } from "primereact/multistatecheckbox";
import { Checkbox } from 'primereact/checkbox';

const ChataiProjectActionFADocsPage = (props) => {
  const [refFaDocs, setRefFaDocs] = useState([]);
  const [multiStateCheckbox, setMultiStateCheckbox] = useState([]);
  const optionsMultiSelect = [
    { value: "selected", icon: "pi pi-times" },
    { value: "unselected", icon: "pi pi-lock-open" },
  ];

  useEffect(() => {
    //on mount
    getRefFADocs();
  }, []);

  const getRefFADocs = () => {
    client
      .service("reffadocs")
      .find({ query: { $limit: 10000 } })
      .then((res) => {
        let results = res.data;
        if(results){
          setRefFaDocs(results);
          props.setNumFiles(results.length);
        }
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "fa docs",
          type: "error",
          message: error.message || "Failed get reffadocs",
        });
      });
  };
  return (
    <div className="card">
      <h3>References documents </h3>
      <TabView>
        <TabPanel header="Conventional">
          <div class="flex flex-column" style={{ minHeight: "100px" }}>
            {refFaDocs.map((doc, i) => (
              <div
                className="flex align-self-auto  justify-content-start font-bold border-round m-2"
                style={{ minWidth: "200px", minHeight: "10px" }}
              >
                {/* <MultiStateCheckbox
                  key={i}
                  value={multiStateCheckbox}
                  onChange={(e) =>
                    setMultiStateCheckbox([
                      ...multiStateCheckbox,
                      { filename: doc.filename, selecteValue: e.value },
                    ])
                  }
                  options={optionsMultiSelect}
                  optionValue="value"
                /> */}
                <Checkbox inputId={doc?._id}  checked={true}/>
                <label htmlFor={doc?._id} className="ml-3">{doc.filename}</label>
              </div>
            ))}
          </div>
        </TabPanel>

        <TabPanel header="Islamic">
          <p className="m-0">Empty</p>
        </TabPanel>
      </TabView>
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

export default connect(mapState, mapDispatch)(ChataiProjectActionFADocsPage);
