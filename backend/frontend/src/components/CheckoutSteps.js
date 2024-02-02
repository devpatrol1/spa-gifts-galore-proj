import React from 'react'
import {Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'



function CheckoutSteps({step1, step2, step3}) {
  return (
    <Nav className='justify-content-center mb-4'>
        <Nav.Item>
            {step1 ? (
                <LinkContainer to='/shipping' className='checkout-navlink nav-enabled'>
                    <Nav.Link>Shipping</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled className='checkout-navlink nav-disabled'>Shipping</Nav.Link>
            )}
        </Nav.Item>
        <Nav.Item>
            {step2 ? (
                <LinkContainer to='/payment' className='checkout-navlink nav-enabled'>
                    <Nav.Link>Payment</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled className='checkout-navlink nav-disabled'>Payment</Nav.Link>
            )}
        </Nav.Item>
        <Nav.Item>
            {step3 ? (
                <LinkContainer to='/placeorder' className='checkout-navlink nav-enabled'>
                    <Nav.Link>Review & Order</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled className='checkout-navlink nav-disabled'>Review & Order</Nav.Link>
            )}
        </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps