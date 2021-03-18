import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, NavDropdown, Nav, Container, Row } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'

function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () =>{
        console.log('Legout')
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
                        <NavDropdown title={userInfo.name} id='username'> 
                            <LinkContainer to='/profile'>
                                <NavDropdown.Item>Pofile</NavDropdown.Item>
                            </LinkContainer>

                            <NavDropdown.Item> onClick={logoutHandler}Logout</NavDropdown.Item>
                               
                        </NavDropdown>
                    ): (
                        <LinkContainer to='/login'>
                        <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                        </LinkContainer>
                    )
                    }


                    
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
