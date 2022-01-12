// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { v4 as uuid } from "uuid";

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from "./components/shared/AutoDismissAlert/AutoDismissAlert";
import Header from "./components/shared/Header";
import RequireAuth from "./components/shared/RequireAuth";
import Home from "./components/Home";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import SignOut from "./components/auth/SignOut";
import PorterOrderIndex from "./components/Pages/Porter/PorterOrderIndex";
import UserOrderIndex from "./components/Pages/User/UserOrderIndex";
import ChangePassword from "./components/auth/ChangePassword";
import PorterDisplay from "./components/Pages/Porter/PorterDisplay";
import EditOrder from "./components/Pages/User/EditOrder";
import DisplayOrder from "./components/Pages/User/DisplayOrder";
// import Header from './components/Header/Header'

const App = () => {
  const [user, setUser] = useState(null);
  const [msgAlerts, setMsgAlerts] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [porterOrders, setPorterOrders] = useState([]);

  useEffect(() => {
    getAllUserOrders();
    getAllPorterOrders();
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

  // To Refactor into Context and Reducer Later
  // NOTE: THIS WORKS BUT STATE WILL REFLECT ONLY IN COMPONENT INSPECTOR
  const getAllUserOrders = () => {
    if (user !== null && user.porter === false) {
      console.log(user);
      fetch(`http://localhost:8000/orders/owner/${user._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => response.json())
        .then((allUserOrders) => {
          console.log(allUserOrders.orders);
          setUserOrders(allUserOrders.orders);
        });
    }
  };

  const getAllPorterOrders = () => {
    if (user !== null && user.porter === true) {
      console.log(user);
      fetch(`http://localhost:8000/orders/porter/${user._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => response.json())
        .then((allPorterOrders) => {
          console.log(allPorterOrders.orders);
          setPorterOrders(allPorterOrders.orders);
        });
    }
  };

  return (
    <Fragment>
      <Header user={user} />
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
        <Route path="/porter-profile" element={<PorterDisplay />} />
        <Route path="/porter_index" element={<PorterOrderIndex />} />
        <Route
          path="/userorder_index"
          element={
            <RequireAuth user={user}>
              <UserOrderIndex userOrders={userOrders} user={user} />
            </RequireAuth>
          }
        />
        <Route path="/edit/:orderid" element={
          <RequireAuth user={user}>
          <EditOrder user={user} />
        </RequireAuth>
        } />
        
        
        <Route path="/display/:orderid" element={
          <RequireAuth user={user}>
            <DisplayOrder user={user} />
          </RequireAuth>
        }/>

        <Route
          path="/change-password"
          element={
            <RequireAuth user={user}>
              <ChangePassword msgAlert={msgAlert} user={user} />
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
