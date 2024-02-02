import React, { useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listOrders } from '../actions/orderActions'



function OrderListView() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders, pages, page } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const keypage = location.search
    const itemsType = 'order'

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders(keypage))
        } else {
            navigate('/login')
        }

    }, [dispatch, navigate, userInfo, keypage])


    return (
        <div>
            <h1>Orders</h1>
            {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : (
            <div>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>Total</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.created_at.substring(0, 10)}</td>
                                <td>${order.total_price}</td>

                                <td>{order.is_paid ? (
                                    order.paid_at.substring(0, 10)
                                    ) : (
                                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                                    )}
                                </td>

                                <td>{order.is_delivered ? (
                                    order.delivered_at.substring(0, 10)
                                    ) : (
                                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                                    )}
                                </td>

                                <td>
                                    <Link to={`/order/${order._id}`}>
                                        <Button variant='warning' className='btn-sm'>
                                            Details
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Paginate pages={pages} page={page} isAdmin={true} itemsType={itemsType}/>
            </div>
            )}
        </div>
    )
}

export default OrderListView