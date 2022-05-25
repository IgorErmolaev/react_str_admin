import React from "react";
import {Container, Navbar, Nav, Offcanvas, Row, Col, Image} from "react-bootstrap";
import { Link } from "react-router-dom";
import {baseUrl,baseNameUrl} from "../lib/config";

function Header() {
    return (
        <Navbar className="navbar" variant="dark" expand="false">
            <Container fluid>
                <Row>
                    <Col><Navbar.Toggle aria-controls="offcanvasNavbar"/></Col>
                    <Col className="align-self-center">
                        <Navbar.Brand href={baseNameUrl}>
                            <Image
                                alt=""
                                src={baseUrl+"/tools/abanklogo_white.png"}
                                width="25"
                                height="30"
                                className="d-inline-block align-top"
                            />{' '}
                            Стратегії прийняття рішення
                        </Navbar.Brand>
                    </Col>
                </Row>
                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="start"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">
                            Меню
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Link className="nav-link" to="/codeManage">Управління кодами</Link>
                            <a className="nav-link" href="https://limits.a-bank.com.ua/checkDecis/" target="_blank" rel="noopener noreferrer">Журнал заявок</a>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default Header;
