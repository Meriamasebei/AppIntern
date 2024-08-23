import React , { useState, useEffect }  from 'react'
import axios from 'axios';
import Spinner from './Spinner';
export type ModalPdfProps = {
  formdata : FormData | null 
    onClose?: () => void
  }

const ModalPdf = (props :ModalPdfProps ) => {
  const [isLoading, setIsLoading] = useState(false)

    const { onClose , formdata} = props
    const [pdfUrls, setPdfUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
         // Make a GET request to fetch the PDF.
    const url = "http://192.168.1.236:9090/TEXT"

    axios.post(url, formdata , {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'multipart/form-data',
      }, // Specify the response type as blob.
    })
    .then((response) => {
      // Create a Blob URL from the response data
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      setIsLoading(true)
    })
    .catch((error) => {
      console.error('Error fetching PDF:', error);
    });

    // Clean up the URL when the component unmounts
    return () => {
      if (pdfUrls) {
        URL.revokeObjectURL(pdfUrls);
      }
    };
  }, []);
  return (
      <div

        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50 z-50"
      >
        <div className="bg-white p-12 rounded-lg shadow-lg relative">
          <button
            className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
            onClick={onClose}
          >
            Close
          </button>
         {isLoading ? <iframe
            title="PDF Viewer"
            src={pdfUrls}
            className="h-[900px] w-[900px]"
          ></iframe> : <Spinner show title="Loading"/>  }
        </div>
      </div>
  )
}
export default  ModalPdf