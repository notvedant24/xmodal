import { useState } from "react";
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, phone, dob } = formData;

    if (!username) {
      alert("Please fill out Username");
      return;
    }
    if (!email) {
      alert("Please fill out Email");
      return;
    }
    if (!phone) {
      alert("Please fill out Phone Number");
      return;
    }
    if (!dob) {
      alert("Please fill out Date of Birth");
      return;
    }

    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    const today = new Date();
    const dobDate = new Date(dob);
    if (dobDate > today) {
      alert("Invalid date of birth. Please enter a valid date.");
      return;
    }

    setShowModal(false);
    setFormData({ username: "", email: "", phone: "", dob: "" });
  };

  const handleOutsideClick = (e) => {
    if (e.target.className === "modal") setShowModal(false);
  };

  return (
    <div className="modal" onClick={showModal ? handleOutsideClick : undefined}>
      <div className="app-container">
        <h1 className="title">User Details Modal</h1>

        {!showModal && (
          <button className="open-form-btn" onClick={() => setShowModal(true)}>
            Open Form
          </button>
        )}

        {showModal && (
          <div className="modal-content">
            <h2 className="form-title">Fill Details</h2>
            <form onSubmit={handleSubmit}>
              <label>Username:</label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
              />

              <label>Email Address:</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />

              <label>Phone Number:</label>
              <input
                id="phone"
                type="number"
                value={formData.phone}
                onChange={handleChange}
              />

              <label>Date of Birth:</label>
              <input
                id="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
              />

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
