// import React, { Component } from 'react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
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



const SignUp = (props) => {
	// constructor(props) {
	// 	super(props)

	// 	this.state = {
	// 		email: '',
	// 		password: '',
	// 		passwordConfirmation: '',
	// 	}
	// }    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [porter, setPorter] = useState(true)


    // Write a function to convert the boolean value into a truthy or falsy value
    // let portervalue = 0
    // if (porter === true) { 
    //     portervalue = 1 } 
    //     else {
    //     portervalue = 0 }

    //     console.log(portervalue)
            

    const navigate = useNavigate()

	const onSignUp = (event) => {
		event.preventDefault()

		const { msgAlert, setUser } = props

        const credentials = {email, password, passwordConfirmation, porter}
        console.log(credentials)
		signUp(credentials)
			.then(() => signIn(credentials))
			.then((res) => setUser(res.data.user))
			.then(() =>
				msgAlert({
					heading: 'Sign Up Success',
					message: messages.signUpSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
			.catch((error) => {
                setEmail('')
                setPassword('')
                setPasswordConfirmation('')
                setPorter(true)
				msgAlert({
					heading: 'Sign Up Failed with error: ' + error.message,
					message: messages.signUpFailure,
					variant: 'danger',
				})
			})
	}


    return (
        <Flex width="full" align="center" justifyContent="center">
            <Box p={2}>
                <Box textAlign="center">
                    <Heading>Sign Up</Heading>
                </Box>
            <Box my={4} textAlign="left">
                <form onSubmit={onSignUp}>
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
                    <FormControl mt={6}>
                        <FormLabel>Password Confirmation</FormLabel>
                        <Input required
                            name='passwordConfirmation'
                            value={passwordConfirmation}
                            type='password'
                            placeholder='passwordConfirmation'
                            onChange={e => setPasswordConfirmation(e.target.value)} />
                    </FormControl>
                    <FormControl mt={6}>
                        <FormLabel>Sign Up As Porter?</FormLabel>
                        <Switch size='lg' id='porter' value={porter} onChange={e => setPorter(!porter)} defaultChecked/>
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

export default SignUp