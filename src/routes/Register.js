import { Button } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {

  const [errorMessages, setErrorMessages] = useState({});

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "http://sefdb02.qut.edu.au:3001/user/register";
    try {
      const res = await axios.post(url, { email: email, password: password });
      alert("User Created Successfully");
      navigate("/");
    } catch (error) {
      alert("User Already Exists");
    }
  }

  return (
    <div className="center">
      <div className="center-text">
        <p className="center-p">Register</p>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Username </label>
            <input type="text" name="username" required onChange={(e) => setEmail(e.target.value)} />
            {renderErrorMessage("username")}
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" name="pass" required onChange={(e) => setPassword(e.target.value)} />
            {renderErrorMessage("pass")}
          </div>
          <div className="button-container">
            <Button color="grey" variant="contained" type="submit">Register</Button>
          </div>
        </form>
      </div>
    </div>
  )
}