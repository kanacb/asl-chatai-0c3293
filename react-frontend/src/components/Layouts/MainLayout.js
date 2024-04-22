import React from "react";

const MainLayout = (props) => {
  return (
    <div className="layout-normal-container surface-card">{props.children}</div>
  );
};

export default MainLayout;
