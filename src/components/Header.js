import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import { Button } from '@mui/material';
import {useNavigate } from "react-router-dom";

export default function Header(props) {
    const navigate = useNavigate();

    const handleClick = route =>{
        navigate(route);
    }
    return (
        <AppBar>
            <Toolbar>
            <Button variant="contained" onClick={() => handleClick("/")}>Home</Button>
            <Button variant="contained" onClick={() => handleClick("/volcanolist")}>VolcanoList</Button>
            <Button variant="contained" onClick={() => handleClick("/individualVolcano")}>IndividualVolcano</Button>
            <Button variant="contained" onClick={() => handleClick("/login")}>{props.loggedin ? "login" : "logout"}</Button>
            </Toolbar>
        </AppBar>
    );
};