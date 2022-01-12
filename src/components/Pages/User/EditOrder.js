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
} from '@chakra-ui/react'

import { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'

const EditOrder = (props) => {
  console.log("props in edit", props)

  const [displayData, setDisplayData] = useState({})
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({})
  const [subDocs, setSubdocs] = useState([])
  const { orderid } = useParams()

  useEffect(()=>{
    getCurrentOrder()
    console.log("this is state", displayData)
  }, [])

  const getCurrentOrder = () => {
    setLoading(true)
    console.log(loading)
    fetch(`http://localhost:8000/orders/${orderid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.user.token}`,
      },
    })
    .then(response => response.json())
    .then((foundOrderResponse) => {
        setForm(foundOrderResponse.order)
        setSubdocs(foundOrderResponse.order.orderItems)
        setLoading(false)
        console.log(loading)
      })
    .catch(err => console.log(err))
}

console.log("this is subdocs", subDocs)
const handleInputChange = (e) =>{
  setForm({ ...form, [e.target.name]: e.target.value })
  // this is to see change and update current input value and assign it to NewVideo
}



// const editOrderForm = (e) => {
//   e.preventDefault()
//   let preJSONBody = {
//       title: form.title,
//       categoryName: form.categoryName
//   }
//   console.log("this PJB", preJSONBody)
//   fetch(`${apiUrl}/videos/${id}`, {
//       method: 'PATCH',
//       body: JSON.stringify(preJSONBody),
//       headers: {
//               "Content-Type": "application/json",
//               "Authorization": `Bearer ${props.user.token}`
//   }
//   })
//       .then(response=>response.json())
//       .then(editedVideo=>{
//           // get all videos again 
//           props.getAllVideos()
//           setForm({
//           title: '',
//           categoryName: ''
//           }) 
//       })
//       .catch(err=>console.error)
//   }


// console.log("this is form", form)
// console.log(form.orderItems.length)

const orderItemsMap = subDocs.map((order)=> <li>{order.itemDescription}</li>)

// const orderItemsMap = newform.orderItems.map(order=>console.log(order))
// const orderItemsMap = form.orderItems.map((order) => {console.log(order)})
// console.log(orderItemsMap)

  return (<Flex width="full" align="center" justifyContent="center">
  <Box p={2}>
      <Box textAlign="center">
          <Heading>Order Detail</Heading>
      </Box>
  <Box my={4} textAlign="left">
      <form>
          
          <FormControl>
              <FormLabel>Title</FormLabel>
              <Input required
                  type='title'
                  name='title'
                  value={form.title}
                  placeholder='Enter title'
                  onChange={handleInputChange}
                  />
          </FormControl>

          <FormControl mt={6}>
              <FormLabel>Origin Longitude</FormLabel>
              <Input required
                  name='orderOriginLong'
                  value={form.orderOriginLong}
                  type='orderOriginLong'
                  placeholder='Enter Original Longitude'
                  onChange={handleInputChange}
                  />
          </FormControl>

          <FormControl mt={6}>
              <FormLabel>Origin Latitiude</FormLabel>
              <Input required
                  name='orderOriginLat'
                  value={form.orderOriginLong}
                  type='orderOriginLat'
                  placeholder='orderOriginLat'
                  onChange={handleInputChange}
                  />
          </FormControl>

          <FormControl mt={6}>
              <FormLabel>Destination Longitude</FormLabel>
              <Input required
                  name='orderDestLong'
                  value={form.orderOriginLong}
                  type='orderDestLong'
                  placeholder='orderDestLong'
                  onChange={handleInputChange}
                  />
          </FormControl>

          <FormControl mt={6}>
              <FormLabel>Destination Latitiude</FormLabel>
              <Input required
                  name='orderDestLat'
                  value={form.orderOriginLong}
                  type='orderDestLat'
                  placeholder='orderDestLat'
                  onChange={handleInputChange}
                  />
          </FormControl>
          <Box>
            {orderItemsMap}
          </Box>



          
          <Button width="full" mt={4} type="submit">
          submit
          </Button>
      </form>
  </Box>
  </Box>
</Flex>)
};

export default EditOrder;
