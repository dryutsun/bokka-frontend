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

import { MdListAlt } from "react-icons/md/";
import { GrAdd } from "react-icons/gr";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  useEffect(() => {
    getCurrentOrder();
    console.log("this is state", displayData);
  }, [props]);

  const getCurrentOrder = () => {
    setLoading(true);
    console.log(loading);
    fetch(`http://localhost:8000/orders/${orderid}`, {
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
    fetch(`http://localhost:8000/orders/${orderid}`, {
      method: "PATCH",
      body: JSON.stringify(preJSONBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.user.token}`,
      },
    })
      .then((response) => response.json())
      .then((editedVideo) => {
        props.getAllUserOrders();
        setForm({
          title: "",
          orderOriginLong: "",
          orderOriginLat: "",
          orderDestLong: "",
          orderDestLat: "",
        });
        setRedirect(true);
        navigate(`/display/${orderid}`);
      })
      .catch((err) => console.error);
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

  // const orderItemsMap = newform.orderItems.map(order=>console.log(order))
  // const orderItemsMap = form.orderItems.map((order) => {console.log(order)})
  // console.log(orderItemsMap)

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

            {/* <FormControl mt={6}>
              <FormLabel>Origin Longitude</FormLabel>
              <Input
                required
                name="orderOriginLong"
                value={form.orderOriginLong}
                type="orderOriginLong"
                placeholder="Enter Original Longitude"
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl mt={6}>
              <FormLabel>Origin Latitiude</FormLabel>
              <Input
                required
                name="orderOriginLat"
                value={form.orderOriginLong}
                type="orderOriginLat"
                placeholder="orderOriginLat"
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl mt={6}>
              <FormLabel>Destination Longitude</FormLabel>
              <Input
                required
                name="orderDestLong"
                value={form.orderOriginLong}
                type="orderDestLong"
                placeholder="orderDestLong"
                onChange={handleInputChange}
              />
            </FormControl> */}

            {/* <FormControl mt={6}>
              <FormLabel>Destination Latitiude</FormLabel>
              <Input
                required
                name="orderDestLat"
                value={form.orderOriginLong}
                type="orderDestLat"
                placeholder="orderDestLat"
                onChange={handleInputChange}
              />
            </FormControl> */}
            <FormControl mt={6}>
              <FormLabel>Order Items:</FormLabel>
              <ButtonGroup size="sm" isAttached variant="outline" m={1}>
                <Button mr="-px">Add New Order Item:</Button>
                <IconButton aria-label="Add to Order" icon={<GrAdd />} />
              </ButtonGroup>

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
