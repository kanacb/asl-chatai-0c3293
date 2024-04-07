import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Button } from "primereact/button";
import { CascadeSelect } from "primereact/cascadeselect";
import { OverlayPanel } from "primereact/overlaypanel";

import ChataiProjectActionBehaviorsPage from "./ChataiProjectActionBehaviorsPage";
import ChataiProjectActionTemperaturPage from "./ChataiProjectActionTemperaturePage";
import ChataiProjectActionFADocsPage from "./ChataiProjectActionFADocsPage";

const ChataiProjectActionPage = (props) => {
  const opTemperature = useRef();
  const opFABehavior = useRef();
  const opFACDocsConfig = useRef();
  const chatAis = [
    {
      name: "Facility Agreement",
      code: "FA",
      actions: [
        {
          name: "Legal Query",
          models: [
            {
              description:
                "Raise a question and get the answer in a simple easy to use interface to assist in daily tasks.",
              cname: "ASL FA Ai Chat v 1.0",
              code: "anthropic.claude-3-haiku-20240307-v1:0",
              disabled: false,
            },
          ],
        },
        {
          name: "Legal ChatBot",
          models: [
            {
              description:
                "A conversational interface to assistant and enhance the experience of your customers",
              cname: "ASL FA Ai Chat v 1.0",
              code: "anthropic.claude-3-haiku-20240307-v1:0",
              disabled: true,
            },
          ],
        },
        {
          name: "Contextual Comparison",
          models: [
            {
              description:
                "Contextual comparison involves evaluating facility agreements of provider banks, ensuring legal tasks align with constitutional requirements of financial institutions, safeguarding compliance and mitigating legal risks effectively.",
              cname: "ASL FA Ai Chat v 1.0",
              code: "anthropic.claude-3-haiku-20240307-v1:0",
              disabled: true,
            },
          ],
        },
        {
          name: "Constitutional Ai Search Engine",
          models: [
            {
              description:
                "A Constitutional Ai engine aids legal counsels by leveraging advanced algorithms to search vast legal databases, swiftly identifying relevant case law, statutes, and precedents to tackle complex legal issues effectively.",
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
      actions: [],
    },
    {
      name: "Charge Annexure",
      code: "CA",
      actions: [],
    },
    {
      name: "Debenture",
      code: "DE",
      actions: [],
    },
    {
      name: "Guarantee",
      code: "GU",
      actions: [],
    },
    {
      name: "Power of Attorney",
      code: "PA",
      actions: [],
    },
    {
      name: "Set-Off",
      code: "SO",
      actions: [],
    },
    {
      name: "SME (Docs)",
      code: "SM",
      actions: [],
    },
  ];

  useEffect(() => {
    //on mount
    props.setSelectedModel(chatAis[0]?.actions[0]?.models[0]);
  }, []);

  const chatAiOptionTemplate = (option) => {
    return (
      <div>
        <span className={option.cname ? "font-bold" : null}>
          {option.cname || option.name}
        </span>
        <p
          className="mt-1 text-xl"
          style={{
            whiteSpace: "pre-line",
          }}
        >
          {option.description}
        </p>
      </div>
    );
  };

  return (
    <div className="grid flex w-full m-3 grid-nogutter">
      <div className="col-8">
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
          className="w-full md:w-30rem"
          breakpoint="767px"
          placeholder="Select an Ai Chat Action"
          itemTemplate={chatAiOptionTemplate}
          style={{ maxWidth: "fit-content" }}
        />
        <div className="m-1 overflow-auto">
          {props.selectedModel?.description}
        </div>
      </div>
      <div className="col-offset-1 flex align-items-right justify-content-end">
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
          tooltipOptions={{ position: "mouse" }}
          rounded
          text
          severity="primary"
          aria-label="config"
          onClick={(e) => opTemperature.current.toggle(e)}
        />
        <Button
          icon="pi pi-fw pi-cog"
          className="mb-1 mr-2"
          size="large"
          tooltipOptions={{ position: "mouse" }}
          rounded
          text
          severity="primary"
          aria-label="fa"
          onClick={(e) => opFABehavior.current.toggle(e)}
        />
      </div>
      <OverlayPanel
        ref={opFACDocsConfig}
        pt={{
          root: { className: "surface-ground" },
        }}
      >
        <ChataiProjectActionFADocsPage />
      </OverlayPanel>
      <OverlayPanel
        ref={opTemperature}
        pt={{
          root: { className: "surface-ground" },
        }}
        className="zoomindown animation-duration-500"
      >
        <ChataiProjectActionTemperaturPage  />
      </OverlayPanel>
      <OverlayPanel
        ref={opFABehavior}
        pt={{
          root: { className: "surface-ground" },
        }}
        className="fadeinup animation-duration-500"
      >
        <ChataiProjectActionBehaviorsPage setSelectedConfigId={props.setSelectedConfigId} selectedConfigId={props.selectedConfigId} />
      </OverlayPanel>
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

export default connect(mapState, mapDispatch)(ChataiProjectActionPage);
