import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import { FaSignOutAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import FileOne from "./FileOne";

import AccountOpening from "./AccountOpening";
import CustomerSheet from "./CustomerSheet";
import "./Dashboard.css";
import Library from "./Library";
import Cookies from "js-cookie";

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [activeComponent, setActiveComponent] = useState<string>("dashboard");

  const [showLibrary, setShowLibrary] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleNavClick = (component: string) => {
    setActiveComponent(component);
  };

  const toggleLibrary = () => {
    setShowLibrary(!showLibrary);
  };
  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    navigate("/login");
  };

  return (
    <Container fluid>
      <Navbar expand="lg" className="navbar-custom">
        <Navbar.Brand href="#" className="navbar-brand-custom">
          Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link onClick={handleLogout} className="logout-link">
              <FaSignOutAlt />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Row>
        <Col
          md={2}
          className={`sidebar ${
            isSidebarOpen ? "sidebar-open" : "sidebar-closed"
          }`}
        >
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
          <Nav className="flex-column">
            <Nav.Link onClick={() => handleNavClick("dashboard")}>
              Dashboard
            </Nav.Link>
            <Nav.Link onClick={() => handleNavClick("profile")}>
              Profile   
            </Nav.Link>
            <Nav.Link onClick={() => handleNavClick("accountOpening")}>
              Account Opening
            </Nav.Link>

            <Nav.Link onClick={() => handleNavClick("customerSheet")}>
              Customer Sheet
            </Nav.Link>
            <Nav.Link onClick={() => handleNavClick("library")}>
              Library
            </Nav.Link>
            {showLibrary && <Library />}
            <Nav.Link href="#">Reports</Nav.Link>
          </Nav>
        </Col>

        <Col md={10} className="main-content">
          {activeComponent === "dashboard" && (
            <>
              <h2>Welcome to the Dashboard</h2>
            </>
          )}
          {activeComponent === "fileone" && <FileOne />}

          {activeComponent === "accountOpening" && <AccountOpening />}
          {activeComponent === "customerSheet" && <CustomerSheet />}
          {activeComponent === "library" && <Library />}
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
