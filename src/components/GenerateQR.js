import React, { useState } from "react";
import QRCode from "qrcode.react";
import "./GenerateQR.css";
const GenerateQR = ({ hideLoginSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [qrCodeValue, setQRCodeValue] = useState("");

  const generateQRCode = () => {
    // Generate the QR code value based on the phone number or any other data you need
    const qrValue = `tel:${phoneNumber}`;
    setQRCodeValue(qrValue);
    hideLoginSuccess(); // Call the callback function to hide the "👍Login Success" message
  };

  return (
    <div>
      <h2>Generate QR Code</h2>
      <form>
        <label htmlFor="phoneNumber">Enter Phone Number:</label>
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button type="button" onClick={generateQRCode}>
          Generate QR Code
        </button>
      </form>
      {qrCodeValue && <QRCode value={qrCodeValue} />}
    </div>
  );
};

export default GenerateQR;
