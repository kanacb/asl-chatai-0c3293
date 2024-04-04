import React from "react";

const AppFooter = (props) => {
  return (
    <div className="layout-footer">
      <small className="mr-2">powered by</small>
      <img
        src={"../../assets/logo/cb-logo.svg"}
        alt="Logo"
        height="20"
        className="mr-2"
      />
      <small>
        <span className="font-bold ml-1">CodeBridge </span>
      </small>
    </div>
  );
};
export default AppFooter;
