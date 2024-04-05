import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Chip } from "primereact/chip";
import { InputTextarea } from "primereact/inputtextarea";
import { CascadeSelect } from "primereact/cascadeselect";
import { OverlayPanel } from "primereact/overlaypanel";
import { Slider } from "primereact/slider";
import { TabView, TabPanel } from "primereact/tabview";
import { MultiStateCheckbox } from "primereact/multistatecheckbox";

const ChataiProjectActionPage = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [temperature, setTemperature] = useState(1);
  const [topP, setTopP] = useState(0.9999);
  const [topK, setTopK] = useState(500);
  const [maxLength, setMaxLength] = useState(4096);
  const [human, setHuman] = useState();
  const [noCondition, setNoCondition] = useState();
  const [yesCondition, setYesCondition] = useState();
  const [task, setTask] = useState();
  const [example, setExample] = useState();
  const [preamble, setPreamble] = useState();
  const [multiStateCheckbox, setMultiStateCheckbox] = useState([]);

  const opConfig = useRef();
  const opFAConfig = useRef();
  const opFACDocsConfig = useRef();

  const isEdit = false;

  const chatAis = [
    {
      name: "Facility Agreement",
      code: "FA",
      actions: [
        {
          name: "Questions",
          models: [
            {
              cname: "ASL FA Ai Chat v 1.0",
              code: "anthropic.claude-3-haiku-20240307-v1:0",
              disabled: false,
            },
          ],
        },
        {
          name: "Text Summary",
          models: [
            {
              cname: "ASL FA Ai Chat v 1.0",
              code: "anthropic.claude-3-haiku-20240307-v1:0",
              disabled: true,
            },
          ],
        },
      ],
    },
    {
      name: "Assignment & Charge",
      code: "AC",
      actions: [
        {
          name: "Quebec",
          models: [
            { cname: "Montreal", code: "C-MO" },
            { cname: "Quebec City", code: "C-QU" },
          ],
        },
        {
          name: "Ontario",
          models: [
            { cname: "Ottawa", code: "C-OT" },
            { cname: "Toronto", code: "C-TO" },
          ],
        },
      ],
    },
  ];

  useEffect(() => {
    // replace this when there is a date field
    // const init  = { todate : new Date(), from : new Date()};
    setTemperature(50);
    setTopK(25);
    setTopP(50);
    setMaxLength(50);
    setHuman(props.requestObject["human"]);
    setNoCondition(props.requestObject["no_condition"]);
    setYesCondition(props.requestObject["yes_condition"]);
    setTask(props.requestObject["task"]);
    setExample(props.requestObject["example"]);
    setPreamble(props.requestObject["preamble"]);
  }, []);

  useEffect(() => {
    //on mount
    client
      .service("reffadocs")
      .find({ query: { $limit: 10000 } })
      .then((res) => {
        let results = res.data;
        setData(results);
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "fa docs",
          type: "error",
          message: error.message || "Failed get reffadocs",
        });
      });
  }, []);

  const optionsMultiSelect = [
    { value: "selected", icon: "pi pi-times" },
    { value: "unselected", icon: "pi pi-lock-open" },
  ];

  return (
    <div className="grid flex w-full m-3 grid-nogutter">
      <div className="col-3">
        <CascadeSelect
          value={props.selectedModel}
          onChange={(e) => {
            props.setSelectedModel(e.value);
            console.log(e.value);
          }}
          options={chatAis}
          optionLabel="cname"
          optionGroupLabel="name"
          optionGroupChildren={["actions", "models"]}
          className="w-full md:w-14rem"
          breakpoint="767px"
          placeholder="Select an Ai Chat Action"
          style={{ minWidth: "20rem" }}
        />
      </div>
      <div className="col-offset-6 flex align-items-right justify-content-end">
        <Button
          icon="pi pi-fw pi-refresh"
          className="mb-1 mr-2"
          size="large"
          rounded
          text
          severity="primary"
          aria-label="refresh"
          onClick={() => {
            props.setPrompt("");
          }}
        />
        <Button
          icon="pi pi-fw pi-file-import"
          className="mb-1 mr-2"
          size="large"
          tooltip="control documents"
          tooltipOptions={{ position: "mouse" }}
          rounded
          text
          severity="primary"
          aria-label="docs"
          onClick={(e) => opFACDocsConfig.current.toggle(e)}
        />
        <Button
          icon="pi pi-fw pi-sliders-h"
          className="mb-1 mr-2"
          size="large"
          tooltip="reference strictness"
          tooltipOptions={{ position: "mouse" }}
          rounded
          text
          severity="primary"
          aria-label="config"
          onClick={(e) => opConfig.current.toggle(e)}
        />
        <Button
          icon="pi pi-fw pi-cog"
          className="mb-1 mr-2"
          size="large"
          tooltip="reference behavior"
          tooltipOptions={{ position: "mouse" }}
          rounded
          text
          severity="primary"
          aria-label="fa"
          onClick={(e) => opFAConfig.current.toggle(e)}
        />
      </div>
      <OverlayPanel
        ref={opConfig}
        pt={{
          root: { className: "surface-ground" },
        }}
      >
        <div className="card grid grid-nogutter flex">
          <h3>Control the strictness to not halucinate</h3>
          <div className="col-12">
            <label
              id="label_temperature"
              className="mb-2 flex justify-content-center"
            >
              Temperature {(temperature * 0.01).toFixed(2)}
            </label>
            <Slider
              value={temperature}
              onChange={(e) => setTemperature(e.value)}
              step={0.1}
            />
          </div>

          <div className="col-12 mt-2">
            <label id="label_topK" className="mb-2 flex justify-content-center">
              TopK {(topK * 0.01).toFixed(2)}
            </label>
            <Slider value={topK} onChange={(e) => setTopK(e.value)} step={1} />
          </div>

          <div className="col-12 mt-2">
            <label id="label_topP" className="mb-2 flex justify-content-center">
              TopP {(topP * 10).toFixed(0)}
            </label>
            <Slider
              value={topP}
              onChange={(e) => setTopP(e.value)}
              step={0.1}
            />
          </div>
          <div className="col-12 mt-2">
            <label id="label_topP" className="mb-2 flex justify-content-center">
              Max length {((maxLength / 100) * 4096).toFixed(0)}
            </label>
            <Slider
              value={maxLength}
              onChange={(e) => setMaxLength(e.value)}
              step={0.255}
            />
          </div>
          <div className="col-12 mt-2">
            <label id="label_stop" className="mb-2 flex justify-content-center">
              Stop Sequence{" "}
              <span className="ml-1">
                <i
                  className="pi pi-fw pi-plus"
                  style={{ color: "var(--primary-color)", fontSize: "1.5rem" }}
                ></i>
              </span>
            </label>
            <Chip label="Human" />
          </div>
        </div>
      </OverlayPanel>
      <OverlayPanel
        ref={opFAConfig}
        pt={{
          root: { className: "surface-ground" },
        }}
      >
        <div className="card grid grid-nogutter flex" style={{ width: "40vw" }}>
          <h3>Control the behavior of Chat Ai response</h3>
          <div className="col-12">
            <label id="label_human" className="mb-2 flex justify-content-start">
              Human:
            </label>
            <InputTextarea
              autoResize
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
            <label
              id="label_example"
              className="mb-2 flex justify-content-start"
            >
              Example Output:
            </label>
            <InputTextarea
              autoResize
              className="w-full"
              value={example}
              onChange={(e) => setExample(e.target.value)}
              disabled={!isEdit}
            />
          </div>

          <div className="col-12">
            <label
              id="label_preamble"
              className="mb-2 flex justify-content-start"
            >
              Preamble:
            </label>
            <InputTextarea
              autoResize
              className="w-full"
              value={preamble}
              onChange={(e) => setPreamble(e.target.value)}
              disabled={!isEdit}
            />
          </div>
        </div>
      </OverlayPanel>
      <OverlayPanel
        ref={opFACDocsConfig}
        pt={{
          root: { className: "surface-ground" },
        }}
      >
        <div className="card">
          <h3>Control the references documents to use</h3>
          <TabView>
            <TabPanel header="Conventional">
              <div class="flex flex-column" style={{ minHeight: "100px" }}>
                {data.map((doc, i) => (
                  <div
                    className="flex align-self-auto  justify-content-start font-bold border-round m-2"
                    style={{ minWidth: "200px", minHeight: "10px" }}
                  >
                    <MultiStateCheckbox
                      value={multiStateCheckbox}
                      onChange={(e) =>
                        setMultiStateCheckbox([
                          ...multiStateCheckbox,
                          { filename: doc.filename, selecteValue: e.value },
                        ])
                      }
                      options={optionsMultiSelect}
                      optionValue="value"
                    />
                    <span className="ml-3">{doc.filename}</span>
                  </div>
                ))}
              </div>
            </TabPanel>

            <TabPanel header="Islamic">
              <p className="m-0">Empty</p>
            </TabPanel>
          </TabView>
        </div>
      </OverlayPanel>
    </div>
  );
};

const mapState = (state) => ({
  //
});
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(ChataiProjectActionPage);
