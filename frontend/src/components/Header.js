import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, NavDropdown, Nav, Container } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'


function Header() {

    //When I comment this out, then try AuthLogin below, then comment this back in, it works. 
    //need to figure out how to get AuthLogin to work. 
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    //trying something new
    //i think the issue is because if you search userLogin, its defined in both user and auth actions. should probably just be auth 
    const authLogin = useSelector(state => state.authLogin)
    const { authInfo } = authLogin
    console.log(77, userInfo)
    console.log(78, authInfo)

    const dispatch = useDispatch() 

    const logoutHandler = () =>{
        dispatch(logout()) 
    }

    return (
        <header>
        <Navbar bg="light" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>Pro Shop</Navbar.Brand>
                </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">

                    <LinkContainer to='/cart'>
                        <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                    </LinkContainer>
                    
                    {userInfo ? (
                        <NavDropdown title={userInfo.email} id='name'> 
                            <LinkContainer to='/profile'>
                                <NavDropdown.Item>Pofile</NavDropdown.Item>
                            </LinkContainer>

                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                               
                        </NavDropdown>
                    ): (
                        <LinkContainer to='/login'>
                        <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                        </LinkContainer>
                    )}

                    {userInfo && userInfo.isAdmin && (
                        <NavDropdown title='Admin' id='adminmenu'> 
                        <LinkContainer to='/admin/userlist'>
                            <NavDropdown.Item>Users</NavDropdown.Item>
                        </LinkContainer>

                        <LinkContainer to='/admin/productlist'>
                            <NavDropdown.Item>Products</NavDropdown.Item>
                        </LinkContainer>

                        <LinkContainer to='/admin/orderlist'>
                            <NavDropdown.Item>Orders</NavDropdown.Item>
                        </LinkContainer>
                           
                    </NavDropdown>                        
                    )}


                    
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
    )
}

export default Header
