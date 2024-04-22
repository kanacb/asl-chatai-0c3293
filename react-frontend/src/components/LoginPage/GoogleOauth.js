import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { auth, providerForGoogle } from "./Firebase.config";
import client from "../../services/restClient";
import { signInWithPopup } from "firebase/auth";

const GoogleOauth = (props) => {
  const { type } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (props.isLoggedIn === true) navigate("/user/studio");
  }, [props.isLoggedIn]);

  //handle google Oauth
  const handleGoogleOauth = () => {
    signInWithPopup(auth, providerForGoogle).then(async (data) => {
      const email = data?.user?.providerData[0]?.email;

      if (!email) {
        props.alert({
          type: "error",
          title: "Login",
          message: "Invalid CODE: 001500",
        });
        return;
      }

      const userExist = await client.service("users").find({
        query: {
          $limit: 1,
          email: email,
        },
      });
      const userInvited = await client.service("userInvitations").find({
        query: {
          $limit: 1,
          email: email,
        },
      });

      if (userExist?.data?.length === 0 && userInvited?.data?.length === 1) {
        if (!userInvited?.data[0]?.accepted) {
          signUp(data, userInvited);
        }
        else {
          props.alert({
            type: "error",
            title: "Login",
            message: "Invalid CODE: 001502",
          });
        }
      } else {
        if (userInvited?.data[0]?.accepted) login(data);
        else {
          props.alert({
            type: "error",
            title: "Login",
            message: "opps, login by invitation only",
          });
        }
      }
    });

    const login = (data) => {
      const password = data?.user?.providerData[0]?.uid;
      const email = data?.user?.providerData[0]?.email;
      props
        .loginForOAuth({ email, password })
        .then(() => {
          navigate("/");
        })
        .catch(() => {
          props.alert({
            type: "error",
            title: "Login",
            message: error.message,
          });
          navigate("/login");
        });
    };

    const signUp = async (data, userInvited) => {
      const name = data?.user?.providerData[0]?.displayName;
      const email = data?.user?.providerData[0]?.email;
      const password = data?.user?.providerData[0]?.uid;
      const imageUrl = data?.user?.providerData[0]?.photoURL;
      const provider = data?.user?.providerData[0]?.providerId;
      const uId = data?.user?.providerData[0]?.uid;

      return await props
        .createUserForOauth({
          name,
          email,
          password,
          imageUrl,
          provider,
          uId,
        })
        .then((res) => {
          login(data);
          client.service('userInvitations').patch(userInvited?.data[0]?._id,{ accepted : true});
        })
        .catch((error) => {
          props.alert({
            type: "error",
            title: "Login",
            message: error.message,
          });
          navigate("/login");
        });
    };
  };

  return (
    <>
      <Button
        onClick={handleGoogleOauth}
        style={{ background: "#fff", padding: "10px 30px" }}
        className="flex gap-20 items-center"
      >
        <i
          className="pi pi-google"
          style={{ color: "red", fontSize: "20px" }}
        ></i>
        <div
          style={{
            color: "#000",
            fontSize: "1.2rem",
            marginLeft: "20px",
          }}
        >
          {type === "login" ? "Login with Google" : "Sign up with Google"}
        </div>
      </Button>
    </>
  );
};

const mapState = (state) => {
  const { isLoggedIn, passwordPolicyErrors } = state.auth;
  return { isLoggedIn, passwordPolicyErrors };
};
const mapDispatch = (dispatch) => ({
  createUserForOauth: (data) => dispatch.auth.createUserForOauth(data),
  loginForOAuth: (data) => dispatch.auth.loginForOAuth(data),
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(GoogleOauth);
