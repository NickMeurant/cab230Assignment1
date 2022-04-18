import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function Header(props) {
    const navigate = useNavigate();

    const handleClick = route => {
        navigate(route);
    }

    return (
        <div>
            <AppBar position= "static ">
                <Toolbar>
                    <Button color="grey" variant="contained" onClick={() => handleClick("/")}>Home</Button>
                    <Button color="grey" variant="contained" onClick={() => handleClick("/volcanolist")}>VolcanoList</Button>
                    <Button color="grey" variant="contained" onClick={() => handleClick("/register")}>Register</Button>
                    <Button color="grey" variant="contained" onClick={() => handleClick("/login")}>{props.loggedin ? "logout" : "login"}</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};