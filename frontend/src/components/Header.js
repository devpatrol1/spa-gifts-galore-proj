import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Navbar, Nav, Container, NavDropdown, Badge} from 'react-bootstrap'
import SearchBox from './SearchBox'
import {logout} from '../actions/userActions'


function Header() {
  const userLogin = useSelector(state => state.userLogin)
  const{userInfo} = userLogin

  const cart = useSelector(state => state.cart)
  const {cartItems} = cart

  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar style={{backgroundSize: "0", backgroundColor: "#56b4c4"}} expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand className="logo" href="/">
            <img className='logo-img' src="/images/logo.png" alt="logo"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end" style={{ width:"100%" }}>

              <SearchBox />

              {userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin Tools' id='adminmenu'>
                <NavDropdown.Item href='/admin/userlist'>Users</NavDropdown.Item>
                <NavDropdown.Item href='/admin/productlist'>Products</NavDropdown.Item>
                <NavDropdown.Item href='/admin/orderlist'>Orders</NavDropdown.Item>
              </NavDropdown>
              )} 

              <Nav.Link href="/cart">
                Cart
                <i className='fas fa-shopping-cart fa-lg'>
                  <Badge className='cart-badge'>
                    {cartItems.reduce((acc, item) => acc + item.qty * 1,  0)} 
                  </Badge>
                </i>
              </Nav.Link>

              {userInfo ? (
              <NavDropdown title={<div style={{display: "inline-block"}}><i className='fas fa-user-circle fa-lg'></i> Hi, {userInfo.name} </div>} id="username">
                <NavDropdown.Item href="/profile">My Account</NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>Log Out</NavDropdown.Item>
              </NavDropdown>
              ) : (
              <Nav.Link href="/login"><i className='fas fa-user fa-lg'></i> Log In</Nav.Link>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header