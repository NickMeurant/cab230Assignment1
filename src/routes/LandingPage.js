import volcano from "../assets/volcano.jpg";
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';

export default function LandingPage(props) {
  const header = props.Header
  const navigate = useNavigate();
  return (
    <div>
      <div>
        {header}
      </div>
      <div className="center-div">
        <p className="title">
          Welcome To Your One-Stop Volcano Info Shop
        </p>
      </div>
      <div className="center-div">
        <img id="volcano" src={volcano} className="App-logo" alt="logo" />
      </div>
      <div>
      
      </div>
      <div className="center-div">
        <Box textAlign="center">
          <Button color="grey" variant="contained" onClick={() => navigate("/volcanolist")}>Start Your Volcano Journey</Button>
        </Box>
      </div>
    </div>
  )
}