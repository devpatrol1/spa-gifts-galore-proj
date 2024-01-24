import React, { useEffect } from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {Table, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import {listUsers, deleteUser} from '../actions/userActions'



function UserListView() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const userList = useSelector(state => state.userList)
    const { loading, error, users, pages, page } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    const keypage = location.search
    const itemsType = 'user'

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers(keypage))
        } else {
            navigate('/login')
        }

    }, [dispatch, navigate, successDelete, userInfo, keypage])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <div>
            <h1>Users</h1>
            {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : (
            <div>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? (
                                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                                ) : (
                                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                                    )}</td>

                                <td>
                                    <Link to={`/admin/user/${user._id}/edit`}>
                                        <Button variant='warning' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </Link>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
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

export default UserListView