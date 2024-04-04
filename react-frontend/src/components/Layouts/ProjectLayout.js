import React, { useState, useEffect, useRef } from "react";
import "./ProjectLayout.css";
import client from "../../services/restClient";
import { connect } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { AppMenu } from "../Layouts/AppMenu";
import { Button } from "primereact/button";

const leftMenuStyle = {
  open: { transform: "translateX(0)" },
  close: { transform: "translateX(-100%)" },
};

const mainLayoutStyle = {
  open: { marginLeft: "260px" },
  close: { marginLeft: 0 },
};

const ProjectLayout = (props) => {
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [prompts, setPrompts] = useState([]);
  const urlParams = useParams();
  const copyTooltipRef = useRef();
  const location = useLocation();

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      // Set window width/height to state
      if (window.innerWidth < 720) if (props.menuOpen) props.setMenuOpen(false);
    };
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [props]); // Empty array ensures that effect is only run on mount

  useEffect(() => {
    if (mobileMenuActive) {
      addClass(document.body, "body-overflow-hidden");
    } else {
      removeClass(document.body, "body-overflow-hidden");
    }
  }, [mobileMenuActive]);

  useEffect(() => {
    copyTooltipRef &&
      copyTooltipRef.current &&
      copyTooltipRef.current.updateTargetEvents();
  }, [location]);

  const onMenuItemClick = (event) => {
    if (!event.item.items) {
      setMobileMenuActive(false);
    }
  };

  const userPrompts = client.service("prompts");
  useEffect(() => {
    userPrompts.on("created", (newPrompt) => {
      setPrompts((prevPrompts) => {
        if (Array.isArray(prevPrompts) && !prevPrompts?.includes(newPrompt))
          [newPrompt, ...prevPrompts];
      });
    });
    //on mount
    client
      .service("prompts")
      .find({
        query: {
          $limit: 10000,
          $populate: [
            {
              path: "chataiid",
              service: "chatai",
              select: ["name"],
            },
            {
              path: "configid",
              service: "config",
              select: ["name"],
            },
          ],
        },
      })
      .then((res) => {
        let results = res.data;
        setPrompts(results);
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "Prompts",
          type: "error",
          message: error.message || "Failed get prompts",
        });
      });
  }, []);

  const menu = [
    {
      label: "Ai Chat Bot",
      items: [
        {
          label: "Data Management",
          icon: "pi pi-fw pi-users",
          to: `/users`,
        },
      ],
    },
  ];

  const addClass = (element, className) => {
    if (element.classList) element.classList.add(className);
    else element.className += " " + className;
  };

  const removeClass = (element, className) => {
    if (element.classList) element.classList.remove(className);
    else
      element.className = element.className.replace(
        new RegExp(
          "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
          "gi",
        ),
        " ",
      );
  };

  return (
    <div className="">
      <div
        className={`layout-sidebar my-custom-scroll-bar my-custom-scroll-bar-margin overflow-x-hidden`}
        style={props.menuOpen ? leftMenuStyle.open : leftMenuStyle.close}
      >
        <div
          className="absolute"
          style={{ right: "-1.5rem", top: "30%", bottom: "50%" }}
        >
          <Button
            className="p-button no-focus-effect h-full pr-3"
            style={{ borderRadius: "20px", minHeight: "10rem" }}
            onClick={() => props.setMenuOpen(!props.menuOpen)}
          />
        </div>

        <AppMenu
          model={menu}
          onMenuItemClick={onMenuItemClick}
          layoutColorMode={"light"}
        />
        <h6>My Chats</h6>

        {prompts?.map((prompt, i) => (
          <div>
            {i + 1}. {prompt?.prompt}
          </div>
        ))}
      </div>

      <div
        className="layout-project-container"
        style={props.menuOpen ? mainLayoutStyle.open : mainLayoutStyle.close}
      >
        <div className={`layout-main ${props.contentClassName}`}>
          {props.children}
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => {
  const { menuOpen } = state.layout;
  return { menuOpen };
};
const mapDispatch = (dispatch) => ({
  setMenuOpen: (bool) => dispatch.layout.setMenuOpen(bool),
});

export default connect(mapState, mapDispatch)(ProjectLayout);
