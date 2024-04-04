import React from "react";
import "../Layouts/ProjectLayout.css";
import { connect } from "react-redux";
import _ from "lodash";

const ChataiProjectResponsePage = (props) => {
  const initialPage = () => {
    return (
      <div className="mt-3">
        <div className="grid grid-nogutter flex">
          <div className=" cursor-pointer min-w-max flex align-items-center">
            <img
              src={
                "https://i0.wp.com/www.asl.com.my/wp-content/uploads/2021/11/ASL_Logo.png?fit=1970%2C1072&ssl=1"
              }
              height={45}
              className="mb-1"
            />
          </div>
          <div className="col-3 p-2">How can I help you?</div>
        </div>
        <div className="grid flex justify-content-center">
          <div className="card col-4">Facility Agreement (available)</div>
          <div className="card col-offset-1 col-4">Assignment & Charge (on hold)</div>
          <div className="card col-4">Power of Attorney(on hold)</div>
          <div className="card col-offset-1 col-4">Debenture(on hold)</div>
        </div>
      </div>
    );
  };

  const responsePage = () => {
    return (
      <div className="flex justify-content-start">
        <div
          className="m-3 scrollable"
          dangerouslySetInnerHTML={{ __html: props.response }}
        ></div>
      </div>
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

const mapState = (state) => ({
  //
});

const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(ChataiProjectResponsePage);
