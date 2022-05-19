import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function Header(props) {
    const navigate = useNavigate();
    console.log(window.location.pathname);
    return (
        <div>
            <AppBar position= "static">
                <Toolbar>
                    <Button color="grey" variant="contained" onClick={() => navigate("/")}>Home</Button>
                    <Button color="grey" variant="contained" onClick={() => window.location.pathname == "/volcanolist" ? 
                    window.location.reload() : navigate("/volcanolist") }>VolcanoList</Button>
                    <Button color="grey" variant="contained" onClick={() => navigate("/register")}>Register</Button>
                    <Button color="grey" variant="contained" onClick={() => navigate("/login")}>{props.loggedin ? "logout" : "login"}</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};