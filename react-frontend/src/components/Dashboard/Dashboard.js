import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import client from "../../services/restClient";
import welcomeImg from "../../assets/media/welcome-banner.png";

const DivServices = (props) => {
  const [data, setData] = useState([]);
  const [agg, setAgg] = useState([]);

  useEffect(() => {
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
        setData(results);

        const cost = res.data.reduce((acc, val) => acc + val["cost"], 0);
        const costLatest = res.data.reduce((acc, val) => acc + val["cost"], 0);
        const countLatest = res.data.reduce((acc, val) => acc + 1, 0);
        const _agg = {
          count: res.data.length,
          countLatest: countLatest.fixed(2),
          sum: countLatest,
          cost: cost,
          costLatest: costLatest,
        };
        setAgg(_agg);
      })
      .catch((error) => {
        console.log({ error });
        // props.alert({
        //   title: "Prompts",
        //   type: "error",
        //   message: error.message || "Failed get prompts",
        // });
      });
  }, []);

  return (
    <div className="w-full flex justify-content-center flex-wrap ">
      {/* Links to services */}
      <div className="col-12 lg:col-6 xl:col-4">
        <Link to="/chataiProject">
          <div
            className="card mb-0 flex flex-column align-items-center justify-content-center hover zoom"
            style={{ height: "10rem" }}
          >
            <div className="text-900 font-medium text-lg">ASL Chat Ai</div>
          </div>
        </Link>
      </div>
      {/* ~cb-add-services-card~ */}

      <div className="grid mt-8">
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Prompts</span>
                <div className="text-900 font-medium text-xl">
                  {agg["count"]}
                </div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-blue-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-shopping-cart text-blue-500 text-xl"></i>
              </div>
            </div>
            <span className="text-green-500 font-medium">24 new </span>
            <span className="text-500">since last visit</span>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Cost</span>
                <div className="text-900 font-medium text-xl">
                  {agg["cost"]}
                </div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-orange-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-map-marker text-orange-500 text-xl"></i>
              </div>
            </div>
            <span className="text-green-500 font-medium">%52+ </span>
            <span className="text-500">since last week</span>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Input</span>
                <div className="text-900 font-medium text-xl">28441</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-cyan-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-inbox text-cyan-500 text-xl"></i>
              </div>
            </div>
            <span className="text-green-500 font-medium">520 </span>
            <span className="text-500">newly registered</span>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Output</span>
                <div className="text-900 font-medium text-xl">152 Unread</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-purple-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-comment text-purple-500 text-xl"></i>
              </div>
            </div>
            <span className="text-green-500 font-medium">85 mill </span>
            <span className="text-500">tokens received</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const GetStarted = () => {
  return (
    <div className="w-full flex justify-content-center flex-wrap ">

      <div className="col-12 lg:col-6 xl:col-4">
        <Link to="/login">
          <div
            className="card mb-0 flex flex-column hover zoom"
            style={{ height: "10rem" }}
          >
            <div className="text-900 font-medium text-lg align-items-center justify-content-center">
              Login
            </div>
            <div className="text-900 mt-5 font-medium text-lg justify-content-end">
              If you have an account? By Invitation only.
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

const Dashboard = (props) => {
  useEffect(() => {}, []);
  const url = process.env.REACT_APP_SERVER_URL;
  return (
    <div className="col-12 flex flex-column align-items-center">
      <div className="flex w-10">
        <div className=" w-8">
          <h4 className="ml-4">App is Ready</h4>
          {props.isLoggedIn ? DivServices() : GetStarted()}
        </div>
        <div className="w-4 flex flex-column align-items-center">
          <img src={welcomeImg} alt="welcome" className="h-30rem" />
          <p className="text-7xl m-0">Welcome to ASL Chat Ai!</p>
          <p>You are ready to go!</p>
        </div>
      </div>
      {props.isLoggedIn ? null : (
        <div className="card w-10 my-6">
          <h4>REST API Ready</h4>
          <p className="underline m-0">e.g. Authentication</p>
          <p>
            POST {`${url}`}/authentication{" "}
            {`{ "email": "example@email.com",    "password": "123456" }`}
          </p>
          <p className="underline m-0">e.g. CRUD</p>
          <p className="m-0">
            GET {`=>`} GET {`${url}`}/users/{`<userId>`}
          </p>
          <p className="m-0">
            CREATE {`=>`} POST {`${url}`}/users`{" "}
            {`{ "email": "example2@email.com",    "password": "456789" }`}
          </p>
          <p className="m-0">
            PATCH {`=>`} PATCH {`${url}`}/users/{`<userId>`}`{" "}
            {`{ "name": "Thomas Smith" }`}
          </p>
          <p className="m-0">
            DELETE {`=>`} DELETE {`${url}`}/users/{`<userId>`}
          </p>
        </div>
      )}
    </div>
  );
};

const mapState = (state) => {
  const { isLoggedIn } = state.auth;
  return { isLoggedIn };
};

const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(Dashboard);
