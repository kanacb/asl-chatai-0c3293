import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import client from "../../services/restClient";
import welcomeImg from "../../assets/media/welcome-banner.png";

const DivServices = (props) => {
  const [data, setData] = useState([]);
  const [agg, setAgg] = useState({});

  useEffect(() => {
    //on mount
    client
      .service("prompts")
      .find({
        query: {
          $limit: 10000,
          $populate: [
            {
              path: "chatAiId",
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
        const today = new Date();
        const lastWeek = today.setDate(today.getDate() - 7);
        const cost = results.reduce((acc, val) => acc + val["cost"], 0);
        const costlastWeek = results.reduce(
          (acc, val) =>
            Date.parse(val["createdAt"]) > lastWeek ? acc + val["cost"] : 0,
          0
        );
        const countYesterday = results.reduce(
          (acc, val) => (Date.parse(val["createdAt"]) > today ? acc + 1 : 0),
          0
        );
        const inputTokens = results.reduce(
          (acc, val) => (val["inputTokens"] ? acc + val["inputTokens"] : 0),
          0
        );
        const inputTokensLastWeek = results.reduce(
          (acc, val) =>
            val["inputTokens"] && Date.parse(val["createdAt"]) > lastWeek
              ? acc + val["inputTokens"]
              : 0
                ? val["inputTokens"]
                : 0,
          0
        );
        const outputTokens = results.reduce(
          (acc, val) => (val["outputTokens"] ? acc + val["outputTokens"] : 0),
          0
        );
        const outputTokensLastWeek = results.reduce(
          (acc, val) =>
            Date.parse(val["createdAt"]) > lastWeek && val["outputTokens"]
              ? acc + val["outputTokens"]
              : 0,
          0
        );
        const _agg = {
          count: results.length,
          countYesterday: countYesterday,
          cost: cost.toFixed(2),
          costLatest: ((costlastWeek / cost) * 100).toFixed(2),
          inputTokens,
          inputTokensLastWeek,
          outputTokens,
          outputTokensLastWeek,
        };
        setAgg(_agg);
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
            <div className="mt-5 flex justify-content-end">
              click here to start!
              <i
                className="ml-3 pi pi-fw pi-arrow-right"
                style={{ fontSize: "1.5rem" }}
              ></i>
            </div>
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
                <div className="text-900 font-medium text-xl">{agg?.count}</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-blue-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-send text-blue-500 text-xl"></i>
              </div>
            </div>
            <span className="text-green-500 font-medium">
              {agg?.countYesterday} new{" "}
            </span>
            <span className="text-500">since yesterday</span>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Cost</span>
                <div className="text-900 font-medium text-xl">
                  RM{agg?.cost}
                </div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-orange-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-dollar text-orange-500 text-xl"></i>
              </div>
            </div>
            <span className="text-green-500 font-medium">
              {agg?.costLatest}%{" "}
            </span>
            <span className="text-500">since last week</span>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  Input total
                </span>
                <div className="text-900 font-medium text-xl">
                  {agg?.inputTokens}
                </div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-cyan-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-arrow-right text-cyan-500 text-xl"></i>
              </div>
            </div>
            <span className="text-green-500 font-medium">
              {agg?.inputTokensLastWeek}{" "}
            </span>
            <span className="text-500">since last week</span>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  Output total
                </span>
                <div className="text-900 font-medium text-xl">
                  {agg?.outputTokens}
                </div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-purple-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-arrow-left text-purple-500 text-xl"></i>
              </div>
            </div>
            <span className="text-green-500 font-medium">
              {agg?.outputTokensLastWeek}{" "}
            </span>
            <span className="text-500">generated last week</span>
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
  const url = process.env.REACT_APP_SERVER_URL;
  const env = process.env.REACT_APP_ENV;
  const navbarHeight = '100px';
  const footerHeight = '60px';
  if(!props.isLoggedIn) localStorage.clear()
  
  return (
    <div className="col-12 flex flex-column align-items-center" style={{ minHeight : `calc(100vh - ${navbarHeight} - ${footerHeight})`}}>
      <div className="flex w-10">
        <div className=" w-8">
          <h4 className="ml-4">App is Ready</h4>
          {props.isLoggedIn ? DivServices() : GetStarted()}
        </div>
        <div className="w-4 flex flex-column align-items-center">
          <img src={welcomeImg} alt="welcome" className="h-30rem" />
          <p className="text-3xl m-0">Welcome to </p>
          <p className="text-7xl m-0">ASL Chat Ai!</p>
          <p>You are ready to go!</p>
        </div>
      </div>
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
