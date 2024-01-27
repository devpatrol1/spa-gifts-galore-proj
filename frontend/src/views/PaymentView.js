import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Form, Button, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {savePaymentMethod} from '../actions/cartActions'



function PaymentView() {
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    const dispatch = useDispatch()
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    
    if(!shippingAddress.addresss) {
        navigate('/shipping')
    }

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>Step 2: Set Payment Method</h1>
            <Form onSubmit={submitHandler}>

                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check type='radio' label='PayPal or Credit Card' id='paypal' name='paymentmethod' checked onChange={(e) => setPaymentMethod(e.target.value)} />
                    </Col>
                </Form.Group>

                <Button type='submit' variant='custom' className='mt-2'>Continue</Button>

            </Form>
        </FormContainer>
    )
}

export default PaymentView