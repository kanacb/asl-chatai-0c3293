import React, { useState, useEffect } from "react";
import "../Layouts/ProjectLayout.css";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import _ from "lodash";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Editor } from "primereact/editor";
import "./ChatAiProjectLayout.css";

const ChataiProjectResponsePage = (props) => {
  const [up, setUp] = useState(null);
  const [down, setDown] = useState(null);
  const [showRemarks, setShowRemarks] = useState(false);
  const [remarks, setRemarks] = useState(false);
  const [emailTo, setEmailTo] = useState(false);
  const urlParams = useParams();

  const emailToFunction = () => {
    const userEmail = props.user.email;
    let promptInnerHTML = document.getElementById("prompt");
    if (promptInnerHTML) promptInnerHTML = promptInnerHTML.innerHTML;
    let responseInnerHTML = document.getElementById("response");
    if (responseInnerHTML) responseInnerHTML = responseInnerHTML.innerHTML;
    const content = `Prompt:%20${promptInnerHTML}%20Response:%20${responseInnerHTML}`;
    return `mailto:${userEmail}?subject=ASL&body=${content}`;
  };

  useEffect(() => {
    const emailToString = emailToFunction();
    setEmailTo(emailToString);
  });

  const copyToClipBoard = () => {
    const content = `Prompt: ${props.responsePrompt}/n Response: ${props.response}`;
    navigator.clipboard.writeText(content);
    props.alert({
      type: "success",
      title: "Copied to clipboard",
      message: "Prompt and response",
    });
  };

  const setThumbs = (like) => {
    if (like === "up") {
      if (up === null) setUp(true);
      else if (up === true) setUp(false);
      else if (up === false) setUp(null);
    } else {
      if (down === null) setDown(true);
      else if (down === true) setDown(false);
      else if (down === false) setDown(null);
    }
  };

  const initialPage = () => {
    return (
      <div className="mt-3 fadein">
        <div className="grid grid-nogutter flex">
          <div className="col-7 cursor-pointer min-w-max flex align-items-center container">
            <img
              src="https://media.licdn.com/dms/image/D5612AQH0Ok7g3XGBsw/article-cover_image-shrink_720_1280/0/1694753996052?e=1718841600&v=beta&t=hqnaIjOcwF35BUbblP5rfTBlQv3LnRTUrehDWvitilE"
              height={280}
              className="mb-1 animation-duration-500"
            />{" "}
            <p className="bottom-right">
              <a target="_blanck" href="https://www.linkedin.com/pulse/ai-lawyers-how-generative-transforming-legal-industry-avishkaram/">
                Read More
              </a>
            </p>
          </div>
          <div className="col-5 min-h-max p-2 fadein animation-duration-1000 flex flex-wrap align-items-center">
            <span className="vertical-align-middle">
              <h3>How can I help you?</h3>
            </span>
          </div>
        </div>
        <div className="grid flex justify-content-center mt-5">
          <div className="card col-4 fadein animation-duration-3000 animation-delay-1000 animation-iteration-2">
            Facility Agreement (available)
          </div>
          <div className="card col-offset-1 col-4 fadein animation-duration-3000 animation-delay-2000">
            Assignment & Charge (beta)
          </div>
          <div className="card col-4 fadein animation-duration-3000 animation-delay-3000">
            Power of Attorney(beta)
          </div>
          <div className="card col-offset-1 col-4 fadein animation-duration-3000">
            Debenture(beta)
          </div>
        </div>
      </div>
    );
  };

  const responsePage = () => {
    return (
      <>
        <div id="prompt" className="m-3">
          <b>Prompt:</b>
          <p>{props.responsePrompt}</p>
        </div>

        <div className="grid">
          <div className="col-1 vertical-align-middle">
            <Button
              key={`${urlParams.promptId || props?.currentPromptId}-up-button`}
              label="Up"
              icon={up ? "pi pi-thumbs-up-fill" : "pi pi-thumbs-up"}
              className="m-2"
              size="small"
              iconPos="left"
              rounded
              text
              severity="primary"
              aria-label="Up"
              onClick={() => {
                setThumbs("up");
                setDown(null);
                console.log(props.currentPromptId);
                props.patchResponse(
                  {
                    currentPromptId:
                      urlParams.promptId || props.currentPromptId,
                    data: { thumbsUp: up === null },
                  },
                  up === null
                    ? "Saved user Thumbs Up, thank you."
                    : "Write your remarks on how to improve!",
                  "Failed to save thumbs up"
                );
              }}
            />
            <Button
              key={`${urlParams.promptId || props?.currentPromptId}-down-button`}
              label="Down"
              icon={down ? "pi pi-thumbs-down-fill" : "pi pi-thumbs-down"}
              className="m-2"
              size="small"
              iconPos="left"
              rounded
              text
              severity="primary"
              aria-label="Down"
              onClick={() => {
                setThumbs("down");
                setUp(null);
                props.patchResponse(
                  {
                    currentPromptId:
                      urlParams.promptId || props.currentPromptId,
                    data: { thumbsDown: down === null },
                  },
                  down === null
                    ? "Saved user Thumbs Down, thank you."
                    : "Write your remarks on how to improve!",
                  "Failed to save thumbs down"
                );
              }}
            />
            <Button
              key={`${urlParams.promptId || props?.currentPromptId}-rem-button`}
              label="Remarks"
              icon="pi pi-book"
              className="m-2"
              size="small"
              iconPos="left"
              rounded
              text
              severity="primary"
              aria-label="Remarks"
              onClick={() => {
                setShowRemarks(true);
              }}
            />
            <Button
              key={`${urlParams.promptId || props?.currentPromptId}-cp-button`}
              label="Copy"
              icon="pi pi-copy"
              className="m-2"
              size="small"
              iconPos="left"
              rounded
              text
              severity="primary"
              aria-label="Copy"
              onClick={() => {
                copyToClipBoard();
                props.patchResponse(
                  {
                    currentPromptId:
                      urlParams.promptId || props.currentPromptId,
                    data: { copied: true },
                  },
                  "Saved copied",
                  "Failed to save copy"
                );
              }}
            />
            <Button
              key={`${urlParams.promptId || props?.currentPromptId}-em-button`}
              label="Email"
              icon="pi pi-envelope"
              className="m-2"
              size="small"
              iconPos="left"
              rounded
              text
              severity="primary"
              aria-label="Email"
              onClick={() => {
                window.location = emailTo;
                props.patchResponse(
                  {
                    currentPromptId:
                      urlParams.promptId || props.currentPromptId,
                    data: { emailed: true },
                  },
                  "Saved user Email To",
                  "Failed to save user email to"
                );
              }}
            />
          </div>
          <div className="col-11">
            <div
              id="response"
              className="m-3 scrollable"
              dangerouslySetInnerHTML={{ __html: props.response }}
            ></div>
          </div>
        </div>

        <Dialog
          header="My Remarks"
          visible={showRemarks}
          style={{ width: "50vw" }}
          onHide={() => setShowRemarks(false)}
        >
          <Editor
            value={props.responseRemarks}
            onTextChange={(e) => setRemarks(e.htmlValue)}
            style={{ height: "350px" }}
          />
          <div className="flex justify-content-end ">
            <Button
              text
              type="submit"
              label="Save"
              onClick={() =>
                props.patchResponse(
                  {
                    currentPromptId: urlParams.promptId || props.response?._id,
                    data: { userRemarks: remarks },
                  },
                  "Saved user Remarks",
                  "Failed to save remarks"
                )
              }
            />
          </div>
        </Dialog>
      </>
    );
  };

  const errorPage = () => {
    return (
      <div
        className="mt-3 overflow-hidden flex justify-content-center m-3 sc"
        style={{ height: "55vh" }}
      >
        {props.error}
      </div>
    );
  };

  if (props.error) {
    return errorPage();
  } else if (props.response) {
    return responsePage();
  } else return initialPage();
};

const mapState = (state) => {
  const { user } = state.auth;
  return { user };
};

const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(ChataiProjectResponsePage);
