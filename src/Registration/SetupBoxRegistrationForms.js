import React, { useState, useEffect } from 'react';
import '../css/CustomerProfile.css';

const setupBoxTypes = ['HD', 'SD', 'DVR'];
const statusTypes = ['ACTIVE', 'INACTIVE', 'BLOCKED'];
const idProofTypes = ['AADHAAR', 'PASSPORT', 'PAN', 'VOTER_ID', 'DRIVER_LICENSE'];

const SetupBoxRegistrationForms = ({ prev, updateForm, submit }) => {
  const [form, setForm] = useState({
    ipAddress: '',
    software: '',
    status: 'ACTIVE',
    version: '',
    setBoxType: 'HD',
    registrationId: '',
    idProofNumber: '',
    idProofType: 'AADHAAR',
    registrationDate: '',
    sellerId: '',
  });

  useEffect(() => {
    updateForm(form);
  }, [form]); // <-- sync on every change

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    updateForm(form);
    submit();
  };

  return (
    <div className="customer-address-container">
      <h4>Setup Box Details</h4>
      <div className="form-grid">
        <div className="form-group">
          <label>IP Address*</label>
          <input type="text" name="ipAddress" value={form.ipAddress} onChange={handleChange} className="form-control"  required/>
        </div>
        <div className="form-group">
          <label>Software*</label>
          <input type="text" name="software" value={form.software} onChange={handleChange} className="form-control" required />
        </div>
        <div className="form-group">
          <label>Status*</label>
          <select name="status" value={form.status} onChange={handleChange} className="form-control" required>
            {statusTypes.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Version*</label>
          <input type="text" name="version" value={form.version} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Set Box Type*</label>
          <select name="setBoxType" value={form.setBoxType} onChange={handleChange} className="form-control">
            {setupBoxTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <hr />

      <h4>Registration Details</h4>
      <div className="form-grid">
        <div className="form-group">
          <label>Registration ID*</label>
          <input type="text" name="registrationId" value={form.registrationId} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Seller ID*</label>
          <input type="text" name="sellerId" value={form.sellerId} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>ID Proof Type*</label>
          <select name="idProofType" value={form.idProofType} onChange={handleChange} className="form-control">
            {idProofTypes.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>ID Proof Number*</label>
          <input type="text" name="idProofNumber" value={form.idProofNumber} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Registration Date*</label>
          <input type="date" name="registrationDate" value={form.registrationDate} onChange={handleChange} className="form-control" />
        </div>
      </div>

      <div className="form-actions">
        <button className="btn btn-secondary" onClick={prev}>Previous</button>{' '}
        <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default SetupBoxRegistrationForms;
