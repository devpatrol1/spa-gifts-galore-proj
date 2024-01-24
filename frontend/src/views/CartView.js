import React, {useEffect} from 'react'
import {Link, useParams, useSearchParams, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import Message from '../components/Message'
import {addToCart, removeFromCart} from '../actions/cartActions'


function CartView() {
    const {id} = useParams()
    const productId = id
    const navigate = useNavigate()

    const [searchParams] = useSearchParams()
    const qty = searchParams.get("qty")

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() =>{
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkOutHandler = () => {
        if (userInfo) {
            navigate('/shipping')
          } else {
            navigate('/login')
          }
    }
    
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant='info'>
                        Your cart is empty (<Link to= '/shop' className='link-btn'>Continue Shopping</Link>)
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={3}>
                                        <Form.Select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))} >
                                            {
                                                [...Array(item.count_in_stock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                    </option>
                                                ))
                                            }
                                        </Form.Select>
                                    </Col>
                                    <Col md={1}>
                                        <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )
            }
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Subtotal: ${cartItems.reduce((acc, item) => acc + item.qty * item.price,  0).toFixed(2)}</h3>
                            {cartItems.reduce((acc, item) => acc + item.qty * 1,  0)} items
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className='text-center'>
                                <Button type='button' variant='custom' disabled={cartItems.length===0} onClick={checkOutHandler}>
                                    Checkout
                                </Button>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
                <Link to='/shop' className='btn btn-dark my-4' style={{borderRadius:'10px'}}>Continue Shopping</Link>
 
            </Col>
        </Row>
    )
}

export default CartView
