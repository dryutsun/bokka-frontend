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
import { useEffect, useState } from "react";

const PorterOrderIndex = (props) => {
  useEffect(() => {
    props.getAllPorterOrders();
  }, []);

  console.log("props in POI", props);

  const porterOrderIndex = props.porterOrders.map((orders) => {
    console.log(orders);
    const orderid = "" + orders._id;
    return (
      <Center>
        <Box p={5} shadow="md" borderWidth="1px" w="full">
          <Flex direction="column">
            <Heading fontSize="xl">ORDER : {orders.title}</Heading>
            <Text fontSize="lg">CURRENT STATUS: {orders.status}</Text>
            <Link to={`/porterdisplay/${orderid}`} orders={orders}>
              <Button colorScheme="blue">See Details</Button>
            </Link>
          </Flex>
        </Box>
      </Center>
    );
  });

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
              <Text fontSize="6xl">Assigned Orders</Text>
            </Heading>
          </Center>
          {/* <Link to={`/order/new`}>
            <Button width="full" mt={4} mb={4} type="submit">
              Add New Order
            </Button>
          </Link> */}
          <VStack
            divider={<StackDivider borderColor="gray.100" m={2} />}
            spacing={4}
            align="stretch"
          >
            {porterOrderIndex}
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
};

export default PorterOrderIndex;
