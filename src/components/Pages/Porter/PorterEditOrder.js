import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Heading,
  Switch,
  List,
  ListItem,
  ListIcon,
  Text,
  ButtonGroup,
  IconButton,
  Select,
} from "@chakra-ui/react";
import styled from "styled-components"

import { MdListAlt } from "react-icons/md/";
import { GrAdd } from "react-icons/gr";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Route, Routes } from "react-router-dom";

const PorterEditOrder = (props) => {
  console.log("props in edit", props);

  const [displayData, setDisplayData] = useState({});
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({}); // Need to Retrieve Value From DB
  const [subDocs, setSubdocs] = useState([]);
  const { orderid } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [orderAccept, setorderAccept] = useState("");
  const [select, setSelect] = useState("");

  let navigate = useNavigate();
  

  useEffect(() => {
    getCurrentOrder();
    console.log("this is state", displayData);
  }, [props]);

  const getCurrentOrder = () => {
    setLoading(true);
    console.log(loading);
    fetch(`${apiUrl}/orders/${orderid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.user.token}`,
      },
    })
      .then((response) => response.json())
      .then((foundOrderResponse) => {
        setForm(foundOrderResponse.order);
        setSubdocs(foundOrderResponse.order.orderItems);
        setLoading(false);
        console.log(loading);
      })
      .catch((err) => console.log(err));
  };

  //   handeSelectChange = (e) => {

  //   }

  console.log("this is subdocs", subDocs);
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // this is to see change and update current input value and assign it to NewVideo
  };

  console.log(props.user._id)
  const editOrderForm = (e) => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const todayToDate = today.toDateString();

    e.preventDefault();
    let preJSONBody = {
      order: {
        porter: props.user._id,
        status: form.status,
        order_accepted: todayToDate,
        order_delivered: form.order_delivered,
      },
    };
    console.log("this PJB", preJSONBody);
    fetch(`${apiUrl}/orders/${orderid}`, {
      method: "PATCH",
      body: JSON.stringify(preJSONBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.user.token}`,
      },
    })
      .then((response) => response.json())
      .then((editedVideo) => { 
        console.log("this get hit?")
        props.getAllUserOrders();;
      })
      .catch((err) => console.error);
    
      navigate(`/porter_index`, { replace: true })
  };

  console.log("this is form", form);

  // if (redirect === true) {
  //   return navigate(`/display/${orderid}`)
  // }

  const orderItemsMap = subDocs.map((order) => {
    return (
      <List>
        <Flex direction="row" alignItems="center">
          <ListIcon as={MdListAlt} />
          <Text>{order.itemDescription}</Text>
        </Flex>
        <Flex direction="column">
          <Text fontSize="xs">Weight: {order.weight}</Text>
          <Text fontSize="xs">Instructions: {order.customerComment}</Text>
        </Flex>
      </List>
    );
  });



  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={2}>
        <Box textAlign="center">
          <Heading>Order Detail</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={editOrderForm}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                required
                type="title"
                name="title"
                value={form.title}
                placeholder="Enter title"
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={3} mb={3}>
              <FormLabel>Order Stage</FormLabel>
              <Select
                name="status"
                id="status"
                name="status"
                placeholder="Select option"
                onChange={handleInputChange}
              >
                <option value="order-accepted">Order Accepted </option>
                <option value="delivery in progress">
                  Delivery in Progress{" "}
                </option>
                <option value="order complete">Order Complete </option>
              </Select>
            </FormControl>

            <FormControl mt={6}>
              <FormLabel>Order Items:</FormLabel>

              <List spacing={3} m={1}>
                {orderItemsMap}
              </List>
            </FormControl>
            <Button width="full" mt={4} type="submit">
              Accept Order for Delivery
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default PorterEditOrder;
