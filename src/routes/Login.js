import { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";

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
                const currentDate = new Date();
                const tokenInfo = {token: res.data.token,expire:currentDate.getTime() + res.data.expires_in * 1000} // sets timeout 86400 secs ahead of current time
                localStorage.setItem("token",JSON.stringify(tokenInfo));
                props.setToken(res.data.token);
                props.setLoggedin(true);
                navigate("/");
            }
            else{
                alert("Username or password incorrect");
            }
        }).catch((error)=>{
            alert("Username or password incorrect");
            console.log(error);
        })
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
            <div className="center-text">Login
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
                    <Button variant="contained" color="grey" type="submit">Login</Button>
                </div>
            </form>
            </div>
        </div>
    )
}