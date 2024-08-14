import React, { useState } from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { FaSignOutAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; 
import AccountOpening from './AccountOpening';
import CustomerSheet from './CustomerSheet';
import './Dashboard.css';

const Dashboard: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const [activeComponent, setActiveComponent] = useState<string>('dashboard');

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleNavClick = (component: string) => {
        setActiveComponent(component);
    };

    return (
        <Container fluid>
            <Navbar expand="lg" className="navbar-custom">
                <Navbar.Brand href="#" className="navbar-brand-custom">Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link href="#" className="logout-link">
                            <FaSignOutAlt /> {/* Logout icon */}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Row>
                <Col
                    md={2}
                    className={`sidebar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}
                >
                    <button className="sidebar-toggle" onClick={toggleSidebar}>
                        {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />} {/* Arrow icons */}
                    </button>
                    <Nav className="flex-column">
                        <Nav.Link onClick={() => handleNavClick('dashboard')}>Dashboard</Nav.Link>
                        <Nav.Link onClick={() => handleNavClick('profile')}>Profile</Nav.Link>
                        <Nav.Link onClick={() => handleNavClick('accountOpening')}>Account Opening</Nav.Link>
                        <Nav.Link onClick={() => handleNavClick('customerSheet')}>Customer Sheet</Nav.Link>
                        <Nav.Link href="#">Reports</Nav.Link>
                    </Nav>
                </Col>

                <Col md={10} className="main-content">
                    {activeComponent === 'dashboard' && (
                        <>
                            <h2>Welcome to the Dashboard</h2>
                        </>
                    )}
                    {activeComponent === 'accountOpening' && <AccountOpening />}
                    {activeComponent === 'customerSheet' && <CustomerSheet />}
                </Col>
            </Row>

            {/* Footer */}
            <footer className="text-center mt-4 footer-custom">
                <Container>
                    <p>&copy; {new Date().getFullYear()}</p>
                </Container>
            </footer>
        </Container>
    );
};

export default Dashboard;
