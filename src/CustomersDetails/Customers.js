import React, { useEffect, useState } from 'react';
import '../css/CustomersTable.css';
import '../css/EditOverlay.css';  // Import the CSS for overlay styles
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import myImage from '../Assests/image.png';
const setupBoxTypes = ["HD", "SD", "DVR"];
const statusTypes = ["ACTIVE", "INACTIVE", "BLOCKED"];
const idProofTypes = ["AADHAAR", "PASSPORT", "PAN", "VOTER_ID", "DRIVER_LICENSE"];

const Customers = () => {
  const [registration, setRegistration] = useState([]);
  const [loading, SetLoading] = useState(true);
  const [error, SetError] = useState(null);

  const [showOverlay, setShowOverlay] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/api/registration/getAll")
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then((data) => {
        setRegistration(data.data);
        SetLoading(false);
      })
      .catch((error) => {
        SetError(error.message);
        SetLoading(false);
      });
  }, []);

  if (loading) return <p>Loading Registration.....</p>;
  if (error) return <p className="error-text">Error: {error}</p>;

  // data handleEdit for edit the registration data
  function handleEdit(registration) {
    setEditData(registration);
    setShowOverlay(true);
  }

  function handleCloseOverlay() {
    setShowOverlay(false);
    setEditData({});
  }

  function handleInputChange(e) {
    const { name, value } = e.target;

    // Handle nested properties (like customerProfile.firstName)
    if (name.includes('.')) {
      const keys = name.split('.');
      setEditData((prev) => {
        const updated = { ...prev };
        let current = updated;
        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) current[keys[i]] = {};
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        return updated;
      });
    } else {
      setEditData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }


//   update/edit function starts
  async function handleSave() {
    try {
      const res = await fetch(`http://localhost:8080/api/registration/updateRegistration`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });
      const data = await res.json();
      if (res.ok) {
        // alert('Updated successfully');
        toast.success('successfully updated th Data');
        console.log(data)
        // Update local state registration list to reflect edited data
        setRegistration((prev) =>
          prev.map((reg) => (reg.id === editData.id ? editData : reg))
        );
        handleCloseOverlay();
      } else {
        // alert(data.message || 'Failed to update');
        toast.error('Failed to update');
      }
    } catch (error) {
      alert('Server error');
      console.error(error);
    }
  }

//   update edit fuctions ends


// delete starts
  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this registration?")) {
      try {
        const res = await fetch(`http://localhost:8080/api/registration/delete/${id}`, {
          method: "DELETE"
        });

        const data = await res.json();
        if (res.ok) {
        //   alert(data.message);
          toast.success(data.message,'Submitted deleted Data!');
          setRegistration(registration.filter(reg => reg.id !== id));
        } else {
        //   alert(data.message || "Failed to delete");
        toast.error('failed to Delete');
        }
      } catch (error) {
        toast.error('failed to Delete');
        console.error("Delete error", error);
        alert("Server error");
      }
    }
  }
//   delete ends 


// table starts 
  return (
    <div className="table-container">
          <img
        src={myImage} alt="SUNdirect Banner" style={{ width: '100%', height: '185px', borderRadius: '10px' }}
     className='myimage' />
    <h1 className='regList'>Registrations<br></br>
    <p>manage all your registrations</p>
    </h1>
    {/* table starts */}
      <table className="customers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Setup Box Type</th>
            <th>Registration Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {registration.map((reg) => {
            const registrationId = reg.id || 'N/A';
            const fullName = reg.customerProfile
              ? `${reg.customerProfile.firstName} ${reg.customerProfile.lastName}`
              : 'N/A';

            return (
              <tr key={registrationId}>
                <td>{registrationId}</td>
                <td>{fullName}</td>
                <td>{reg.customerProfile?.email || 'N/A'}</td>
                <td>{reg.customerProfile?.phoneNumber || 'N/A'}</td>
                <td>{reg.setupBox?.setBoxType || 'N/A'}</td>
                <td>
                  {reg.registrationDate
                    ? new Date(reg.registrationDate).toLocaleDateString()
                    : 'N/A'}
                </td>
                <td>{reg.setupBox?.status || 'N/A'}</td>
                <td className="action-buttons">
                  <button className="edit-btn" onClick={() => handleEdit(reg)}>
                    <FaEdit />
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(registrationId)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
{/* table ends */}

{/* edit overlay starts  */}
      {showOverlay && (
        <div className="overlay">
          <div className="overlay-content">
        
            <h3 className='editText'>Edit Registration Details</h3>
            <form className="edit-form" onSubmit={(e) => e.preventDefault()}>
              {/* Customer Profile */}
              <fieldset>
                <legend>Customer Profile</legend>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name:</label>
                    <input
                      type="text"
                      name="customerProfile.firstName"
                      value={editData.customerProfile?.firstName || ''}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Last Name:</label>
                    <input
                      type="text"
                      name="customerProfile.lastName"
                      value={editData.customerProfile?.lastName || ''}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      name="customerProfile.email"
                      value={editData.customerProfile?.email || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number:</label>
                    <input
                      type="text"
                      name="customerProfile.phoneNumber"
                      value={editData.customerProfile?.phoneNumber || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {editData.customerProfile?.address && (
                  <fieldset className="nested-fieldset">
                    <legend>Address</legend>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Street:</label>
                        <input
                          type="text"
                          name="customerProfile.address.street"
                          value={editData.customerProfile.address.street || ''}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>City:</label>
                        <input
                          type="text"
                          name="customerProfile.address.city"
                          value={editData.customerProfile.address.city || ''}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>State:</label>
                        <input
                          type="text"
                          name="customerProfile.address.state"
                          value={editData.customerProfile.address.state || ''}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Pincode:</label>
                        <input
                          type="text"
                          name="customerProfile.address.pincode"
                          value={editData.customerProfile.address.pincode || ''}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </fieldset>
                )}
              </fieldset>

              {/* Setup Box */}
              <fieldset>
                <legend>Setup Box</legend>
                <div className="form-row">
                  <div className="form-group">
                    <label>Setup Box Type:</label>
                    <select
                      name="setupBox.setBoxType"
                      value={editData.setupBox?.setBoxType || ''}
                      onChange={handleInputChange}
                    >
                      <option value="">--Select--</option>
                      {setupBoxTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Status:</label>
                    <select
                      name="setupBox.status"
                      value={editData.setupBox?.status || ''}
                      onChange={handleInputChange}
                    >
                      <option value="">--Select--</option>
                      {statusTypes.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </fieldset>

              {/* Registration */}
              <fieldset>
                <legend>Registration</legend>
                <div className="form-row">
                  <div className="form-group">
                    <label>Registration Date:</label>
                    <input
                      type="date"
                      name="registrationDate"
                      value={editData.registrationDate ? editData.registrationDate.split('T')[0] : ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>ID Proof Type:</label>
                    <select
                      name="idProofType"
                      value={editData.idProofType || ''}
                      onChange={handleInputChange}
                    >
                      <option value="">--Select--</option>
                      {idProofTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>ID Proof Number:</label>
                    <input
                      type="text"
                      name="idProofNumber"
                      value={editData.idProofNumber || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </fieldset>

              <div className="form-actions">
                <button type="button" className="btn-save" onClick={handleSave}>
                  Save
                </button>
                <button type="button" className="btn-cancel" onClick={handleCloseOverlay}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

       {/* ToastContainer displays the toasts triggered by toast.success / toast.error */}
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
    </div>
  );
};

export default Customers;
