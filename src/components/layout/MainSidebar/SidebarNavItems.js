import React, { useEffect } from "react";
import { Nav } from "shards-react";

import SidebarNavItem from "./SidebarNavItem";
import { Store } from "../../../flux";
import jwt_decode from "jwt-decode";

let storedData,
  token,
  tokenDecode,
  designation_id = 0,
  navMenu = [];

if (localStorage.getItem("userData")) {
  storedData = JSON.parse(localStorage.getItem("userData"));
  token = storedData.token;
  tokenDecode = jwt_decode(token);
  designation_id = tokenDecode.designation_id;
}

class SidebarNavItems extends React.Component {
  constructor(props) {
    super(props);
    this.fetchApplication();

    this.state = {
      navItems: navMenu
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    Store.addChangeListener(this.onChange);
  }

  async fetchApplication() {
    if (navMenu.length >= 1) {
      return;
    }
    if (token) {
      navMenu.push({
        title: "Dashboard",
        to: "/dashboard",
        application_id: 0
      });
      if (designation_id === 1) {
        Store.getSidebarItems().map((item, index) => {
          navMenu.push({
            application_id: item.application_id,
            title: item.title,
            to: item.to
          });
        });
      }
      try {
        const responseData = await fetch(
          process.env.REACT_APP_BACKEND_URL + `/authorization/list`,
          {
            method: "GET",
            body: null,
            headers: {
              Authorization: `Bearer ${token}`,
              application_id: 0,
              navigation_bar: "1"
            }
          }
        );
        const response = await responseData.json();

        response.DATA[0].map((item, index) => {
          navMenu.push({
            application_id: item.application_id,
            title: item.name,
            to: `/${item.description}`
          });
        });
      } catch (error) {
        console.log(error);
      }
      navMenu.push({
        application_id: 0,
        title: "Logout",
        to: "/logout"
      });
    }
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      ...this.state,
      navItems: navMenu
    });
  }

  render() {
    const { navItems: items } = this.state;

    setTimeout(() => {
      this.setState({ timePassed: true });
    });
    if (this.state.timePassed) {
      return (
        <div className="nav-wrapper">
          <Nav className="nav--no-borders flex-column">
            {items.map((item, idx) => {
              return <SidebarNavItem key={idx} item={item} />;
            })}
          </Nav>
        </div>
      );
    } else {
      return "";
    }
  }
}

export default SidebarNavItems;
