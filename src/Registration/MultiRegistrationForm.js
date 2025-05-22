import React, { useState } from 'react';
import CustomerAddress from './CustomerAddress';
import SetupBoxRegistrationForms from './SetupBoxRegistrationForms';
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';

const MultiRegistrationForm = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    customerProfile: { address: {} },
    ipAddress: '',
    software: '',
    status: 'ACTIVE',
    version: '',
    setBoxType: 'HD',
    registrationId: '',
    idProofType: 'AADHAAR',
    idProofNumber: '',
    registrationDate: '',
    sellerId: '',
  });

  const next = () => setStep(step + 1);
  const prev = () => setStep(step - 1);

  const updateForm = (newData) => {
    if (newData.customerProfile) {
      setFormData((prev) => ({
        ...prev,
        customerProfile: {
          ...prev.customerProfile,
          ...newData.customerProfile,
          address: {
            ...prev.customerProfile.address,
            ...(newData.customerProfile.address || {})
          }
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        ...newData
      }));
    }
  };

  const handleSubmit = async () => {
    const payload = {
      customerProfile: formData.customerProfile,
      setupBox: {
        ipAddress: formData.ipAddress,
        software: formData.software,
        status: formData.status,
        version: formData.version,
        setBoxType: formData.setBoxType
      },
      registrationId: formData.registrationId,
      idProofType: formData.idProofType,
      idProofNumber: formData.idProofNumber,
      registrationDate: formData.registrationDate,
      sellerId: formData.sellerId
    };

    console.log('Final Payload Sent to API:', payload);

    try {
      const res = await fetch('http://localhost:8080/api/registration/saveAll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Error submitting form');

      toast.success('Submitted successfully!');
      setStep(1);
      setFormData({
        customerProfile: { address: {} },
        ipAddress: '',
        software: '',
        status: 'ACTIVE',
        version: '',
        setBoxType: 'HD',
        registrationId: '',
        idProofType: 'AADHAAR',
        idProofNumber: '',
        registrationDate: '',
        sellerId: '',
      });
    } catch (error) {
      toast.error('Submission failed!');
      setStep(1);
      console.error(error);
    }
  };

  return (
    <>
    <ToastContainer
           position="top-right"
           autoClose={3000}
           hideProgressBar={false}
           newestOnTop
           closeOnClick
           rtl={false}
           pauseOnFocusLoss
           draggable
           pauseOnHover
           theme="colored"
         />

      {step === 1 && <CustomerAddress next={next} updateForm={updateForm} />}
      {step === 2 && (
        <SetupBoxRegistrationForms
          prev={prev}
          updateForm={updateForm}
          submit={handleSubmit}
        />
      )}
    </>
  );
};

export default MultiRegistrationForm;