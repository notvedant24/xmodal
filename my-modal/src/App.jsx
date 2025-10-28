import { useState } from "react";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, phone, dob } = formData;

    // 1️⃣ Check if any field empty
    if (!username || !email || !phone || !dob) {
      alert(`Please fill out ${!username ? "Username" : !email ? "Email" : !phone ? "Phone" : "Date of Birth"}`);
      return;
    }

    // 2️⃣ Email validation
    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    // 3️⃣ Phone validation (must be 10 digits)
    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    // 4️⃣ DOB validation (must not be a future date)
    const selected = new Date(dob);
    const today = new Date();
    if (selected > today) {
      alert("Invalid date of birth.");
      return;
    }

    // ✅ If valid, close modal and reset
    setIsOpen(false);
    setFormData({ username: "", email: "", phone: "", dob: "" });
  };

  return (
    <div
      id="root"
      onClick={(e) => {
        // 5️⃣ If click outside modal-content while modal open
        if (isOpen && !e.target.closest(".modal-content")) {
          setIsOpen(false);
        }
      }}
    >
      {!isOpen && <button onClick={() => setIsOpen(true)}>Open Form</button>}

      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <label>Username:</label>
              <input id="username" value={formData.username} onChange={handleChange} />

              <label>Email:</label>
              <input id="email" value={formData.email} onChange={handleChange} />

              <label>Phone:</label>
              <input id="phone" value={formData.phone} onChange={handleChange} />

              <label>Date of Birth:</label>
              <input id="dob" type="date" value={formData.dob} onChange={handleChange} />

              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
