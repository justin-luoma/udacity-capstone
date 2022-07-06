import React, {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import LogIn from "./components/LogIn";
import NotFound from "./components/NotFound";
import {Button, Col, Container, Modal, Nav, Navbar, Row, Spinner} from "react-bootstrap";
import {useAuth0} from "@auth0/auth0-react";
import Posts from "./components/posts/Posts";

const App = () => {
    const {logout, isAuthenticated, getAccessTokenSilently, loginWithPopup} = useAuth0();
    const [loading, setLoading] = useState(false);
    const [createPostRef, setCreatePostRef] = useState(<></>);
    const navigate = useNavigate();

    async function printAccessToken() {
        const token = await getAccessTokenSilently();
        console.log("token: ", token);
    }

    if (isAuthenticated) {
        printAccessToken();
    }

    useEffect(() => {
        console.log("App");
    }, [isAuthenticated]);

    const handleLogin = async () => {
        setLoading(true);
        await loginWithPopup();
        setLoading(false);
    }

    const handleLogout = () => {
        logout();
    }

    const logInLogOutButton = () => {
        if (isAuthenticated) {
            return (
                <Nav.Link eventKey="logout" as={Button} onClick={handleLogout} variant="link">
                    Log Out
                </Nav.Link>
            )
        } else {
            return (
                <Nav.Link eventKey="login" as={Button} onClick={handleLogin} variant="link">
                    Log In
                </Nav.Link>
            )
        }
    }

    const generateMenu = () => {
        return (
            <Navbar expand="lg" bg="dark" variant="dark" className="mb-3">
                <Container>
                    <Navbar.Brand>Posts Capstone</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
                            {createPostRef}
                            {/*<Nav.Link href="#pricing">Pricing</Nav.Link>*/}
                            {/*<NavDropdown title="Dropdown" id="collasible-nav-dropdown">*/}
                            {/*    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
                            {/*    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>*/}
                            {/*    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
                            {/*    <NavDropdown.Divider/>*/}
                            {/*    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>*/}
                            {/*</NavDropdown>*/}
                        </Nav>
                        <Nav>
                            {logInLogOutButton()}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }

    const generateCurrentPage = () => {
        if (!isAuthenticated) {
            return <LogIn/>
        }

        return (
            <Routes>
                <Route
                    path="/"
                    element={<Posts createPostRef={createPostRef} />}
                />

                {/*<Route*/}
                {/*  path="/todos/:todoId/edit"*/}
                {/*  exact*/}
                {/*  render={props => {*/}
                {/*    return <EditTodo {...props} auth={this.props.auth} />*/}
                {/*  }}*/}
                {/*/>*/}

                <Route path="*" element={<NotFound/>}/>
            </Routes>
        )
    }

    return (
        <>
            {generateMenu()}
            <Container>
                <Row className="justify-content-center">
                    <Col className="col-6 justify-content-center text-center">
                        {isAuthenticated ? <Posts key="posts" setCreatePostRef={setCreatePostRef} /> : <LogIn />}
                    </Col>
                </Row>
            </Container>
            <Modal show={loading} fullscreen={true} centered={true}>
                <Modal.Body className="d-flex align-items-center justify-content-center">
                    <Col className="col-6 d-flex justify-content-center">
                        <Spinner animation="border" role="status" size="xl">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Col>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default App;
