import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Chip } from "primereact/chip";
import { Slider } from "primereact/slider";

const ChataiProjectActionTemperaturPage = (props) => {
    const [temperature, setTemperature] = useState(50);
    const [topP, setTopP] = useState(50);
    const [topK, setTopK] = useState(50);
    const [maxLength, setMaxLength] = useState(50);

return (
    <div className="card grid grid-nogutter " style={{ maxWidth: '300px'}}>
    <h3>Control Temperature</h3>
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
        step={0.2}
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
)

};

const mapState = (state) => {
  const { user } = state.auth;
  return { user };
};
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(ChataiProjectActionTemperaturPage);
