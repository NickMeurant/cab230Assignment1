import { Button, FlatButton, ButtonBase, SubmitButton  } from '@mui/material';
import axios from 'axios';
import {useState} from 'react';

export default function Register(props) {
  const loggedin = props.loggedin;
  const token = props.token;

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const renderErrorMessage = (name) =>
  name === errorMessages.name && (
    <div className="error">{errorMessages.message}</div>
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "http://sefdb02.qut.edu.au:3001/user/register";
    await axios.post(url,{"email":email,"password":password}).then((res) =>{
      console.log(res);
    }).catch((error)=>{
      alert("User Already Exists");
    })
  }

  return (
    // if logged in == true, log user out
    // else promp sign in form
    <div className="center">
    <div className="center-text">Register</div>
     <form onSubmit={handleSubmit}>
       <div className="input-container">
         <label>Username </label>
         <input type="text" name="username" required onChange={(e) => setEmail(e.target.value)}/>
         {renderErrorMessage("username")}
       </div>
       <div className="input-container">
         <label>Password </label>
         <input type="password" name="pass" required onChange={(e) => setPassword(e.target.value)}/>
         {renderErrorMessage("pass")}
       </div>
       <div className="button-container">
         <button type="submit">Register</button>
       </div>
     </form>
   </div>
  )
}