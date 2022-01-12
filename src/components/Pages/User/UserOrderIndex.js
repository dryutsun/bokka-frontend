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

const UserOrderIndex = (props) => {
  console.log("props in UOI", props);
  // Requires handling to determine if an order has a porter --> This is bad logic, not all orders will have been accepted by porters.
  const userOrderIndex = props.userOrders.map((orders) => {
    console.log(orders.porter);
    console.log()
    const orderid = "" + orders._id
    return (
      <Center>
        <Box p={5} shadow="md" borderWidth="1px">
          <Flex direction="column">
            <Heading fontSize="xl">ORDER : {orders.title}</Heading>

            <Text fontSize="lg">CURRENT STATUS: {orders.status}</Text>
            {}
            <Text fontSize="lg">YOUR PORTER: {orders.porter.email}</Text>
            <Link to={`/display/${orderid}`} orders={orders}>
              <Button colorScheme="blue">See Details</Button>
            </Link>
          </Flex>
        </Box>
      </Center>
    );
  });

  // NOTE: ABSTRACT THE HEADER OUT INTO ITS OWN COMPONENT
  // RETURN THE MAP IS A LIST COMPONENT

  return (
    <>
      <Box w="100%" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Center>
          <Heading size="lg">
            <Text fontSize="6xl">User Order</Text>
          </Heading>
        </Center>
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          {userOrderIndex}
        </VStack>
      </Box>
    </>
  );
};

export default UserOrderIndex;

