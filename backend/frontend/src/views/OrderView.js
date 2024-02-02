import React, {useState, useEffect} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {PayPalButton} from 'react-paypal-button-v2'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getOrderDetails, payOrder, deliverOrder} from '../actions/orderActions'
import {ORDER_PAY_RESET, ORDER_DELIVER_RESET} from '../constants/orderConstants'



function OrderView() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const {order, error, loading} = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const {loading: loadingPay, success: successPay} = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    if(!loading && !error){
        order.items_price = order.order_items.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }

    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = process.env.REACT_APP_PAYPAL_URL
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
        if (!order || successPay || order._id !== Number(id) || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(id))
        } else if (!order.is_paid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, order, id, successPay, successDeliver])
 
    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(id, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }


    return loading ? ( <Loader/> ) : error ? ( <Message variant='danger'>{error}</Message> ) : (
        <div>
            <Row>
                <Col>
                    <h1>Order#: {order._id}</h1>
                </Col>
                <Col>
                    <div className='text-end'>
                        {userInfo && userInfo.isAdmin ? (
                        <Link to='/admin/orderlist' className='btn-page-nav my-3'> Back To Order List</Link>
                        ) : (
                        <div>
                            <Link to='/profile' className='btn-page-nav my-3 mx-3'> Go To My Account</Link>
                            <Link to='/shop' className='btn-page-nav my-3 mx-3'> Continue Shopping</Link>
                        </div>
                        )}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>

                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong> {order.user.name}</p>
                            <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>Shipping: </strong>
                                {order.shipping_address.address},  {order.shipping_address.city}
                                {'  '}
                                {order.shipping_address.state},
                                {'  '}
                                {order.shipping_address.postal_code}
                            </p>
                            {order.is_delivered ? (
                            <Message variant='success'>Delivered on {order.delivered_at}</Message>
                            ) : (
                            <Message variant='warning'>Not Delivered</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.payment_method}
                            </p>
                            {order.is_paid ? (
                                <Message variant='success'>Paid on {order.paid_at}</Message>
                                ) : (
                                <Message variant='warning'>Not Paid</Message>
                                )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Ordered Items</h2>
                            {order.order_items.length === 0 ? <Message variant='info'>
                                Order is empty
                                </Message> : (
                                    <ListGroup variant='flush'>
                                        {order.order_items.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Subtotal:</Col>
                                    <Col>${order.items_price}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${order.shipping_price}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${order.tax_price}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${order.total_price}</Col>
                                </Row>
                            </ListGroup.Item>

                            {!order.is_paid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? (<Loader />) : (
                                        <PayPalButton amount={order.total_price} onSuccess={successPaymentHandler} />
                                    )}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                        {loadingDeliver && <Loader />}
                        {userInfo && userInfo.isAdmin && order.is_paid && !order.is_delivered && (
                            <ListGroup.Item>
                                <div className='text-center'>
                                    <Button type='button' className='btn btn-custom my-3' onClick={deliverHandler}>
                                        Mark As Delivered
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default OrderView