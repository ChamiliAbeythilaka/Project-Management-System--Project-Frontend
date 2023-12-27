import React from "react";
import {Navbar, Nav} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from "react-router-dom";


function NavbarComponent() {

  return (
     <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
     
      <Container fluid>
        <Navbar.Brand href="/">G3 Technology</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            
          
            
          </Nav>
          <Nav>
          <NavLink exact to ="/" className="nav-link">Dashboard</NavLink>
          <NavLink to ="/projects" className="nav-link">Project</NavLink>
          
          <NavDropdown title="Customer" id="collasible-nav-dropdown">
              <NavLink to="/companies" className="dropdown-item">Companies</NavLink>
              <NavLink to="/people" className="dropdown-item"> People</NavLink>
               
          </NavDropdown>

            <NavLink to="/ourteam" className="nav-link">Our Team</NavLink>
             
          </Nav>

        <Nav>
          <Nav className="user">
            <img src="public/images.png" alt=""/>
           </Nav>
            {/* <Profile/> */}
        </Nav> 

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;

