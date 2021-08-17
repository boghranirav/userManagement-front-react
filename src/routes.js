import { useEffect, useState } from "react";
// import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import CreateApplication from "./user/pages/CreateApplication";
import User from "./user/pages/User";
import Role from "./user/pages/Role";
import Designation from "./user/pages/Designation";
import Product from "./application/product/pages/Product";
import Vehicle from "./application/vehicle/pages/Vehicle";
import VehicleImage from "./application/vehicle/pages/VehicleImage";
import College from "./application/college/pages/College";
import Dashboard from "./user/pages/Dashboard";
import LoginLog from "./user/pages/LoginLog";

export const UserNavigationLink = () => {
  let routes;
  // const { sendRequest } = useHttpClient();
  // const [loadedApplication, setLoadedApplication] = useState("");
  // const storedData = JSON.parse(localStorage.getItem("userData"));
  // const token = storedData.token;
  // const tokenDecode = jwt_decode(token);
  // const designation_id = tokenDecode.designation_id;

  // useEffect(() => {
  //   const fetchApplication = async () => {
  //     try {
  //       const responseData = await sendRequest(
  //         process.env.REACT_APP_BACKEND_URL + `/authorization/list`,
  //         "GET",
  //         null,
  //         {
  //           Authorization: `Bearer ${token}`,
  //           application_id: 1
  //         }
  //       );
  //       setLoadedApplication(responseData.DATA[0]);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchApplication();
  // }, [token]);

  // if (designation_id === 1) {
  routes = [
    {
      path: "/dashboard",
      exact: true,
      layout: DefaultLayout,
      component: Dashboard
    },
    {
      path: "/create-application",
      exact: true,
      layout: DefaultLayout,
      component: CreateApplication
    },
    {
      path: "/create-designation",
      exact: true,
      layout: DefaultLayout,
      component: Designation
    },
    {
      path: "/create-role",
      exact: true,
      layout: DefaultLayout,
      component: Role
    },
    {
      path: "/user-profile",
      layout: DefaultLayout,
      component: User
    },
    {
      path: "/create-vehicle",
      layout: DefaultLayout,
      component: Vehicle
    },
    {
      path: "/create-college",
      layout: DefaultLayout,
      component: College
    },
    {
      path: "/view-vehicle-image",
      layout: DefaultLayout,
      component: VehicleImage
    },
    {
      path: "/create-product",
      layout: DefaultLayout,
      component: Product
    },
    {
      path: "/log-activity",
      layout: DefaultLayout,
      component: LoginLog
    }
  ];
  // } else {
  //   routes = [
  //     {
  //       path: "/create-application",
  //       exact: true,
  //       layout: DefaultLayout,
  //       component: CreateApplication
  //     },
  //     {
  //       path: "/create-designation",
  //       exact: true,
  //       layout: DefaultLayout,
  //       component: Designation
  //     },
  //     {
  //       path: "/create-role",
  //       exact: true,
  //       layout: DefaultLayout,
  //       component: Role
  //     },
  //     {
  //       path: "/user-profile",
  //       layout: DefaultLayout,
  //       component: User
  //     },
  //     {
  //       path: "/create-vehicle",
  //       layout: DefaultLayout,
  //       component: Vehicle
  //     },
  //     {
  //       path: "/create-college",
  //       layout: DefaultLayout,
  //       component: College
  //     },
  //     {
  //       path: "/view-vehicle-image",
  //       layout: DefaultLayout,
  //       component: VehicleImage
  //     },
  //     {
  //       path: "/create-product",
  //       layout: DefaultLayout,
  //       component: Product
  //     }
  //   ];
  // }

  return { routes };
};
