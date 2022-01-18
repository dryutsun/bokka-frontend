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
  } from "@chakra-ui/react";
  
  import UserMap from '../../Maps/UserMap'
  import { MdListAlt } from "react-icons/md/";
  import { GrAdd } from "react-icons/gr";
  import { useState, useEffect } from "react";
  import { useParams, Link } from "react-router-dom";
  
  const EditOrder = (props) => {
    console.log("props in edit", props);
  
    const [displayData, setDisplayData] = useState({});
    const [loading, setLoading] = useState(false);
  
    const [form, setForm] = useState({});
    const [subDocs, setSubdocs] = useState([]);

    useEffect(() => {
      console.log("this is props", props);
    }, [props]);
  
    // const getCurrentOrder = () => {
    //   setLoading(true);
    //   console.log(loading);
    //   fetch(`http://localhost:8000/orders/${orderid}`, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${props.user.token}`,
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((foundOrderResponse) => {
    //       setForm(foundOrderResponse.order);
    //       setSubdocs(foundOrderResponse.order.orderItems);
    //       setLoading(false);
    //       console.log(loading);
    //     })
    //     .catch((err) => console.log(err));
    // };
  
    console.log("this is subdocs", subDocs);
    const handleInputChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
      // this is to see change and update current input value and assign it to NewVideo
    };
  
    const AddOrderForm = (e) => {
      e.preventDefault()
      let preJSONBody = {
          order: {
            title: form.title,
            orderOriginLong: form.orderOriginLong,
            orderOriginLat: form.orderOriginLat,
            orderDestLong: form.orderDestLong,
            orderDestLat: form.orderDestLat,
          }
      }
      console.log("this PJB", preJSONBody)
      fetch(`${apiUrl}/orders`, {
          method: 'POST',
          body: JSON.stringify(preJSONBody),
          headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${props.user.token}`
      }
      })
          .then(response=>response.json())
          .then(createdOrder=>{
              props.getAllUserOrders()
              setForm({
              title: '',
              orderOriginLong: "",
              orderOriginLat: "",
              orderDestLong: "",
              orderDestLat: ""
              })
          })
          .catch(err=>console.error)
      }
  
    return (
      <Flex width="full" align="center" justifyContent="center">
        <Box p={2}>
          <Box textAlign="center">
            <Heading>Add New Order</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={AddOrderForm}>
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
                  value={form.orderOriginLat}
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
                  value={form.orderDestLong}
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
                  value={form.orderDestLat}
                  type="orderDestLat"
                  placeholder="orderDestLat"
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mt={6}>
                <FormLabel>Order Items: (this has to be added after form is saved because you can't add something to something that doesn't exist</FormLabel>
              </FormControl>
  
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
  