import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {saveShippingAddress} from '../actions/cartActions'



function ShippingView() {
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    const dispatch = useDispatch()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [state, setState] = useState(shippingAddress.state)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, state, postalCode }))
        navigate('/payment')
    }


    return (
        <FormContainer>
            <CheckoutSteps step1/>
            <h1>Step1: List Shipping Address</h1>
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='address' className='py-2'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control required type='text' placeholder='Enter your address' value={address ? address:''} onChange={(e) => setAddress(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city' className='py-2'>
                    <Form.Label>City</Form.Label>
                    <Form.Control required type='text' placeholder='Enter your city' value={city ? city:''} onChange={(e) => setCity(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='state' className='py-2'>
                    <Form.Label>State</Form.Label>
                    <Form.Control required type='text' placeholder='Enter your state' value={state ? state:''} onChange={(e) => setState(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode' className='py-2'>
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control required type='text' placeholder='Enter your zip code' value={postalCode ? postalCode:''} onChange={(e) => setPostalCode(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='custom'>Continue</Button>

            </Form>
        </FormContainer>
    )
}

export default ShippingView