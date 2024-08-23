import React, { useState, useRef } from 'react';
import { Form, Row, Col, Button, Container, Card } from 'react-bootstrap';
import './CustomerSheet.css';
import axios from 'axios';
import Spinner from '../components/Spinner';

const CustomerSheet: React.FC = () => {
    const [formData, setFormData] = useState({
        companyName: '',
        legalForm: '',
        registrationNumber: '',
        nifCode: '',
        address: '',
        phone: '',
        email: '',
        sector: '',
        shareholder: '',
        birthDate: '',
        birthPlace: '',
        nationality: '',
        legalResidence: '',
        dependence: '',
        level: '',
        socialShare: '',
        nameSurname: '',
        quality: '',
        fileFees: '',
        leaderName: '',
        leaderBirthDate: '',
        leaderBirthPlace: '',
        leaderNationality: '',
        leaderLegal: '',
        PartSocialEven: '',
        NameDirigeant: '',
        dateDirigeant:'',
        LieuDirigeant:'',
        NatiDirigeant:'',
        domicileDirigeant:'',
        bankAccount1: '',
        bankAccount2: '',
        activities: '',
        revenueN1: '',
        revenueN2: '',
        revenueN3: '',
        Objet:'',
        ModeAppro: '',
        DepotIni: '',
        DocumentRecu:'',
        provenance: '', 
        Recommandation: '',
        NomRe: '',
        bankInitiative: '',
        thirdPartyRecommendation: '', 
        businessIntroducer: '', 
        contactInfo: ''
    });

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isSecondFormSubmitted, setIsSecondFormSubmitted] = useState(false);
    const [isThirdFormSubmitted, setIsThirdFormSubmitted] = useState(false);
    const [isFourthFormSubmitted, setIsFourthFormSubmitted] = useState(false);
    const [isFifthFormSubmitted, setIsFifthFormSubmitted] = useState(false);
    const [isSixFormSubmitted, setIsSixFormSubmitted] = useState(false);
    const [isSevenFormSubmitted, setIsSevenFormSubmitted] = useState(false);
    const [isEightFormSubmitted, setIsEightFormSubmitted] = useState(false);
    const [isNinthFormSubmitted, setIsNinthFormSubmitted] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);


    const secondFormRef = useRef<HTMLDivElement>(null);
    const thirdFormRef = useRef<HTMLDivElement>(null);
    const fourthFormRef = useRef<HTMLDivElement>(null);
    const fifthFormRef = useRef<HTMLDivElement>(null);
    const sixthFormRef = useRef<HTMLDivElement>(null);
    const seventhFormRef = useRef<HTMLDivElement>(null);
    const eighthFormRef = useRef<HTMLDivElement>(null);
    const ninthFormRef = useRef<HTMLDivElement>(null);
    const tenthFormRef = useRef<HTMLDivElement>(null);

    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));


        



        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
          };
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsFormSubmitted(true);
        if (secondFormRef.current) {
            secondFormRef.current.scrollIntoView({ behavior: 'smooth' });
        }
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

    const handleFourthFormSubmitted = () => {
        setIsFourthFormSubmitted(true);
        if (fifthFormRef.current) {
            fifthFormRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleFifthFormSubmitted = () => {
        setIsFifthFormSubmitted(true);
        if (sixthFormRef.current) {
            sixthFormRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };


    const handleSixFormSubmitted = () => {
        setIsSixFormSubmitted(true);
        if (seventhFormRef.current) {
            seventhFormRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSevenFormSubmitted = () => {
        setIsSevenFormSubmitted(true);
        if (eighthFormRef.current) {
            eighthFormRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleEightFormSubmitted = () => {
        setIsEightFormSubmitted(true);
        if (ninthFormRef.current) {
            ninthFormRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    
    const handleNinthFormSubmitted = () => {
        setIsNinthFormSubmitted(true);
        if (tenthFormRef.current) {
            tenthFormRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };


    
  


  const handleSoumettre = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsGenerating(true);
    axios.post('http://localhost:3000/api/auth/save-dataCustomerSheet', formData)
      .then(response => {
        alert('Data saved successfully');
        setIsGenerating(false);
      })
      .catch(error => {
        console.error('There was an error saving the data!', error);
      });
  };



    return (
        <Container className="customer-sheet-container">
            <Card className="customer-sheet-card animated-card">
                <Card.Body>
                    <h2 className="form-title">IDENTIFICATION</h2>
                    <Form onSubmit={handleSubmit}>
                        <Row className="animated-row">
                            <Col md={6}>
                                <Form.Group controlId="formCompanyName" className="form-group">
                                    <Form.Label>Corporate Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        placeholder="Corporate Name"
                                        className="animated-input"
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group controlId="formLegalForm" className="form-group">
                                    <Form.Label>Legal Form</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="legalForm"
                                        value={formData.legalForm}
                                        onChange={handleChange}
                                        placeholder="Enter Legal"
                                        className="animated-input"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="animated-row">
                            <Col md={6}>
                                <Form.Group controlId="formRegistrationNumber" className="form-group">
                                    <Form.Label>RCCM Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="registrationNumber"
                                        value={formData.registrationNumber}
                                        onChange={handleChange}
                                        placeholder="Enter RCCM Number"
                                        className="animated-input"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formNifCode" className="form-group">
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
                        </Row>
                        <Row className="animated-row">
                            <Col md={6}>
                                <Form.Group controlId="formAddress" className="form-group">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Enter address"
                                        className="animated-input"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formPhone" className="form-group">
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
                        </Row>
                        <Row className="animated-row">
                            <Col md={6}>
                                <Form.Group controlId="formEmail" className="form-group">
                                    <Form.Label>E-mail</Form.Label>
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
                            <Col md={6}>
                                <Form.Group controlId="formSector" className="form-group">
                                    <Form.Label>Business Sector</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="sector"
                                        value={formData.sector}
                                        onChange={handleChange}
                                        placeholder="Enter Business Sector"
                                        className="animated-input"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className="submit-button-container">
                            <Button type="submit" className="submit-button">
                            <i className="fas fa-chevron-down"></i>
                            </Button>
                        </div>

                        
                    </Form>
                </Card.Body>
            </Card>

            {isFormSubmitted && (
                <div ref={secondFormRef} className="second-form-container">
                    <Card className="customer-sheet-card animated-card">
                        <Card.Body>
                            <h2 className="form-title">SHAREHOLDERS / PARTNERS</h2>
                            <Form>
                                <Row className="animated-row">
                                    <Col md={3}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Shareholder</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="shareholder"
                                                value={formData.shareholder}
                                                onChange={handleChange}
                                                className="animated-input"
                                            />
                                        </Form.Group>
                                    </Col>
                            
                                    <Col md={3}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Date of Brith</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="birthDate"
                                                value={formData.birthDate}
                                                onChange={handleChange}
                                                className="animated-input"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Place of Brith</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="birthPlace"
                                                value={formData.birthPlace}
                                                onChange={handleChange}
                                                className="animated-input"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Nationality</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="nationality"
                                                value={formData.nationality}
                                                onChange={handleChange}
                                                className="animated-input"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="animated-row">
                                    <Col md={3}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Legal Domicile</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="legalResidence"
                                                value={formData.legalResidence}
                                                onChange={handleChange}
                                                className="animated-input"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Dependency</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="dependence"
                                                value={formData.dependence}
                                                onChange={handleChange}
                                                className="animated-input"
                                            />
                                        </Form.Group>
                                    </Col>
                        
                                    <Col md={3}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Level</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="level"
                                                value={formData.level}
                                                onChange={handleChange}
                                                className="animated-input"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Social Share (%)</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="socialShare"
                                                value={formData.socialShare}
                                                onChange={handleChange}
                                                className="animated-input"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div className="submit-button-container">
                                    <Button onClick={handleSecondFormSubmit} className="submit-button">
                                    <i className="fas fa-chevron-down"></i>
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            )}

            {isSecondFormSubmitted && (
                <div ref={thirdFormRef} className="third-form-container">
                    <Card className="customer-sheet-card animated-card">
                        <Card.Body>
                            <h2 className="form-title">ADMINISTRATORS</h2>
                            <Form>
                                <Row className="animated-row">
                                    <Col md={4}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Last Name & First Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="leaderName"
                                                value={formData.leaderName}
                                                onChange={handleChange}
                                                className="animated-input"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Date of Brith</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="leaderBirthDate"
                                                value={formData.leaderBirthDate}
                                                onChange={handleChange}
                                                className="animated-input"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Place of Brith</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="leaderBirthPlace"
                                                value={formData.leaderBirthPlace}
                                                onChange={handleChange}
                                                className="animated-input"
                                            />
                                        </Form.Group>
                                    </Col>
                                    </Row>
                                    <Row className="animated-row">
                                    <Col md={4}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Nationality</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="leaderNationality"
                                                value={formData.leaderNationality}
                                                onChange={handleChange}
                                                className="animated-input"
                                            />
                                        </Form.Group>
                                    </Col>
                            
                                    <Col md={4}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Legal Domicile</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="leaderLegal"
                                                value={formData.leaderLegal}
                                                onChange={handleChange}
                                                className="animated-input"
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Potential Share (%)</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="PartSocialEven"
                                                value={formData.PartSocialEven}
                                                onChange={handleChange}
                                                className="animated-input"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div className="submit-button-container">
                                    <Button onClick={handleThirdFormSubmit} className="submit-button">
                                    <i className="fas fa-chevron-down"></i>
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            )}
            {isThirdFormSubmitted && (
                <div ref={fourthFormRef} className="fourth-form-container">
                    <Card className="customer-sheet-card animated-card">
                        <Card.Body>
                            <h2 className="form-title">MANAGERS</h2>
                            <Form>
                                <Row className="animated-row">
                                    <Col md={3}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Last Name & First Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="NameDirigeant"
                                                value={formData.NameDirigeant}
                                                onChange={handleChange}
                                                className="animated-input"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Date of Brith</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="dateDirigeant"
                                                value={formData.dateDirigeant}
                                                onChange={handleChange}
                                                className="animated-input"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Place of Brith</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="LieuDirigeant"
                                                value={formData.LieuDirigeant}
                                                onChange={handleChange}
                                                className="animated-input"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Nationality</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="NatiDirigeant"
                                                value={formData.NatiDirigeant}
                                                onChange={handleChange}
                                                className="animated-input"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Legal Domicile</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="domicileDirigeant"
                                                value={formData.domicileDirigeant}
                                                onChange={handleChange}
                                                className="animated-input"
                                            />
                                        </Form.Group>
                                    </Col>

                                </Row>
                                <div className="submit-button-container">
                                    <Button onClick={handleFourthFormSubmitted} className="submit-button">
                                    <i className="fas fa-chevron-down"></i>
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            )}

{isFourthFormSubmitted && (
                <div ref={fifthFormRef} className="fifth-form-container">
                    <Card className="customer-sheet-card animated-card">
                        <Card.Body>
                            <h2 className="form-title">BANK ACCOUNTS HELD IN OTHER FINANCIAL INSTITUTIONS</h2>
                            <Form>
                                <Row className="animated-row">
                                    <Col md={6}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Bank Account 1 </Form.Label> 
                                            <Form.Control
                                                type="text"
                                                name="bankAccount1"
                                                value={formData.bankAccount1}
                                                onChange={handleChange}
                                                className="animated-input"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Bank Account 2</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="bankAccount2"
                                                value={formData.bankAccount2}
                                                onChange={handleChange}
                                                className="animated-input"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div className="submit-button-container">
                                    <Button onClick={handleFifthFormSubmitted} className="submit-button">
                                    <i className="fas fa-chevron-down"></i>
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            )}

{isFifthFormSubmitted && (
                <div ref={sixthFormRef} className="sixth-form-container">
                    <Card className="customer-sheet-card animated-card">
                        <Card.Body>
                            <h2 className="form-title">SOURCE OF INVESTED CAPITAL</h2>
                            <Form>
                                <Row className="animated-row">
                                    <Col md={12}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Activities</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={8}
                                                name="activities"
                                                value={formData.activities}
                                                onChange={handleChange}
                                                className="animated-input"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="animated-row">
                                    <Col md={4}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Revenue for the Previous Year(N-1)</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="revenueN1"
                                                value={formData.revenueN1}
                                                onChange={handleChange}
                                                className="animated-input"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Revenue for the Previous Year(N-2)</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="revenueN2"
                                                value={formData.revenueN2}
                                                onChange={handleChange}
                                                className="animated-input"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Revenue for the Previous Year(N-3)</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="revenueN3"
                                                value={formData.revenueN3}
                                                onChange={handleChange}
                                                className="animated-input"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div className="submit-button-container">
                                    <Button onClick={handleSixFormSubmitted} className="submit-button">
                                    <i className="fas fa-chevron-down"></i>
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            )}


            
{isSixFormSubmitted && (
                <div ref={seventhFormRef} className="seventh-form-container">
                    <Card className="customer-sheet-card animated-card">
                        <Card.Body>
                            <h2 className="form-title">EXPECTED ACCOUNT OPERATION</h2>
                            <Form>
                                <Row className="animated-row">
                                    <Col md={4}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Subject</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={8}
                                                name="Objet"
                                                value={formData.Objet}
                                                onChange={handleChange}
                                                className="animated-input"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Procurement Method</Form.Label>
                                            <Form.Control
                                                as="textarea"
 						                        rows={6}
                                                name="ModeAppro"
                                                value={formData.ModeAppro}
                                                onChange={handleChange}
                                                className="animated-input"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Initial Deposit</Form.Label>
                                            <Form.Control
                                                as="textarea"
						                        rows={8}
                                                name="DepotIni"
                                                value={formData.DepotIni}
                                                onChange={handleChange}
                                                className="animated-input"
                                            />
                                        </Form.Group>
                                    </Col>
                               
                                </Row>
                                <div className="submit-button-container">
                                    <Button onClick={handleSevenFormSubmitted} className="submit-button">
                                    <i className="fas fa-chevron-down"></i>
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            )}



{isSevenFormSubmitted && (
                <div ref={eighthFormRef} className="eighth-form-container">
                    <Card className="customer-sheet-card animated-card">
                        <Card.Body>
                            <h2 className="form-title">Attachments</h2>
                            <Form>
                                <Row className="animated-row">
                                    <Col md={20}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Received Documents</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={12}
                                                name="DocumentRecu"
                                                value={formData.DocumentRecu}
                                                onChange={handleChange}
                                                className="animated-input"
                                            />
                                        </Form.Group>
                                    </Col>

                               
                                </Row>
                                <div className="submit-button-container">
                                    <Button onClick={handleEightFormSubmitted} className="submit-button">
                                    <i className="fas fa-chevron-down"></i>
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            )}


{isEightFormSubmitted && (
              <div ref={ninthFormRef} className="ninth-form-container">
              <Card className="customer-sheet-card animated-card">
                  <Card.Body>
                      <h2 className="form-title">SOURCE OF THE RELATIONSHIP INITIATION</h2>
                      <Form>
                      <Row className="animated-row">
                              <Col md={6}>
                                  <Form.Group className="form-group">
                                      <Form.Label>Origin</Form.Label>
                                      <Form.Control
                                          type="text"
                                          name="provenance"
                                          value={formData.provenance}
                                          onChange={handleChange}
                                          className="animated-input"
                                      />
                                  </Form.Group>
                              </Col>
                              <Col md={6}>
                                  <Form.Group className="form-group">
                                      <Form.Label>Recommendation from a Third Party</Form.Label>
                                      <Form.Control
                                          type="text"
                                          name="Recommandation"
                                          value={formData.Recommandation}
                                          onChange={handleChange}
                                          className="animated-input"
                                      />
                                  </Form.Group>
                              </Col>
                          </Row>
                          <Row className="animated-row">
                              <Col md={4}>
                                  <Form.Group className="form-group">
                                      <Form.Label>Apporteur d’affaire</Form.Label>
                                  </Form.Group>
                              </Col>
                              <Col md={4}>
                                  <Form.Group className="form-group">
                                      <Form.Label>Nom</Form.Label>
                                      <Form.Control
                                          type="text"
                                          name="NomRe"
                                          value={formData.NomRe}
                                          onChange={handleChange}
                                          className="animated-input"
                                      />
                                  </Form.Group>
                              </Col>
                              <Col md={4}>
                                  <Form.Group className="form-group">
                                      <Form.Label>Coordonnées</Form.Label>
                                      <Form.Control
                                          type="text"
                                          name="contactInfo"
                                          value={formData.contactInfo}
                                          onChange={handleChange}
                                          className="animated-input"
                                      />
                                  </Form.Group>
                              </Col>
                          </Row>

                          <div className="submit-button-container">
                                    <Button onClick={handleNinthFormSubmitted} className="submit-button">
                                    <i className="fas fa-chevron-down"></i>
                                    </Button>
                                </div>
                      </Form>
                  </Card.Body>
              </Card>
          </div>
      )}

{isNinthFormSubmitted && (
    <div ref={tenthFormRef} className="tenth-form-container">
        <Card className="syntese-form-card animated-card">
            <Card.Body>
                <h2 className="form-title">SYNTHESE</h2>
                <Form>
                    <Row className="animated-row">
                        <Col md={12}>
                            <Form.Group className="form-group">
                                <Form.Label>Conflit d’intérêt</Form.Label>
                                <p>Pensez-vous que ce client serait susceptible de susciter des conflits d’intérêts avec la banque ou une partie prenante ?</p>
                                <Form.Control
                                    as="textarea"
                                    placeholder=""
                                    className="animated-input"
                                />
                                 </Form.Group>
                                 </Col>
                                 <Col md={12}>
                            <Form.Group className="form-group">
                                <p>Préciser l’éventuel type de conflit d’intérêt concerné</p>
                                <Form.Control
                                    as="textarea"
                                    placeholder=""
                                    className="animated-input"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    <Row className="animated-row">
                        <Col md={12}>
                            <Form.Group className="form-group">
                                <Form.Label>LAB-FT</Form.Label>
                                <p>S’agit-il d’un client black-listé ?</p>
                                <Form.Control as="select" className="animated-input">
                                    <option>Non</option>
                                    <option>Oui</option>
                                </Form.Control>
                                
                                <p>S’agit-il d’un client d’origine ou résidant dans un pays figurant sur la black liste ?</p>
                                <Form.Control as="select" className="animated-input">
                                    <option>Non</option>
                                    <option>Oui</option>
                                </Form.Control>

                                <p>S’agit-il d’un client exerçant dans un secteur d’activité risqué ?</p>
                                <Form.Control as="select" className="animated-input">
                                    <option>Non</option>
                                    <option>Oui</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="animated-row">
                        <Col md={12}>
                            <Form.Group className="form-group">
                                <Form.Label>FATCA</Form.Label>
                                <p>S’agit-il d’un client soumis à la législation FATCA ?</p>
                                <Form.Control as="select" className="animated-input">
                                    <option>Non</option>
                                    <option>Oui</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="animated-row">
                        <Col md={12}>
                            <Form.Group className="form-group">
                                <Form.Label>PPE</Form.Label>
                                <p>S’agit-il d’un client qui répond aux critères d’identification des PPE ?</p>
                                <Form.Control
                                    as="textarea"
                                    placeholder=""
                                    className="animated-input"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="animated-row">
                        <Col md={12}>
                            <Form.Group className="form-group">
                                <Form.Label>Niveau de risque attribué au client</Form.Label><Form.Control
                                    as="textarea"
                                    placeholder=""
                                    className="animated-input"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="submit-button-container">
                        <Button type="submit" onClick={handleSoumettre}  className="submit-button" disabled={isGenerating}>
                        {isGenerating ? <Spinner isOpen={true}  /> : ''} Soumettre </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    </div>
)}




</Container>
);};

export default CustomerSheet;
