import React, { useState } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
    return (
        <Navbar className='border-bottom' bg='light' expand='lg'>
            <Navbar.Brand href='#home'>EduGuide</Navbar.Brand>
            <Nav className='ml-auto'>
                <LinkContainer to='/login'>
                    <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/signup'>
                    <Nav.Link>Signup</Nav.Link>
                </LinkContainer>
                {/* <LinkContainer to='/signup'>Signup</LinkContainer> */}
                {/* <Nav.Link href='#profile'>Profile</Nav.Link>
                <Nav.Link href='#logout'>Logout</Nav.Link> */}
            </Nav>
        </Navbar>
    );
};

export default Header;
