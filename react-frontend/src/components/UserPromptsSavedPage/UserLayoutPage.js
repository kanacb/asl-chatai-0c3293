// REACT 18 TEMPLATE - <Service>Page.js

import React, { useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import UserLayout from "../Layouts/UserLayout";
import { Skeleton } from "primereact/skeleton";
import UserPromptsSavedPage from "./UserPromptsSavedPage";

const UserLayoutPage = (props) => {
  const [loading, setLoading] = useState(false);
  return (
    <UserLayout>
      {loading ? (
        <Skeleton width="100%" height="20rem" />
      ) : (
        <div
          className="card p-0 overflow-hidden "
          style={{ minHeight: "80%", position: "relative" }}
        >
          <UserPromptsSavedPage />
        </div>
      )}
    </UserLayout>
  );
};
const mapState = (state) => ({
  //
});
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(UserLayoutPage);
