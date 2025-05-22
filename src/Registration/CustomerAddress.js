import React, { useState, useEffect } from "react";
import "../css/CustomerProfile.css";

const states = ["ANDHRA_PRADESH", "TELANGANA", "TAMIL_NADU"];
const genders = ["MALE", "FEMALE", "OTHER"];

const CustomerAddress = ({ next, updateForm }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    alterPhoneNumber: "",
    gender: "",
    profilePic: "",
    address: {
      houseNumber: "",
      street: "",
      city: "",
      state: "",
      country: "INDIA",
      pincode: ""
    }
  });

  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in form.address) {
      setForm((prev) => ({ ...prev, address: { ...prev.address, [name]: value } }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Validation check to enable/disable Next button
  useEffect(() => {
    // simple validation: check if all required fields are non-empty and valid
    
    // No numbers allowed in firstName and lastName
    const nameRegex = /^[A-Za-z\s]+$/;

    const requiredFieldsFilled =
      form.firstName.trim() !== "" &&
      nameRegex.test(form.firstName) &&
      form.lastName.trim() !== "" &&
      nameRegex.test(form.lastName) &&
      form.email.trim() !== "" &&
      /\S+@\S+\.\S+/.test(form.email) &&  // simple email regex
      form.phoneNumber.trim() !== "" &&
      form.gender.trim() !== "" &&
      form.address.houseNumber.trim() !== "" &&
      form.address.street.trim() !== "" &&
      form.address.city.trim() !== "" &&
      form.address.state.trim() !== "" &&
      form.address.pincode.trim() !== "";

    setIsValid(requiredFieldsFilled);
  }, [form]);

  const handleNext = () => {
    if (!isValid) return; // Just extra safety
    updateForm({ customerProfile: form });
    next();
  };

  return (
    <div className="customer-address-container">
      <h4>Customer Profile</h4>

      <div className="form-grid">
        <div className="form-group">
          <label>First Name<span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
            required
          />
        </div>

        <div className="form-group">
          <label>Last Name<span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
            required
          />
        </div>

        <div className="form-group">
          <label>Email<span style={{ color: 'red' }}>*</span></label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number<span style={{ color: 'red' }}>*</span></label>
          <input
            type="tel"
            name="phoneNumber"
            className="form-control"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
        </div>

        <div className="form-group">
          <label>Alternate Phone Number</label>
          <input
            type="tel"
            name="alterPhoneNumber"
            className="form-control"
            value={form.alterPhoneNumber}
            onChange={handleChange}
            placeholder="Enter alternate phone number"
          />
        </div>

        <div className="form-group">
          <label>Gender<span style={{ color: 'red' }}>*</span></label>
          <select
            name="gender"
            className="form-control"
            value={form.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            {genders.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Profile Pic</label>
          <input
            type="text"
            name="profilePic"
            className="form-control"
            value={form.profilePic}
            onChange={handleChange}
            placeholder="Profile picture URL or name"
          />
        </div>
      </div>

      <h5>Address</h5>

      <div className="form-grid">
        <div className="form-group">
          <label>House Number<span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            name="houseNumber"
            className="form-control"
            value={form.address.houseNumber}
            onChange={handleChange}
            placeholder="House Number"
            required
          />
        </div>

        <div className="form-group">
          <label>Street<span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            name="street"
            className="form-control"
            value={form.address.street}
            onChange={handleChange}
            placeholder="Street"
            required
          />
        </div>

        <div className="form-group">
          <label>City<span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            name="city"
            className="form-control"
            value={form.address.city}
            onChange={handleChange}
            placeholder="City"
            required
          />
        </div>

        <div className="form-group">
          <label>State<span style={{ color: 'red' }}>*</span></label>
          <select
            name="state"
            className="form-control"
            value={form.address.state}
            onChange={handleChange}
            required
          >
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Country</label>
          <select
            name="country"
            className="form-control"
            value={form.address.country}
            disabled
            required
          >
            <option value="INDIA">INDIA</option>
          </select>
        </div>

        <div className="form-group">
          <label>Pincode<span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            name="pincode"
            className="form-control"
            value={form.address.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            required
          />
        </div>
      </div>
      {/* <button className="btn-next" onClick={handleNext} disabled={!isValid}> */}
      <button className="btn-next" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default CustomerAddress;
