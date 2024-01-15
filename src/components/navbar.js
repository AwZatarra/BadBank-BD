import React from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { UserContext } from './user-context';

function NavigationBar() {
    
    const ctx = React.useContext(UserContext);
    
    // const [loggedIn] = ctx.loginState;
    const [loggedIn, setLoggedIn] = ctx.loginState;

    const handleLogout = () => {
        // Limpiar los datos en ctx.currentUser y ctx.userIndex
        ctx.currentUser = null;
        ctx.userIndex = null;
        // Actualizar el estado de login
        setLoggedIn(false);
    };

    return (
        <Navbar className="color-nav" variant="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Bad Bank</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                            <Nav.Link title="Home">Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/createaccount">
                            <Nav.Link title="Create Account">Create Account</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="deposit">
                            <Nav.Link title="Deposit">Deposit</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="withdraw">
                            <Nav.Link title="Withdraw">Withdraw</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="alldata">
                            <Nav.Link title="All Data">All Data</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav className="ml-auto">
                        {!loggedIn && (
                            <LinkContainer to="login">
                                <Nav.Link title="Login">Login</Nav.Link>
                            </LinkContainer>
                        )}
                        {loggedIn && (
                            <Nav.Link title="UserName" className="user-name">
                                {ctx.currentUser.name}
                            </Nav.Link>
                        )}
                        {loggedIn && (
                            <LinkContainer to="login">
                                <Nav.Link
                                    title="Logout"
                                    onClick={handleLogout}
                                    className="logout-link"
                                >
                                    Logout
                                </Nav.Link>
                            </LinkContainer>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

    // return (
    //     <Navbar className="color-nav" variant="light" expand="lg">
    //         <Container>
    //             <Navbar.Brand href="/">Bad Bank</Navbar.Brand>
    //             <Navbar.Toggle aria-controls="basic-navbar-nav"/>
    //             <Navbar.Collapse id="basic-navbar-nav">
    //                 <Nav className="me-auto">
    //                     <LinkContainer to="/">
    //                         <Nav.Link title="Home">Home</Nav.Link>
    //                     </LinkContainer>
    //                     <LinkContainer to="/createaccount">
    //                         <Nav.Link title="Create Account">Create Account</Nav.Link>
    //                     </LinkContainer>
    //                     {!loggedIn && <LinkContainer to="login">
    //                         <Nav.Link title="Login">Login</Nav.Link>
    //                     </LinkContainer>}
    //                     <LinkContainer to="deposit">
    //                         <Nav.Link title="Deposit">Deposit</Nav.Link>
    //                     </LinkContainer>
    //                     <LinkContainer to="withdraw">
    //                         <Nav.Link title="Withdraw">Withdraw</Nav.Link>
    //                     </LinkContainer>
    //                     <LinkContainer to="alldata">
    //                         <Nav.Link title="All Data">All Data</Nav.Link>
    //                     </LinkContainer>
    //                     {loggedIn && <LinkContainer to="login">
    //                         <Nav.Link title="Logout">Logout</Nav.Link>
    //                     </LinkContainer>}
    //                 </Nav>
    //             </Navbar.Collapse>
    //         </Container>
    //     </Navbar> 
    // );
}

export default NavigationBar;