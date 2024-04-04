import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { unstable_usePrompt, useNavigate } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import ProjectLayout from "../Layouts/ProjectLayout";
import { Skeleton } from "primereact/skeleton";
import ChataiProjectActionPage from "./ChataiProjectActionPage";
import ChataiProjectResponsePage from "./ChataiProjectResponsePage";
import ChataiProjectPromptPage from "./ChataiProjectPromptPage";
import requestObject from "./requestObject.json";
import responseObject from "./responseObject.json";
import { ProgressSpinner } from "primereact/progressspinner";

const ChataiProjectLayoutPage = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedModel, setSelectedModel] = useState();
  const [openChatAiConfig, setOpenChatAiConfig] = useState(false);
  const [openFAChatAiConfig, setOpenFAChatAiConfig] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stopDisplaying, setStopDisplaying] = useState(false);
  const [isDisplaying, setIsDisplaying] = useState(false);
  const [response, setResponse] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState(null);
  const [currentPromptId, setCurrentPromptId] = useState(null);
  const sample =
    'Relevant extracts: [1] "The Borrower must pay interest on all principal sums of moneys lent or advanced by the Bank to the Borrower or otherwise owing or payable by the Borrower to the Bank under each Facility. Such interest will, except where otherwise provided in this Agreement or decided by the Bank pursuant to this Agreement, be calculated (as well after as before any court order or judgment and even if the banker-customer relationship between the Bank and the Borrower has ceased or been terminated): (a) at the prescribed interest rate for that Facility stated in the relevant Letter of Offer, or if not stated in the relevant Letter of Offer, at such interest rate for that Facility as may be prescribed by the Bank in its discretion from time to time; (b) with daily or monthly or other rest periods stated in the Letter of Offer, or if not stated in the relevant Letter of Offer, with such rest periods as the Bank may from time to time decide in its discretion; and (c) in accordance with the Bank\'s usual practice from time to time or otherwise in such manner as the Bank may from time to time decide, having regard to, amongst other things, the nature of that Facility." [2] "Regardless of the prescribed interest rate for each Facility stated or mentioned in the relevant Letter of Offer or decided by the Bank from time to time pursuant to this Agreement and regardless of whatever else stated or implied in this Agreement or any Letter of Offer, the Bank is entitled at any time and from time to time, to vary the prescribed interest rate for any Facility as the Bank thinks fit in its discretion, whether: (a) by varying the Base Rate or Base Lending Rate or any other reference rate (if any) used in determining the prescribed interest rate for that Facility, as the case may be; (b) by varying the interest margin/spread comprised in the prescribed interest rate for that Facility; (c) by changing the reference rate used in determining the prescribed interest rate for that Facility (for example, if the reference rate for determining the prescribed interest rate for that Facility is the Base Lending Rate, by changing such reference rate from the Base Lending Rate to the Base Rate or the Effective Cost of Funds (defined below) as the Bank deems fit in its discretion, or vice versa); (d) by a combination of any two or more of the above." Answers with citation: The interest rate on the Facilities is determined based on the prescribed interest rate stated in the Letter of Offer, or if not stated in the Letter of Offer, the interest rate prescribed by the Bank at its discretion. [1] The Bank has the absolute right to vary the prescribed interest rate at any time for any Facility by changing the Base Rate, Base Lending Rate, interest margin, or reference rate used to determine the rate. [2] The Bank can make these variations in its sole discretion. [2]';

  useEffect(() => {
    //on mount
    client
      .service("chatai")
      .find({ query: { $limit: 10000 } })
      .then((res) => {
        let results = res.data;
        setData(results);
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

  const createPropmtSuccessRecord = (responseObject) => {
    let _data = {
      sessionId: "1",
      chatAiId: "660a84ff899a21d9afef0b29",
      configid: "660a8b94899a21d9afef0c77",
      prompt: prompt,
      refDocs: [],
      responseText: responseObject["response_text"],
      systemId: responseObject["id"],
      type: responseObject["type"],
      role: responseObject["role"],
      model: responseObject["model"],
      stopReason: responseObject["stop_reason"],
      stopSequence: responseObject["stop_sequence"],
      inputTokens: responseObject["input_tokens"],
      outputTokens: responseObject["output_tokens"],
      cost: responseObject["output_tokens"] * 0.005,
      status: true,
      error: null,
      createdBy: props.user._id,
      updatedBy: props.user._id
    };

    client
      .service("prompts")
      .create(_data)
      .then((res) => {
        // console.log({ res });
        setCurrentPromptId(res["_id"]);
        props.alert({
          title: "ASL Chat Ai",
          type: "success",
          message: "Saved Prompt",
        });
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "Prompt",
          type: "error",
          message: error.message || "Failed to save Prompt",
        });
      });
  };

  const createPropmtFailureRecord = (error) => {
    let _data = {
      sessionId: "1",
      chatAiId: "660a84ff899a21d9afef0b29",
      configid: "660a8b94899a21d9afef0c77",
      prompt: "",
      ref_docs: [],
      response_text: "",
      system_id: "",
      type: "",
      role: "",
      model: "",
      stop_reason: "",
      stop_sequence: "",
      input_tokens: 0,
      output_tokens: 0,
      cost: 0,
      status: false,
      error: error.message,
    };

    client
      .service("prompts")
      .create(_data)
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "Prompt",
          type: "error",
          message: error.message || "Failed to save Prompt",
        });
      });
  };

  const patchUserRemarks = (userRemarks) => {
    if(!currentPromptId) {
      props.alert({
        title: "Prompt",
        type: "error",
        message: "Prompt Id not found.",
      });
      return;
    }
    console.log("currentPromptId",currentPromptId);
    console.log("userRemarks",userRemarks);
    client
    .service("prompts")
    .patch(currentPromptId, {userRemarks : userRemarks})
    .then((res) => {
      console.log({ res });
      props.alert({
        title: "ASL Chat Ai",
        type: "success",
        message: "Saved user remarks",
      });
    })
    .catch((error) => {
      console.log({ error });
      props.alert({
        title: "Prompt",
        type: "error",
        message: error.message || "Failed to save user remarks",
      });
    });
  }

  const getClaude3HaikuResponse = async () => {
    const API_URL = process.env.REACT_APP_SERVER_URL + "/claude3haiku";
    // Define the properties and data for the API request
    requestObject["preamble"] = "Here is the first question: " +  prompt
    const requestOptions = {
      method: "post",
      url: API_URL,
      data: requestObject,
      headers: {
        "Content-Type": "application/json",
      },
    };

    setLoading(true);
    setResponse("");

    try {
      const responseText = await axios(requestOptions);
      setLoading(false);
      const responseObject = responseText.data;
      displayLikeChatGPT(responseObject["response_text"]);
      createPropmtSuccessRecord(responseObject);
      // displayLikeChatGPT(sample);
      props.alert({
        type: "success",
        title: "Sending request to Chat Ai",
        message: "prompt sent successfully",
      });
    } catch (error) {
      // Add error class to the paragraph element and set error text
      setError(error?.message);
      createPropmtFailureRecord(error?.message);
      props.alert({
        type: "error",
        title: "Sending request to Chat Ai error",
        message: error?.message,
      });
      setResponse(
        "Oops! Something went wrong while retrieving the response. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const displayLikeChatGPT = (responseText) => {
    let i = 0;
    const stringResponse = responseText
      .replaceAll(". ", ".<br/> ")
      .replaceAll(": [", ":<br/><br/>[")
      .replaceAll(". [", ".<br/><br/>[")
      .replaceAll(": and (", ":<br/><br/> and (")
      .replaceAll(": (", ":<br/><br/>(")
      .replaceAll("; and (", ";<br/><br/> and (")
      .replaceAll("; (", ";<br/><br/>(")
      .replaceAll('." [', '."<br/><br/>[')
      .replaceAll("Relevant quotes", "<b>Relevant quotes</b>")
      .replaceAll(
        "Answers with citation:",
        ".<br/><br/> <p><b>Answers with citation:</b></p>"
      );
    const intervalId = setInterval(() => {
      if (stopDisplaying) i = stringResponse.length + 1;
      setResponse(stringResponse.slice(0, i));
      i++;
      if (i > stringResponse.length) {
        clearInterval(intervalId);
        setIsDisplaying(false);
        setStopDisplaying(false);
      }
    }, 20);

    return () => clearInterval(intervalId);
  };

  return (
    <ProjectLayout>
      {loading ? (
        <Dialog header="ASL Chat Ai in Progress" visible={loading}>
          {" "}
          <div className="flex justify-content-center align-items-vertical">
            <ProgressSpinner
              style={{ width: "50px", height: "50px" }}
              strokeWidth="8"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          </div>
          <Skeleton className="mb-2" borderRadius="16px"></Skeleton>
          <Skeleton
            width="10rem"
            className="mb-2"
            borderRadius="16px"
          ></Skeleton>
          <Skeleton
            width="5rem"
            borderRadius="16px"
            className="mb-2"
          ></Skeleton>
          <Skeleton
            height="2rem"
            className="mb-2"
            borderRadius="16px"
          ></Skeleton>
          <Skeleton width="10rem" height="4rem" borderRadius="16px"></Skeleton>
        </Dialog>
      ) : (
        <div>
          <div className="card p-0 overflow-hidden">
            <ChataiProjectActionPage
              selectedModel={selectedModel}
              requestObject={requestObject}
              setSelectedModel={(model) => setSelectedModel(model)}
              openChatAiConfig={openChatAiConfig}
              setOpenChatAiConfig={(conf) => {
                setOpenChatAiConfig(conf);
              }}
              openFAChatAiConfig={openFAChatAiConfig}
              setOpenFAChatAiConfig={setOpenFAChatAiConfig}
              setPrompt={(prompt) => {
                setPrompt(prompt);
                setResponse("");
              }}
            />
          </div>
          <div
            className="card"
            style={{
              minHeight: "calc(65vh - 100px)",
              height: "fit-content",
              position: "relative",
            }}
          >
            <ChataiProjectResponsePage
              response={response}
              error={error}
              setStopDisplaying={setStopDisplaying}
              stopDisplaying={stopDisplaying}
            />
          </div>
          <div className="card m-0 p-2">
            <ChataiProjectPromptPage
              setPrompt={(prompt) => setPrompt(prompt)}
              prompt={prompt}
              isDisplaying={isDisplaying}
              setIsDisplaying={(conf) => {
                setIsDisplaying(conf);
              }}
              getChatAiResponse={() => getClaude3HaikuResponse()}
              setStopDisplaying={(set) => setStopDisplaying(set)}
              stopDisplaying={stopDisplaying}
              patchUserRemarks={(remarks) => patchUserRemarks(remarks)}
            />
          </div>
        </div>
      )}
    </ProjectLayout>
  );
};
const mapState = (state) => {
  const { user } = state.auth;
  return { user };
};
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(ChataiProjectLayoutPage);
