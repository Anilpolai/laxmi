import React from "react";
import "./contact.css";

const Contact = () => {
  return (
    <div className="contact-wrapper">
      <h1 className="contact-heading">Got Any Questions?</h1>
      <p className="contact-subtext">
        Use the form below to get in touch with the sales team
      </p>

      <form className="contact-form">
        <div className="form-row">
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email *" required />
        </div>

        <input type="text" placeholder="Phone Number" />

        <textarea placeholder="Message" rows="6" required></textarea>

        <button type="submit" className="send-btn ">
          SEND <span className="arrow">›</span>
        </button>
      </form>
    </div>
  );
};

export default Contact;
