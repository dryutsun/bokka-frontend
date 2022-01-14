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
  Divider,
} from "@chakra-ui/react";
import UserMap from "../../Maps/UserMap";
import { MdListAlt } from "react-icons/md/";
import { GrAdd, GrFormSubtract } from "react-icons/gr";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditOrder = (props) => {
  console.log("props in edit", props);

  const [displayData, setDisplayData] = useState({});
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({}); // Need to Retrieve Value From DB
  const [subDocs, setSubdocs] = useState([]);
  const [newSubDocs, setNewSubDocs] = useState([]);
  const { orderid } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [inputList, setInputList] = useState([
    {
      itemDescription: "",
      weight: "",
      itemType: "",
      customerComment: "",
      imageuri: "",
    },
  ]);

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

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const postSubDocument = (e) => {
    e.preventDefault();
    console.log("this is list", inputList);
    let preJSONBODY2 = {
      inputList,
    };

    console.log("jsonbody", preJSONBODY2);

    fetch(`http://localhost:8000/orderitems/${orderid}`, {
      method: "POST",
      body: JSON.stringify(preJSONBODY2),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.user.token}`,
      },
    })
      .then((response) => {
        response.json();
      })
      .then((postedOrderItems) => {
        props.getAllUserOrders();
        setInputList([]);
      });
  };

  const handleOrderInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        itemDescription: "",
        weight: "",
        itemType: "",
        customerComment: "",
        imageuri: "",
      },
    ]);
  };

  // Embedded in Promise
  function editOrderForm(e) {
    e.preventDefault();
    let preJSONBody = {
      order: {
        title: form.title,
        orderOriginLong: form.orderOriginLong,
        orderOriginLat: form.orderOriginLat,
        orderDestLong: form.orderDestLong,
        orderDestLat: form.orderDestLat,
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
          orderAddrOrigin: "",
          orderAddrDest: "",
        });
        setRedirect(true);
        navigate(`/display/${orderid}`);
      })
      .catch((error) => console.error);
  }

  console.log("this is form", form);

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
        {/* <UserMap /> */}
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
            <FormControl mt={6}>
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
            </FormControl>

            <FormControl mt={6}>
              <FormLabel>Destination Latitiude</FormLabel>
              <Input
                required
                name="orderDestLat"
                value={form.orderOriginLong}
                type="orderDestLat"
                placeholder="orderDestLat"
                onChange={handleInputChange}
              />
            </FormControl>
            <Button width="full" mt={4} type="submit">
              submit
            </Button>
          </form>
          <form onSubmit={postSubDocument}>
            <FormControl mt={6}>
              <FormLabel>Order Items:</FormLabel>

              <List spacing={3} m={1}>
                {orderItemsMap}
              </List>
            </FormControl>
            {inputList.map((x, i) => {
              console.log(inputList);
              return (
                <Box>
                  <Divider />
                  <FormControl mt={1}>
                    <FormLabel>Item Description</FormLabel>
                    <Input
                      required
                      name="itemDescription"
                      value={x.itemDescription}
                      type="text"
                      placeholder="What is it?"
                      onChange={(e) => handleOrderInputChange(e, i)}
                    />
                  </FormControl>
                  <FormControl mt={1}>
                    <FormLabel>Weight</FormLabel>
                    <Input
                      required
                      name="weight"
                      value={x.weight}
                      type="text"
                      placeholder="Weight"
                      onChange={(e) => handleOrderInputChange(e, i)}
                    />
                  </FormControl>
                  <FormControl mt={1}>
                    <FormLabel>Item Type</FormLabel>
                    <Input
                      name="itemType"
                      value={x.itemType}
                      type="text"
                      placeholder="Please indicate 'regular', 'fragile', 'hazardous'"
                      onChange={(e) => handleOrderInputChange(e, i)}
                    />
                  </FormControl>
                  <FormControl mt={1}>
                    <FormLabel>Customer Comment</FormLabel>
                    <Input
                      name="customerComment"
                      value={x.customerComment}
                      type="text"
                      placeholder="Let us know about how you want it to be delivered"
                      onChange={(e) => handleOrderInputChange(e, i)}
                    />
                  </FormControl>
                  <FormControl mt={1}>
                    <FormLabel>Image URL</FormLabel>
                    <Input
                      name="imageuri"
                      value={x.imageuri}
                      type="text"
                      placeholder="If You have an Image URL Post it here..."
                      onChange={(e) => handleOrderInputChange(e, i)}
                    />
                  </FormControl>

                  <div className="btn-box">
                    {inputList.length !== 1 && (
                      <ButtonGroup size="sm" isAttached variant="outline" m={1}>
                        <Button
                          mr="-px"
                          color={"red"}
                          onClick={() => handleRemoveClick(i)}
                        >
                          Remove
                        </Button>
                        <IconButton
                          aria-label="Remove From Order"
                          icon={<GrFormSubtract />}
                          onClick={() => handleRemoveClick(i)}
                        />
                      </ButtonGroup>
                    )}
                    {inputList.length - 1 === i && (
                      <ButtonGroup size="sm" isAttached variant="outline" m={1}>
                        <Button
                          mr="-px"
                          color={"green"}
                          onClick={handleAddClick}
                        >
                          Add New Order Item:
                        </Button>
                        <IconButton
                          aria-label="Add to Order"
                          icon={<GrAdd />}
                          onClick={handleAddClick}
                        />
                      </ButtonGroup>
                    )}
                  </div>
                </Box>
              );
            })}
            <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>

            <Button width="full" mt={4} type="submit">
              submit
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default EditOrder;
