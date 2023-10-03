import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import "./App.css";
import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import GenerateQR from "./components/GenerateQR";


const App = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [showGenerateQRPage, setShowGenerateQRPage] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        setLoading(false);
        toast.error("Error sending OTP: " + error.message); // Display an error message
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
        setShowOTP(false); // Hide OTP input after successful verification
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error("OTP verification failed"); // Display an error message
      });
  }

  const showGenerateQR = () => {
    setShowGenerateQRPage(true);
    setUser(null); // Hide the "👍Login Success" message
    setLoggedIn(true); // Set loggedIn to true when "Generate QR Code" is clicked
  };

  return (
    <section className="app">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {!user ? (
          <div className="div2">
            <h1 className="hea1">
              Seamless Scanning,
              <br />
              Limitless Experiences
            </h1>
            {showOTP ? (
              <>
                <div className="di3">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label htmlFor="otp" className="lab">
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <button onClick={onOTPVerify} className="butt">
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="di3">
                  <BsTelephoneFill size={30} />
                </div>
                <label htmlFor="" className="lab">
                  Verify your phone number
                </label>
                <PhoneInput country={"in"} value={ph} onChange={setPh} />
                <button onClick={onSignup} className="butt">
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </button>
              </>
            )}
          </div>
        ) : (
          <>
            <h2 className="hea1">👍Login Success</h2>
            <button onClick={showGenerateQR}>Generate QR Code</button>
          </>
        )}
        {showGenerateQRPage && <GenerateQR />}
      </div>
    </section>
  );
};

export default App;
