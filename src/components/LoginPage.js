import React, { useEffect, useState } from "react";
import "../Style/LoginPage.css";
// import { faL } from "@fortawesome/free-solid-svg-icons";

const LoginPage = () => {
  const [time, setTime] = useState(new Date());
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otpNumber, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [otpSent,setotpSent] = useState(false)
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    return time.toLocaleTimeString("en-US", { timeZoneName: "short" });
  };
  const formatDate = (date) => {
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // ✅ Fix 2: Define `calendarGrid` and `currentDay`
  const currentDay = time.getDate();
  const firstDayOfMonth = new Date(time.getFullYear(), time.getMonth(), 1);
  const firstDayIndex = firstDayOfMonth.getDay();
  const daysInMonth = new Date(time.getFullYear(), time.getMonth() + 1, 0).getDate();
  const calendarDays = [];
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const emptyCells = Array(firstDayIndex).fill(null);
  const calendarGrid = [];
  let week = [...emptyCells, ...calendarDays];

  while (week.length) {
    calendarGrid.push(week.splice(0, 7));
  }
  const handleLoginClick = async (e) => {
    e.preventDefault();
    const otp = Math.floor(1000 + Math.random() * 9000);
    localStorage.setItem("otp", otp);
    console.log("Generated OTP:", otp);

    if (username && password) {
      try {
        const response = await fetch("http://localhost:20000/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: username, password, otp }),
        });

        if (response.ok) {
          const data = await response.json();
          setotpSent(true)
          console.log("Login successful, waiting for OTP...");
          localStorage.setItem("adminToken", data.token);
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.error || "Authentication Failed");
        }
      } catch (error) {
        console.error("Error during login request:", error);
        setErrorMessage("An error occurred while logging in.");
      }
    } else {
      setErrorMessage("Please enter username and password.");
    }
  };

  const verifyOtp = () => {
    const storedOtp = localStorage.getItem("otp");
    if (otpNumber === storedOtp) {
      console.log("OTP verified successfully");
      window.location.href = "/upload";
    } else {
      setErrorMessage("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="clock-section">
        <div className="clock">
          <div className="center-dot"></div>
          <div className="hand hour-hand" style={{ transform: `rotate(${(time.getHours() % 12) * 30}deg)` }}></div>
          <div className="hand minute-hand" style={{ transform: `rotate(${time.getMinutes() * 6}deg)` }}></div>
          <div className="hand second-hand" style={{ transform: `rotate(${time.getSeconds() * 6}deg)` }}></div>
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className="clock-number"
              style={{ transform: `rotate(${index * 30}deg) translate(0, -140px)` }}
            >
              <span style={{ transform: `rotate(${-index * 30}deg)` }}>
                {["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"][index]}
              </span>
            </div>
          ))}
        </div>
        
        <div className="digital-clock">
          <p>{formatTime(time)}</p>
        </div>
      </div>
      <div className="login-section">
        <div className="login-box">
          {
            otpSent ?<span style={{color:"yellow"}}>Check your email for OTP</span> :""
          }
          <h1>Kerala Police Academy</h1>
          <h2>Access Secured Storage</h2>
         
            {
              otpSent ? <>
                          <input
                              type="text"
                              placeholder="Enter OTP"
                              className="form-input"
                              value={otpNumber}
                              onChange={(e) => setOtp(e.target.value)}
                              required
                              style={{marginTop:'10px'}}
                            />
                            <button onClick={verifyOtp} className="otpBtn">Submit OTP</button>
                            {errorMessage && <div className="alert-box">{errorMessage}</div>}
              </>  :  <form className="login-form" onSubmit={handleLoginClick}>
            <input
              type="text"
              placeholder="Username"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="cta-button">Login</button>
          </form>
            }
        </div>
      </div>
      <div className="calendar-section">
        <h2 className="calendar-title">Today's Date</h2>
        <div className="calendar-box">{formatDate(time)}</div>
        <div className="calendar">
          <table>
            <thead>
              <tr>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {calendarGrid.map((week, index) => (
                <tr key={index}>
                  {week.map((day, idx) => (
                    <td
                      key={idx}
                      className={day === currentDay ? "highlight-date" : ""}
                    >
                      {day || ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


 
    </div>
  );
};

export default LoginPage;
