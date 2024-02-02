import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Form, Button, Row, Col, Table} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {getUserDetails, updateUserProfile} from '../actions/userActions'
import {USER_UPDATE_PROFILE_RESET} from '../constants/userConstants' 
import {listMyOrders} from '../actions/orderActions'


function ProfileView() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
  
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails
  
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    useEffect(() => {
        if (!userInfo) {
            navigate('/login', { replace: true })
        }else{
            if (!user || !user.name || success){
                dispatch({type:USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, userInfo, user, success])
  
    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Passwords do not match')
        }else{
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }))
        }
    }

  return (
    <Row>
        <Col md={3}>
            <h2>My Profile</h2>
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name' className='py-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control required type='name' placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email' className='py-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control required type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password' className='py-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                
                <Form.Group controlId='passwordConfirm' className='py-3'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Re-enter Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='custom'>Update</Button>

            </Form>
        </Col>

        <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ) : (
                    <Table striped responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.created_at.substring(0, 10)}</td>
                                    <td>${order.total_price}</td>
                                    <td>{order.is_paid ? order.paid_at.substring(0, 10) : (
                                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                                    )}</td>
                                    <td>
                                        <Link to={`/order/${order._id}`}>
                                            <Button className='btn-sm'>Details</Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
        </Col>
    </Row>
  )
}

export default ProfileView