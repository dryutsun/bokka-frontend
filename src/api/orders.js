import apiUrl from "../apiConfig";
import axios from "axios";

//---------------GET/READ REQUESTS------------------//

// Name: getAllOrdersWithoutPorters
// Signature: user -> request {}
// Example: getAllOrdersWithoutPorters should return an order request object of a porter

export const getOrdersWithoutPorters = (user) => {
  if (user !== null && user.porter == true) {
    return axios({
      method: "GET",
      url: `${apiUrl}/orders`,
      headers: {
        Authorization: `Token token=${user.token}`,
      },
    });
  }
};

// Name: getAllUserOrders
// Signature: user -> request {}
// Example: getAlluserOrders should return a order request object of a customer

export const getAllUserOrders = (user) => {
  if (user !== null && user.porter === false) {
    return axios({
      method: "GET",
      url: `${apiUrl}/orders`,
      headers: {
        Authorization: `Token token=${user.token}`,
      },
    });
  }
};

// Name: getAllOrdersWithoutPorters
// Signature: user -> request {}
// Example: getAllOrdersWithoutPorters should return an order request object that has not been assigned to a porter.

export const getAllPorterOrders = (user) => {
  if (user !== null && user.porter === true) {
    return axios({
      method: "GET",
      url: `${apiUrl}/orders/porter/${user._id}`,
      headers: {
        Authorization: `Token token=${user.token}`,
      },
    });
  }
};

// Name: getCurrentOrder
// Signature: user, orderid -> request {}
// Example: getCurrentOrder should take in the current user and orderid and return an order request object corresponding to the specific value of orderid

export const getCurrentOrder = (user, orderid) => {
  return axios({
    method: "GET",
    url: `${apiUrl}/orders/${orderid}`,
    headers: {
      Authorization: `Token token=${user.token}`,
    },
  });
};

//---------------EDIT/PATCH || PUT REQUESTS------------------//

// Name: editOrderForm
// Signature: event, orderid, props.user, form -> PATCH request {}
// Example: editOrderForm should take in the submission event, prevent reload and return a PATCH request body where user the orderid to make the request, use props.user for token authorization, and pass in form data in the PUT/PATCH request body.



export const patchOrderForm = (e, orderid, props, form) => {
  e.preventDefault();
  return axios({
    method: "PATCH",
    url: `${apiUrl}/orders/${orderid}`,
    headers: {
      Authorization: `Token token=${props.user.token}`,
    },
    data:
    {
      order: {
        title: form.title,
        orderOriginLong: form.orderOriginLong,
        orderOriginLat: form.orderOriginLat,
        orderDestLong: form.orderDestLong,
        orderDestLat: form.orderDestLat,
      }
    }
  })
};
