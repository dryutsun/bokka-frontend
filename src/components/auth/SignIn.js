import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'


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



const SignIn = (props) => {
	// constructor(props) {
	// 	super(props)

	// 	this.state = {
	// 		email: '',
	// 		password: '',
	// 	}
	// }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

	// handleChange = (event) =>
	// 	this.setState({
	// 		[event.target.name]: event.target.value,
	// 	})

	const onSignIn = (event) => {
		event.preventDefault()
        console.log('the props', props)
		const { msgAlert, setUser } = props

        const credentials = {email, password}

		signIn(credentials)
			.then((res) => setUser(res.data.user))
			.then(() =>
				msgAlert({
					heading: 'Sign In Success',
					message: messages.signInSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
			.catch((error) => {
                setEmail('')
                setPassword('')
				msgAlert({
					heading: 'Sign In Failed with error: ' + error.message,
					message: messages.signInFailure,
					variant: 'danger',
				})
			})
	}

    return (
        <Flex width="full" align="center" justifyContent="center">
            <Box p={2}>
                <Box textAlign="center">
                    <Heading>Sign In</Heading>
                </Box>
            <Box my={4} textAlign="left">
                <form onSubmit={onSignIn}>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input required
                            type='email'
                            name='email'
                            value={email}
                            placeholder='Enter email'
                            onChange={e => setEmail(e.target.value)}/>
                    </FormControl>
                    <FormControl mt={6}>
                        <FormLabel>Password</FormLabel>
                        <Input required
                            name='password'
                            value={password}
                            type='password'
                            placeholder='Password'
                            onChange={e => setPassword(e.target.value)} />
                    </FormControl>
                    <Button width="full" mt={4} type="submit">
                    Sign Up!
                    </Button>
                </form>
            </Box>
            </Box>
        </Flex>
    )
}

export default SignIn
