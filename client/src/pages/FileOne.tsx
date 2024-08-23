import { useState } from "react";
import axios from "axios";

const FileOne: React.FC = () => {
  const [formData, setFormData] = useState({
    ClientID: "123",
    CompanyName: "Dlice",
    Acronym: "",
    CountryHeadquarters: "",
    HeadquartersCity: "",
    RecordType: "",
    POBox: "",
    LegalForm: "",
    CreationDate: "",
    Nationality: "",
    RegistrationNumber: "",
    NifCode: "",
    Address: "",
    Phone: "",
    Email: "",
    Sector: "",
    Capital: "",
    Revenue: "",
    Employees: "",
    Name: "",
    Type: "",
    NIF: "",
    DateOfBirth: "",
    PlaceOfBirth: "",
    DomicileLegal: "",
    PartSocial: "",
  });

  const [showValidModal, setShowValidModal] = useState(false);
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);

  const [UploadLoading, setIsUploadLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  // Default this to a country's code to preselect it
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]); //
    }
  };
  const generateXML = (data: typeof formData) => {   
    return `
<AccountOpening>
            <ClientID>${data.ClientID}</ClientID>
            <CompanyName>Soguirefel</CompanyName>
            <Acronym>Soguirefel</Acronym>
            <CountryHeadquarters></CountryHeadquarters>
            <HeadquartersCity></HeadquartersCity>
            <RecordType></RecordType>
            <POBox></POBox>
            <LegalForm></LegalForm>
            <CreationDate>02/12/2009</CreationDate>
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
      setIsUploadLoading(true);
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
      setIsUploadLoading(false);
      setShowValidModal(true);
    } catch (error) {
      console.error("File upload failed:", error);
      setIsUploadLoading(false);
    }
  };
  // Inputs handler //

  return (
    <div className="p-6 max-w bg-white  md:max-w-2xl ">
      <h1 className="text-3xl font-Poppins mb-10 mt-20 flex gap-6">
        Obtenez votre badge
      </h1>

      <form>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label htmlFor="first_name"> Client ID </label>
            <input
              type="text"
              value={formData.ClientID}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="last_name">Company Name</label>
            <input
              type="text"
              value={formData.CompanyName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="company">Entreprise</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="phone">Téléphone</label>
            <input type="tel" id="phone"  />
          </div>
          <div>
            <label htmlFor="website">Fonction</label>
            <input id="website"  />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="email">Courriel</label>
          <input type="email" id="email"  />
        </div>

        <button className="bg-blue-500 text-white py-4 px-10 rounded hover:bg-blue-600 font-Poppins ml-4 " onClick={handleSubmit}>
          {" "}
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default FileOne;
