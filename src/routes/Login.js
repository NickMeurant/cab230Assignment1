import { Button, FlatButton, ButtonBase, SubmitButton } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
    const loggedin = props.loggedin;
    let token = props.token;

    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = "http://sefdb02.qut.edu.au:3001/user/login";
        
        await axios.post(url, {"email": email, "password": password}).then(res => {
            if(res.status == 200){
                navigate("/");
                localStorage.setItem("token",res.data.token);
                props.setToken(res.data.token);
                props.setLoggedin(true);
            }
            else{
                alert("Username or password incorrect");
            }
        }).catch((error)=>{
            console.log(error);
        })
        console.log(token);
    }

    useEffect(()=>{
        if(loggedin){
            props.setLoggedin(false);
            props.setToken("");
            localStorage.clear("token");
            navigate("/");
        }
    },[])

    return (
        // if logged in == true, log user out
        // else promp sign in form
        <div className="center">
            <div className="center-text">Login</div>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Email</label>
                    <input type="text" name="username" required onChange={(e) => setEmail(e.target.value)} />
                    {renderErrorMessage("username")}
                </div>
                <div className="input-container">
                    <label>Password</label>
                    <input type="password" name="pass" required onChange={(e) => setPassword(e.target.value)} />
                    {renderErrorMessage("pass")}
                </div>
                <div className="button-container">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}