import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {register} from '../actions/userActions'



function RegisterView() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userRegister = useSelector(state => state.userRegister)
  const {error, loading, userInfo} = userRegister

  useEffect(() => {
      if (userInfo) {
          navigate('/', { replace: true })
      }
  }, [userInfo, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    if(password !== confirmPassword) {
      setMessage('Passwords Do Not Match')
    }else{
      dispatch(register(name, email, password))
    }
  }

  return (
    <FormContainer>
      <h1>Register</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>

        <Form.Group controlId='name' className='py-3'>
          <Form.Label>Name</Form.Label>
          <Form.Control required type='name' placeholder='Enter Your First Name' value={name} onChange={(e) => setName(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='email' className='py-3'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control required type='email' placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='password' className='py-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control required type='password' placeholder='Enter a Password' value={password} onChange={(e) => setPassword(e.target.value)}>
            </Form.Control>
        </Form.Group>
        
        <Form.Group controlId='passwordConfirm' className='py-3'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control required type='password' placeholder='Re-enter Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
            </Form.Control>
        </Form.Group>

        <Button type='submit' variant='custom'>Register</Button>

      </Form>

      <Row className='py-3'>
          <Col>
              Are you already registered?... <Link to='/login' className='link-btn'>Sign In Here</Link>
          </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterView