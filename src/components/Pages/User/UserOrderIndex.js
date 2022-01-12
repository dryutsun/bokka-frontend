import {
  Box,
  Heading,
  Center,
  Text,
  Divider,
  VStack,
  StackDivider,
  Flex,
  Spacer,
  Grid,
  GridItem,
  Button,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import {useEffect, useState } from 'react'


const UserOrderIndex = (props) => {

  useEffect(()=>{
    props.getAllUserOrders()
  },[])

  console.log("props in UOI", props);
  // Requires handling to determine if an order has a porter --> This is bad logic, not all orders will have been accepted by porters.
  const userOrderIndex = props.userOrders.map((orders) => {
    console.log(orders.porter);
    console.log();
    const orderid = "" + orders._id;
    if (!orders.porter) {
      return (
        <Center>
          <Box p={5} shadow="md" borderWidth="1px" w="full">
            <Flex direction="column">
              <Heading fontSize="xl">ORDER : {orders.title}</Heading>
              <Text fontSize="lg">CURRENT STATUS: {orders.status}</Text>
              <Link to={`/display/${orderid}`} orders={orders}>
                <Button colorScheme="blue">See Details</Button>
              </Link>
            </Flex>
          </Box>
        </Center>
      );
    } else {
      return (
        <Center>
          <Box p={5} shadow="md" borderWidth="1px" w="full">
            <Flex direction="column">
              <Heading fontSize="xl">ORDER : {orders.title}</Heading>
              <Text fontSize="lg">CURRENT STATUS: {orders.status}</Text>
              <Text fontSize="lg">YOUR PORTER: {orders.porter.email}</Text>
              <Link to={`/display/${orderid}`} orders={orders}>
                <Button colorScheme="blue">See Details</Button>
              </Link>
            </Flex>
          </Box>
        </Center>
      );
    }
  });

  // NOTE: ABSTRACT THE HEADER OUT INTO ITS OWN COMPONENT
  // RETURN THE MAP IS A LIST COMPONENT

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={2}>
        <Box
          w="100%"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={6}
        >
          <Center>
            <Heading size="lg">
              <Text fontSize="6xl">User Order</Text>
            </Heading>
          </Center>
          <Link to={`/order/new`}>
            <Button width="full" mt={4} mb={4} type="submit">
              Add New Order
            </Button>
          </Link>
          <VStack
            divider={<StackDivider borderColor="gray.100" m={2} />}
            spacing={4}
            align="stretch"
          >
            {userOrderIndex}
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
};

export default UserOrderIndex;
