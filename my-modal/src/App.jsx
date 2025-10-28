import { useState } from "react";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // EMAIL VALIDATION TEST
    if (email && !email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    // PHONE VALIDATION TEST
    if (phone && !/^[0-9]{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    // DOB VALIDATION TEST
    if (dob) {
      const today = new Date();
      const selected = new Date(dob);
      if (selected > today) {
        alert("Invalid date of birth.");
        return;
      }
    }

    // FULL VALIDATION for final submit
    if (!username.trim() || !email.trim() || !phone.trim() || !dob.trim()) {
      alert(
        `Please fill out ${
          !username
            ? "Username"
            : !email
            ? "Email Address"
            : !phone
            ? "Phone Number"
            : "Date of Birth"
        }`
      );
      return;
    }

    // RESET + CLOSE
    setUsername("");
    setEmail("");
    setPhone("");
    setDob("");
    setIsOpen(false);
  };

  // Close modal when clicking outside
  const closeOnOutside = (e) => {
    if (e.target.className === "overlay") setIsOpen(false);
  };

  return (
    <div id="root" className="App" onClick={(e) => {
      if (isOpen && e.target.id === "root") setIsOpen(false);
    }}>
      <h1>User Details Modal</h1>
      <button onClick={() => setIsOpen(true)}>Open Form</button>

      {isOpen && (
        <div className="overlay" onClick={closeOnOutside}>
          <div className="modal">
            <div className="modal-content">
              <h2>Fill Details</h2>
              <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />

                <label>Email Address:</label>
                <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label>Phone Number:</label>
                <input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

                <label>Date of Birth:</label>
                <input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />

                <button type="submit" className="submit-button">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
