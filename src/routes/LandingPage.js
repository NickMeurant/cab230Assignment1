import volcano from "../assets/volcano.jpg";
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import { customTheme } from "../utils/defines";

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
          Volcanoes of the World
        </p>
      </div>
      <div className="center-div">
        <img id="volcano" src={volcano} className="App-logo" alt="logo" />
      </div>
      <div>
      </div>
      <div className="center-div">
        <Box textAlign="center">
          <Button theme={customTheme} variant="contained" onClick={() => navigate("/volcanolist")}>Start Exploring</Button>
        </Box>
      </div>
    </div>
  )
}