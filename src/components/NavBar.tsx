import { Container, Navbar } from "react-bootstrap";

const NavBar = () => {
  return (
    <>
  <Navbar bg="white" variant="dark" className="text-left">
    <Container>
      <Navbar.Brand href="">
        <img
          alt="logo"
          src="https://www.klarx.de/assets/_icons/klarx-484c09148b858a7dc0758b8b14bee996684e7a13aa0ee1b33185b564d7f88183.svg"
          width=""
          height="40"
          className="d-inline-block align-top"
        />{' '}
      
      </Navbar.Brand>
    </Container>
  </Navbar>
</>
  );
};

export default NavBar;