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
  Text
} from '@chakra-ui/react'
import apiUrl from "../../../apiConfig"
import { useState, useEffect } from 'react'
import {useParams, Link} from 'react-router-dom'

const DisplayOrder = (props) => {

  console.log(props)
  const [displayData, setDisplayData] = useState({})
  const [loading, setLoading] = useState(false)


  const { orderid } = useParams()


  useEffect(()=> {
    getCurrentOrder()
  }, [props])




  const getCurrentOrder = () => {
      setLoading(true)
      console.log(loading)
      fetch(`${apiUrl}/orders/${orderid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.user.token}`,
        },
      })
      .then(response => response.json())
      .then((foundOrderResponse) => {
          setDisplayData(foundOrderResponse.order)
          setLoading(false)
          console.log(loading)
        })
      .catch(err => console.log(err))
  }
  








  console.log(props)
  console.log(displayData)
  return (
    <Flex width="full" align="center" justifyContent="center">
      {!displayData ? "Loading" :
      <Flex width="full" align="center" justifyContent="center">
      <Box p={2}>
          <Box textAlign="center">
              <Heading>Order Detail</Heading>
          </Box>
      <Box my={4} textAlign="left">  
        <Heading fontSize="xl">ORDER : {displayData.title}</Heading>
        <Text fontSize="lg">CURRENT STATUS: {displayData.status}</Text>
        </Box>
        </Box>
        <Link to={`/edit/${orderid}`}>
              <Button colorScheme="blue">Edit Order</Button>
            </Link>
      </Flex>
      }
    </Flex>
      
  );
};

export default DisplayOrder;
