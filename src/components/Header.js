import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import { Button } from '@mui/material';

export default function Header(props) {

    return (
        <AppBar>
            <Toolbar>
            <Button variant="contained">Home</Button>
            <Button variant="contained">VolcanoList</Button>
            <Button variant="contained">IndividualVolcano</Button>
            <Button variant="contained">{props.logged}</Button>
            </Toolbar>
        </AppBar>
    );
};