import React, { useState, useRef } from "react";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import "./AccountOpening.css";
import Spinner from "../components/Spinner";
import axios from "axios";

const AccountOpening: React.FC = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isSecondFormSubmitted, setIsSecondFormSubmitted] = useState(false);
  const [isThirdFormSubmitted, setIsThirdFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //const [isGenerating, setIsGenerating] = useState(false);

  const secondFormRef = useRef<HTMLDivElement | null>(null);
  const thirdFormRef = useRef<HTMLDivElement>(null);
  const fourthFormRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    clientID: "",
    companyName: "",
    acronym: "",
    countryHeadquarters: "",
    headquartersCity: "",
    recordType: "",
    pOBox: "",
    legalForm: "",
    creationDate: "",
    nationality: "",
    registrationNumber: "",
    nifCode: "",
    address: "",
    phone: "",
    email: "",
    sector: "",
    capital: "",
    revenue: "",
    employees: "",
    shareholderName: "",
    shareholderType: "",
    shareholderNationality: "",
    shareholderNIF: "",
    shareholderAddress: "",
    shareholderPhone: "",
    shareholderEmail: "",
    shareholderCapital: "",
    adminName: "",
    adminDateBirth: "",
    adminPlaceBirth: "",
    adminNationality: "",
    adminDomicileLegal: "",
    adminpartSocial: "",
    managerName: "",
    managerDateBrith: "",
    managerPlaceBirth: "",
    managerNationality: "",
    managerDomicileLegal: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSecondFormSubmit = () => {
    setIsSecondFormSubmitted(true);
    if (thirdFormRef.current) {
      thirdFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleThirdFormSubmit = () => {
    setIsThirdFormSubmitted(true);
    if (fourthFormRef.current) {
      fourthFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handelFormNav = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    if (secondFormRef.current) {
      window.scrollTo({
        top: secondFormRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };
  const generateXML = (data: typeof formData) => {   
    return `
<AccountOpening>
            <ClientID>${data.clientID}</ClientID>
            <CompanyName>${data.companyName}</CompanyName>
            <Acronym>${data.companyName}</Acronym>
            <CountryHeadquarters></CountryHeadquarters>
            <HeadquartersCity></HeadquartersCity>
            <RecordType></RecordType>
            <POBox></POBox>
            <LegalForm></LegalForm>
            <CreationDate>${data.creationDate}</CreationDate>
            <Nationality></Nationality>
            <RegistrationNumber></RegistrationNumber>
            <NifCode></NifCode>
            <Address></Address>
            <Phone></Phone>
            <Email></Email>
            <Sector></Sector>
            <Capital></Capital>
            <Revenue></Revenue>
            <Employees></Employees>
            <Name></Name>
            <Type></Type>
            <Nationality></Nationality> 
            <NIF></NIF>
            <Address></Address>
            <Phone></Phone>
            <Email></Email>
            <Capital></Capital>
            <Name></Name>
            <DateOfBirth></DateOfBirth>
            <PlaceOfBirth></PlaceOfBirth>
            <Nationality></Nationality>
            <DomicileLegal></DomicileLegal>
            <PartSocial></PartSocial>
            <Name></Name>
            <DateOfBirth></DateOfBirth>
            <PlaceOfBirth></PlaceOfBirth>
            <Nationality></Nationality>
            <DomicileLegal></DomicileLegal>
        </AccountOpening>`;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const xmlData = generateXML(formData);
    const blob = new Blob([xmlData], { type: "application/xml" });
    const formDataToSend = new FormData();
    formDataToSend.append("file", blob, "data.xml");

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://192.168.1.248:9090/COMPTE",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File upload response:", response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("File upload failed:", error);
      setIsLoading(false);
    }
  };

  
  return (
    <>
      <Form className="animated-form" onSubmit={handelFormNav}>
        <h2 className="profile-title">PROFILE INFORMATION</h2>
        <Row>
          <Col md={3}>
            <Form.Group controlId="formClientID">
              <Form.Label>Client ID</Form.Label>
              <Form.Control
                type="text"
                name="clientID"
                value={formData.clientID}
                onChange={handleChange}
                placeholder="Enter your clientID"
                className="custom-clientID animated-input"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="formCompanyName">
              <Form.Label>Name or Business Name</Form.Label>
              <Form.Control
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter your Name"
                className="animated-input"
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="formacronym">
              <Form.Label>Acronym</Form.Label>
              <Form.Control
                type="text"
                name="acronym"
                value={formData.acronym}
                onChange={handleChange}
                placeholder="Enter your Acronym"
                className="animated-input"
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="formLegalForm">
              <Form.Label>Legal Form</Form.Label>
              <Form.Control
                type="text"
                name="legalForm"
                value={formData.legalForm}
                onChange={handleChange}
                placeholder="Enter your Legal"
                className="animated-input"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Form.Group controlId="formCreationDate">
              <Form.Label>Date of Creation</Form.Label>
              <Form.Control
                type="text"
                name="creationDate"
                value={formData.creationDate}
                onChange={handleChange}
                placeholder="Enter the Date of Creation"
                className="animated-input"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="formNationality">
              <Form.Label>Nationality</Form.Label>
              <Form.Control
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                placeholder="Enter the nationality"
                className="animated-input"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="formCountryHeadquarters">
              <Form.Label>Country of Headquarters</Form.Label>
              <Form.Control
                type="text"
                name="countryHeadquarters"
                value={formData.countryHeadquarters}
                onChange={handleChange}
                placeholder="Enter the Country of Headquarters"
                className="animated-input"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="formHeadquartersCity">
              <Form.Label>City of Headquarters</Form.Label>
              <Form.Control
                type="text"
                name="headquartersCity"
                value={formData.headquartersCity}
                onChange={handleChange}
                placeholder="Enter the City of Headquarters"
                className="animated-input"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Form.Group controlId="formRecordType">
              <Form.Label>Type of Registration</Form.Label>
              <Form.Control
                type="text"
                name="recordType"
                value={formData.recordType}
                onChange={handleChange}
                placeholder="Enter the Type of Registration"
                className="animated-input"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="formRegistrationNumber">
              <Form.Label>Registration Number</Form.Label>
              <Form.Control
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                placeholder="Enter the Registration Number"
                className="animated-input"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="formNifCode">
              <Form.Label>NIF Code</Form.Label>
              <Form.Control
                type="text"
                name="nifCode"
                value={formData.nifCode}
                onChange={handleChange}
                placeholder="Enter NIF Code"
                className="animated-input"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter Address"
                className="animated-input"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Form.Group controlId="formOBox">
              <Form.Label>Postal Box</Form.Label>
              <Form.Control
                type="text"
                name="pOBox"
                value={formData.pOBox}
                onChange={handleChange}
                placeholder="Enter Postal Box"
                className="animated-input"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter Phone"
                className="animated-input"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="animated-input"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="formSector">
              <Form.Label>Business Sector</Form.Label>
              <Form.Control
                type="text"
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                placeholder="Enter the Business Sector"
                className="animated-input"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Form.Group controlId="formCapital">
              <Form.Label>Capital</Form.Label>
              <Form.Control
                type="text"
                name="capital"
                value={formData.capital}
                onChange={handleChange}
                placeholder="Enter the Capital"
                className="animated-input"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="formRevenue">
              <Form.Label>Revenue</Form.Label>
              <Form.Control
                type="text"
                name="revenue"
                value={formData.revenue}
                onChange={handleChange}
                placeholder="Enter Revenue"
                className="animated-input"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="formEmployees">
              <Form.Label>Workforces</Form.Label>
              <Form.Control
                type="text"
                name="employees"
                value={formData.employees}
                onChange={handleChange}
                placeholder="Enter the Workforce"
                className="animated-input"
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="button-container">
          <Button type="submit" className="submit-button">
            <i className="fas fa-chevron-down"></i>
          </Button>
        </div>
      </Form>

      {isFormSubmitted && (
        <div ref={secondFormRef} className="animated-form">
          <h2 className="form-Action">SHAREHOLDERS / PARTNERS</h2>
          <Form>
            <Row>
              <Col md={3}>
                <Form.Group controlId="formShareholderName">
                  <Form.Label>Shareholder</Form.Label>
                  <Form.Control
                    type="text"
                    name="shareholderName"
                    value={formData.shareholderName}
                    onChange={handleChange}
                    className="animated-input"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formShareholderType">
                  <Form.Label>Date of birth</Form.Label>
                  <Form.Control
                    type="text"
                    name="shareholderType"
                    value={formData.shareholderType}
                    onChange={handleChange}
                    className="animated-input"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formShareholderNationality">
                  <Form.Label>Place of birth</Form.Label>
                  <Form.Control
                    type="text"
                    name="shareholderNationality"
                    value={formData.shareholderNationality}
                    onChange={handleChange}
                    className="animated-input"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formShareholderNIF">
                  <Form.Label>Nationality</Form.Label>
                  <Form.Control
                    type="text"
                    name="shareholderNIF"
                    value={formData.shareholderNIF}
                    onChange={handleChange}
                    className="animated-input"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <Form.Group controlId="formShareholderAddress">
                  <Form.Label>Legal domicile</Form.Label>
                  <Form.Control
                    type="text"
                    name="shareholderAddress"
                    value={formData.shareholderAddress}
                    onChange={handleChange}
                    className="animated-input"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formShareholderPhone">
                  <Form.Label>Dependency</Form.Label>
                  <Form.Control
                    type="text"
                    name="shareholderPhone"
                    value={formData.shareholderPhone}
                    onChange={handleChange}
                    className="animated-input"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formShareholderEmail">
                  <Form.Label>Level</Form.Label>
                  <Form.Control
                    type="email"
                    name="shareholderEmail"
                    value={formData.shareholderEmail}
                    onChange={handleChange}
                    className="animated-input"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formShareholderCapital">
                  <Form.Label> Social Share(%)</Form.Label>
                  <Form.Control
                    type="text"
                    name="shareholderCapital"
                    value={formData.shareholderCapital}
                    onChange={handleChange}
                    className="animated-input"
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="button-container">
              <Button
                onClick={handleSecondFormSubmit}
                className="submit-button"
              >
                <i className="fas fa-chevron-down"></i>
              </Button>
            </div>
          </Form>
        </div>
      )}

      {isSecondFormSubmitted && (
        <div ref={thirdFormRef} className="animated-form">
          <h2 className="form-Admin">ADMINISTRATORS</h2>
          <Form>
            <Row>
              <Col md={4}>
                <Form.Group controlId="formAdminName">
                  <Form.Label>Last Name & First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="adminName"
                    value={formData.adminName}
                    onChange={handleChange}
                    className="animated-input"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formAdminDateBirth">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="text"
                    name="adminDateBirth"
                    value={formData.adminDateBirth}
                    onChange={handleChange}
                    className="animated-input"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formAdminPlaceBirth">
                  <Form.Label>Place of Birth</Form.Label>
                  <Form.Control
                    type="text"
                    name="adminPlaceBirth"
                    value={formData.adminPlaceBirth}
                    onChange={handleChange}
                    className="animated-input"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group controlId="formAdminNationality">
                  <Form.Label>Nationality</Form.Label>
                  <Form.Control
                    type="text"
                    name="adminNationality"
                    value={formData.adminNationality}
                    onChange={handleChange}
                    className="animated-input"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formDomicilelégal">
                  <Form.Label>Legal Domicile</Form.Label>
                  <Form.Control
                    type="text"
                    name="adminDomicileLegal"
                    value={formData.adminDomicileLegal}
                    onChange={handleChange}
                    className="animated-input"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formPartSocial">
                  <Form.Label>Social Share (%)</Form.Label>
                  <Form.Control
                    type="text"
                    name="adminpartSocial"
                    value={formData.adminpartSocial}
                    onChange={handleChange}
                    className="animated-input"
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="button-container">
              <Button onClick={handleThirdFormSubmit} className="submit-button">
                <i className="fas fa-chevron-down"></i>
              </Button>
            </div>
          </Form>
        </div>
      )}

      {isThirdFormSubmitted && (
        <div ref={fourthFormRef} className="animated-form">
          <h2 className="form-dirigeant"> MANAGERS</h2>
          <Form>
            <Row>
              <Col md={3}>
                <Form.Group controlId="formDirigeantName">
                  <Form.Label>Last Name & First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="managerName"
                    value={formData.managerName}
                    onChange={handleChange}
                    className="animated-input"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formDirigeantDateNaissance">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="text"
                    name="managerDateBrith"
                    value={formData.managerDateBrith}
                    onChange={handleChange}
                    className="animated-input"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formDirigeantLieuNaissance">
                  <Form.Label>Place of Birth</Form.Label>
                  <Form.Control
                    type="text"
                    name="managerPlaceBirth"
                    value={formData.managerPlaceBirth}
                    onChange={handleChange}
                    className="animated-input"
                  />
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group controlId="formDirigeantNationality">
                  <Form.Label>Nationality</Form.Label>
                  <Form.Control
                    type="text"
                    name="managerNationality"
                    value={formData.managerNationality}
                    onChange={handleChange}
                    className="animated-input"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formDirigeantDomicilelégal">
                  <Form.Label>Legal Domicile</Form.Label>
                  <Form.Control
                    type="text"
                    name="managerDomicileLegal"
                    value={formData.managerDomicileLegal}
                    onChange={handleChange}
                    className="animated-input"
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="button-container-wrapper">
              <div className="button-container-right">
                <div className="account-opening-container">
                  <div className="button-container-print">
                    <Button
                      className="print-button"
                      disabled={isLoading}
                      style={{
                        backgroundColor: "#EDB719", // Red background color
                        color: "white", // White text color
                        border: "none", // Remove borders
                        padding: "10px 20px", // Add some padding
                        textAlign: "center", // Center text
                        textDecoration: "none", // Remove underline
                        display: "inline-block", // Allow margin and padding to work
                        fontSize: "16px", // Set font size
                        margin: "4px 2px", // Add some margin
                        cursor: "pointer", // Change cursor to pointer
                        borderRadius: "4px", // Rounded corners
                      }}
                    >

                        Create Document
                    
                    </Button>
                  </div>
                </div>
              </div>

              <div className="button-container-left">
                <div className="button-show">
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    style={{
                      backgroundColor: "", // Red background color
                      border: "none", // Remove borders
                      padding: "4px 20px", // Add some padding
                      textAlign: "center", // Center text
                      textDecoration: "none", // Remove underline
                      display: "inline-block", // Allow margin and padding to work
                      fontSize: "12px", // Set font size
                      margin: "2px 2px", // Add some margin
                      cursor: "pointer", // Change cursor to pointer
                      borderRadius: "4px", // Rounded corners
                    }}
                  >
                    {isLoading ? (
                      <Spinner size="sm" title=" is Loading ... " show />
                    ) : (
                      "Generate PDF"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      )}
      
    </>
  );
};

export default AccountOpening;
