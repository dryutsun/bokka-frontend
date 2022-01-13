import React, { Fragment } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/react"
const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontFamily: "Roboto",
  fontWeight: "500",
};
const authenticatedOptions = (
  <>
    <Nav.Link>
      <Link to="change-password" style={linkStyle}>
        Change Password
      </Link>
    </Nav.Link>
    <Nav.Link>
      <Link to="sign-out" style={linkStyle}>
        Sign Out
      </Link>
    </Nav.Link>
    <Nav.Link>
      <Link to="userorder_index" style={linkStyle}>
        UserOrderTest
      </Link>
    </Nav.Link>
    <Nav.Link>
      <Link to="porter_index" style={linkStyle}>
        Porter Order Index
      </Link>
    </Nav.Link>
    <Nav.Link>
      <Link to="withoutporterorder_index" style={linkStyle}>
        Porter Without Order Index
      </Link>
    </Nav.Link>
  </>
);

const unauthenticatedOptions = (
  <>
    <Nav.Link>
      <Link to="sign-up" style={linkStyle}>
        Sign Up
      </Link>
    </Nav.Link>
    <Nav.Link>
      <Link to="sign-in" style={linkStyle}>
        Sign In
      </Link>
    </Nav.Link>
  </>
);

const alwaysOptions = (
  <>
    <Nav.Link>
      <Link to="/" style={linkStyle}>
        Home
      </Link>
    </Nav.Link>
  </>
);

const Header = ({ user }) => (
  <Navbar bg="primary" variant="dark" expand="md">
    <Navbar.Brand>
      <Link to="/" style={linkStyle}>
        B.R.I.D.G.E.S
      </Link>
      {/* <Text>{process.env.REACT_APP_MAPBOX_API_KEY}</Text> */}
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        {user && (
          <span className="navbar-text mr-2">Welcome, {user.email}</span>
        )}
        {alwaysOptions}
        {user ? authenticatedOptions : unauthenticatedOptions}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
