import React, { useContext, useRef } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { LayoutContext } from "./context/LayoutContext";

const AppTopbar = (props) => {
  const navigate = useNavigate();
  const userMenuRef = useRef(null);
  const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } =
    useContext(LayoutContext);

  const showMenu = (e) => {
    if (userMenuRef?.current) userMenuRef.current.show(e);
  };
  const closeMenu = (e) => {
    if (userMenuRef?.current) userMenuRef.current.hide(e);
  };
  const items = [
    {
      label: "Account",
      icon: "pi pi-flag",
      command: () => navigate("/account"),
    },
    {
      label: "Log Out",
      icon: "pi pi-fw pi-sign-out",
      template: (item) => {
        return (
          <ul className="p-menu-list p-reset border-top-1 border-200">
            <li className="p-menu-list p-reset" key={item.label}>
              <a className="p-menuitem-link" onClick={onLogout} role="menuitem">
                <span
                  className={"p-menuitem-icon pi pi-sign-out text-primary"}
                ></span>
                <span className={"p-menuitem-text text-primary"}>
                  {item.label}
                </span>
              </a>
            </li>
          </ul>
        );
      },
    },
  ];

  const onLogout = async (e) => {
    try {
      await props.logout();
      navigate("/", { replace: true });
      closeMenu(e);
    } catch (error) {
      //
    }
  };
  return (
    <div className="layout-topbar">
      <Link to="/">
        <div className="cursor-pointer min-w-max flex align-items-end container">
          <img src={process.env.REACT_APP_LOGO} height={40} className="op-5" />
          <p className="centered m-0">GenAi</p>
        </div>
      </Link>

      {!props.showSideMenuButton ? (
        <button
          type="button"
          className="p-link  layout-menu-button layout-topbar-button"
          onClick={onMenuToggle}
        >
          <i className="pi pi-bars" />
        </button>
      ) : null}

      <button
        type="button"
        className="p-link layout-topbar-menu-button layout-topbar-button"
        onClick={props.onMobileTopbarMenuClick}
      >
        <i className="pi pi-ellipsis-v" />
      </button>

      <ul
        className={
          "layout-topbar-menu lg:flex origin-top" +
          (props.mobileTopbarMenuActive
            ? " layout-topbar-menu-mobile-active"
            : "")
        }
      >
        {props.onSettings ? (
          <li>
            <button
              className="p-link layout-topbar-button"
              onClick={props.onSettings}
            >
              <i className="pi pi-cog" />
              <span>Settings</span>
            </button>
          </li>
        ) : null}
        {props.onAccount ? (
          <li>
            <button
              className="p-link layout-topbar-button"
              onClick={props.onAccount}
            >
              <i className="pi pi-user" />
              <span>Profile</span>
            </button>
          </li>
        ) : null}
      </ul>
      <Menu model={items} popup ref={userMenuRef} id="user-popup-menu" />
      {props.isLoggedIn ? (
        <Button
          className="p-button-rounded p-button-outlined ml-3"
          style={{ zIndex: 20 }}
          icon="pi pi-user"
          label={props.user?.email}
          onClick={showMenu}
          aria-controls="user-popup-menu"
          aria-haspopup
        />
      ) : (
        <Button
          label="login"
          className="p-button-rounded"
          onClick={() => navigate("/login")}
        />
      )}
    </div>
  );
};

const mapState = (state) => {
  const { isLoggedIn, user } = state.auth;
  return { isLoggedIn, user };
};
const mapDispatch = (dispatch) => ({
  logout: () => dispatch.auth.logout(),
});

export default connect(mapState, mapDispatch)(AppTopbar);
