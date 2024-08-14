import React, { useState, useRef } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import './AccountOpening.css'; // Import the CSS file for AccountOpening
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Spinner from '../components/Spinner';

const AccountOpening: React.FC = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isSecondFormSubmitted, setIsSecondFormSubmitted] = useState(false);
  const [isThirdFormSubmitted, setIsThirdFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const secondFormRef = useRef<HTMLDivElement | null>(null);
  const thirdFormRef = useRef<HTMLDivElement>(null);
  const fourthFormRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement | null>(null);


  const [formData, setFormData] = useState({
    clientID: '',
    companyName: '',
    abbreviation: '',
    countryHeadquarters: '',
    headquartersCity: '',
    recordType: '',
    pOBox: '',
    legalForm: '',
    creationDate: '',
    nationality: '',
    registrationNumber: '',
    nifCode: '',
    address: '',
    phone: '',
    email: '',
    sector: '',
    capital: '',
    revenue: '',
    employees: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSecondFormSubmit = () => {
    setIsSecondFormSubmitted(true);
    if (thirdFormRef.current) {
        thirdFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }
};

const handleThirdFormSubmit = () => {
  setIsThirdFormSubmitted(true);
  if (fourthFormRef.current) {
      fourthFormRef.current.scrollIntoView({ behavior: 'smooth' });
  }
};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    if (secondFormRef.current) {
      window.scrollTo({
        top: secondFormRef.current.offsetTop,
        behavior: 'smooth'
      });
    }
  };


  const handleShowFormSubmit = () => {
    alert('Button Clicked!');
  };

  const printDocument = async () => {
    setIsLoading(true);
    try {
      // Simulate a document printing process or actual logic
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a delay
    } finally {
      setIsLoading(false);
    }

    if (formRef.current) {
      const input = formRef.current;
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210; 
      const pageHeight = 295; 
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, -heightLeft, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save('form.pdf');
    }
  };

  return (
    <>
      <Form className="animated-form" onSubmit={handleSubmit}>
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
                placeholder='Enter your clientID'
                className="animated-input"
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
                placeholder='Enter your Name'
                className="animated-input"
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="abbreviation">
              <Form.Label>Acronym</Form.Label>
              <Form.Control
                type="text"
                name="abbreviation"
                value={formData.legalForm}
                onChange={handleChange}
                placeholder='Enter your Acronym'
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
                placeholder='Enter your Legal'
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
                placeholder='Enter the Date of Creation'
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
                placeholder='Enter the nationality'
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
                value={formData.nationality}
                onChange={handleChange}
                placeholder='Enter the Country of Headquarters'
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
                value={formData.nationality}
                onChange={handleChange}
                placeholder='Enter the City of Headquarters'
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
                value={formData.registrationNumber}
                onChange={handleChange}
                placeholder='Enter the Type of Registration'
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
                placeholder='Enter the Registration Number'
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
                placeholder='Enter NIF Code'
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
                placeholder='Enter Address'
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
                value={formData.nifCode}
                onChange={handleChange}
                placeholder='Enter Postal Box'
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
                value={formData.address}
                onChange={handleChange}
                placeholder='Enter Phone'
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
                placeholder='Enter Email'
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
                placeholder='Enter the Business Sector'
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
                placeholder='Enter the Capital'
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
                placeholder='Enter Revenue'
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
                placeholder='Enter the Workforce'
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
                  <Form.Label>Shareholder's Name</Form.Label>
                  <Form.Control type="text" className="animated-input" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formShareholderType">
                  <Form.Label>Type</Form.Label>
                  <Form.Control type="text" className="animated-input" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formShareholderNationality">
                  <Form.Label>NationalitY</Form.Label>
                  <Form.Control type="text" className="animated-input" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formShareholderNIF">
                  <Form.Label>NIF Code</Form.Label>
                  <Form.Control type="text" className="animated-input" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <Form.Group controlId="formShareholderAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" className="animated-input" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formShareholderPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" className="animated-input" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formShareholderEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" className="animated-input" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formShareholderCapital">
                  <Form.Label>Subscribed Capital</Form.Label>
                  <Form.Control type="text" className="animated-input" />
                </Form.Group>
              </Col>
            </Row>


            <div className="button-container">
          <Button onClick={handleSecondFormSubmit} className="submit-button">
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
                  <Form.Control type="text" className="animated-input" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formAdminDateNaissance">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control type="text" className="animated-input" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formAdminLieuNaissance">
                  <Form.Label>Place of Birth</Form.Label>
                  <Form.Control type="text" className="animated-input" />
                </Form.Group>
              </Col>
              </Row>
            <Row>
              <Col md={4}>
                <Form.Group controlId="formAdminNationality">
                  <Form.Label>Nationality</Form.Label>
                  <Form.Control type="text" className="animated-input" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formDomicilelégal">
                  <Form.Label>Legal Domicile</Form.Label>
                  <Form.Control type="text" className="animated-input" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formPartSocial">
                  <Form.Label>Social Share (%)</Form.Label>
                  <Form.Control type="text" className="animated-input" />
                </Form.Group>
              </Col>
            </Row>
            <div className="button-container">
          <Button  onClick={handleThirdFormSubmit} className="submit-button" >
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
                  <Form.Control type="text" className="animated-input" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formDirigeantDateNaissance">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control type="text" className="animated-input" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formDirigeantLieuNaissance">
                  <Form.Label>Place of Birth</Form.Label>
                  <Form.Control type="text" className="animated-input" />
                </Form.Group>
              </Col>
            
              <Col md={3}>
                <Form.Group controlId="formDirigeantNationality">
                  <Form.Label>Nationality</Form.Label>
                  <Form.Control type="text" className="animated-input" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formDirigeantDomicilelégal">
                  <Form.Label>Legal Domicile</Form.Label>
                  <Form.Control type="text" className="animated-input" />
                </Form.Group>
              </Col>
            </Row>
            
            <div className="button-container-wrapper">
            <div className="button-container-right">
  <div className="account-opening-container">
    <div className="button-container-print">
      <Button onClick={printDocument} className="print-button" disabled={isLoading}
        style={{
          backgroundColor: '#cd0156', // Red background color
          color: 'white', // White text color
          border: 'none', // Remove borders
          padding: '10px 20px', // Add some padding
          textAlign: 'center', // Center text
          textDecoration: 'none', // Remove underline
          display: 'inline-block', // Allow margin and padding to work
          fontSize: '16px', // Set font size
          margin: '4px 2px', // Add some margin
          cursor: 'pointer', // Change cursor to pointer
          borderRadius: '4px' // Rounded corners
        }}>
        {isLoading ? <Spinner isOpen={true} /> : 'Create Document'}
      </Button>
    </div>
  </div>
  </div>
  <div className="button-container-left" >
  <div className="button-show">
    <Button onClick={handleShowFormSubmit} className="submit-button">
      Show
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
