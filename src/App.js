// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { v4 as uuid } from "uuid";
import apiUrl from "./apiConfig";
// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from "./components/shared/AutoDismissAlert/AutoDismissAlert";
import Header from "./components/shared/Header";
import RequireAuth from "./components/shared/RequireAuth";
import Home from "./components/Home";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import SignOut from "./components/auth/SignOut";
import ChangePassword from "./components/auth/ChangePassword";
// Porter Components
import PorterOrderIndex from "./components/Pages/Porter/PorterOrderIndex";
import PorterDisplay from "./components/Pages/Porter/PorterDisplay";
import PorterEditOrder from "./components/Pages/Porter/PorterEditOrder"
import OrderWithoutPorter from './components/Pages/Porter/OrderWithoutPorter'
// User Components
import EditOrder from "./components/Pages/User/EditOrder";
import DisplayOrder from "./components/Pages/User/DisplayOrder";
import AddOrder from "./components/Pages/User/AddOrder";
import UserOrderIndex from "./components/Pages/User/UserOrderIndex";
// import Header from './components/Header/Header'

const App = () => {
  const [user, setUser] = useState(null);
  const [msgAlerts, setMsgAlerts] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [porterOrders, setPorterOrders] = useState([]);
  const [deliverable, setDeliverable] = useState([])

  useEffect(() => {
    getAllUserOrders();
    getAllPorterOrders();
    getAllOrdersWithoutPorters();
  }, [user]);

  console.log("user in app", user);
  console.log("message alerts", msgAlerts);
  const clearUser = () => {
    console.log("clear user ran");
    setUser(null);
  };

  const deleteAlert = (id) => {
    setMsgAlerts((prevState) => {
      return prevState.filter((msg) => msg.id !== id);
    });
  };

  const msgAlert = ({ heading, message, variant }) => {
    const id = uuid();
    setMsgAlerts(() => {
      return [{ heading, message, variant, id }];
    });
  };

  const getAllOrdersWithoutPorters = () => {
    if (user !== null && user.porter == true) {
      fetch(`${apiUrl}/orders/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => response.json())
        .then((allUserOrders) => {

        const ordersWithoutPorter = allUserOrders.orders.filter((orders)=>{
          return (!orders.porter)
        })

          console.log("this is all orders" , allUserOrders.orders);
          console.log("all order w/o porter", ordersWithoutPorter)
          setDeliverable(ordersWithoutPorter);
        });
    }
}




  // To Refactor into Context and Reducer Later
  // NOTE: THIS WORKS BUT STATE WILL REFLECT ONLY IN COMPONENT INSPECTOR
  const getAllUserOrders = () => {
    if (user !== null && user.porter === false) {
      console.log(user);
      fetch(`${apiUrl}/orders/owner/${user._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => response.json())
        .then((allUserOrders) => {
          console.log("this is user orders" , allUserOrders.orders);
          setUserOrders(allUserOrders.orders);
        });
    }
  };

  const getAllPorterOrders = () => {
    if (user !== null && user.porter === true) {
      console.log(user);
      fetch(`${apiUrl}/orders/porter/${user._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => response.json())
        .then((allPorterOrders) => {
          console.log("getting porterOrders", allPorterOrders.orders);
          setPorterOrders(allPorterOrders.orders);
        });
    }
  };

  return (
    <Fragment>
      <Header user={user} />
      {/* Auth Pages */}
      <Routes>
        <Route path="/" element={<Home msgAlert={msgAlert} user={user} />} />
        <Route
          path="/sign-up"
          element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
        />
        <Route
          path="/sign-in"
          element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
        />
        <Route
          path="/sign-out"
          element={
            <RequireAuth user={user}>
              <SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
            </RequireAuth>
          }
        />
        <Route
          path="/change-password"
          element={
            <RequireAuth user={user}>
              <ChangePassword msgAlert={msgAlert} user={user} />
            </RequireAuth>
          }
        />
        {/* Porter Pages */}
        <Route path="/porter-profile" element={<PorterDisplay />} />
        <Route
          path="/porter_index"
          element={
            <RequireAuth user={user}>
              <PorterOrderIndex porterOrders={porterOrders} getAllPorterOrders={getAllPorterOrders}/>
            </RequireAuth>
          }
        />
        <Route
          path="/withoutporterorder_index"
          element={
            <RequireAuth user={user}>
              <OrderWithoutPorter getAllOrdersWithoutPorters={getAllOrdersWithoutPorters} deliverable={deliverable} user={user}/>
            </RequireAuth>
          }
        />
        <Route
          path="/porteredit/:orderid"
          element={
            <RequireAuth user={user}>
              <PorterEditOrder getAllOrdersWithoutPorters={getAllOrdersWithoutPorters} deliverable={deliverable} user={user}/>
            </RequireAuth>
          }
        />
        <Route
          path="/porterdisplay/:orderid"
          element={
            <RequireAuth user={user}>
              <PorterDisplay getAllOrdersWithoutPorters={getAllOrdersWithoutPorters} deliverable={deliverable} user={user}/>
            </RequireAuth>
          }
        />

        {/* User Request Pages */}
        <Route
          path="/userorder_index"
          element={
            <RequireAuth user={user}>
              <UserOrderIndex
                userOrders={userOrders}
                user={user}
                getAllUserOrders={getAllUserOrders}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/edit/:orderid"
          element={
            <RequireAuth user={user}>
              <EditOrder user={user} getAllUserOrders={getAllUserOrders}/>
            </RequireAuth>
          }
        />
        <Route
          path="/display/:orderid"
          element={
            <RequireAuth user={user}>
              <DisplayOrder user={user} />
            </RequireAuth>
          }
        />
        <Route
          path="/order/new"
          element={
            <RequireAuth user={user}>
              <AddOrder
                user={user}
                getAllUserOrders={getAllUserOrders}
                userOrders={userOrders}
              />
            </RequireAuth>
          }
        />
      </Routes>
      {msgAlerts.map((msgAlert) => (
        <AutoDismissAlert
          key={msgAlert.id}
          heading={msgAlert.heading}
          variant={msgAlert.variant}
          message={msgAlert.message}
          id={msgAlert.id}
          deleteAlert={deleteAlert}
        />
      ))}
    </Fragment>
  );
};

export default App;
