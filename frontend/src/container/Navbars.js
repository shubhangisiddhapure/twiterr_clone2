/** @format */
import React  from "react";
import { Navbar, Nav } from "react-bootstrap";

const Navbars = () => {
  return (
    <div>
      <Navbar style={{ backgroundColor: "#50b7f5" }}>
        <Nav className="ml-right">
          <Nav.Link href="/profile">My Profile</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <Nav.Link href="/Home">Go to Feed</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};
export default Navbars;
