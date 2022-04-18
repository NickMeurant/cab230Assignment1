import * as React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './styling/App.css';
import volcano from './assets/volcano.png';
import LandingPage from './routes/LandingPage';
import VolcanoList from './routes/VolcanoList';
import IndividualVolcano from './routes/IndividualVolcano';
import Login from './routes/Login';
import Header from './components/Header';


function App() {
  const [loggedin, setLoggedin] = useState(false);
  const [token, setToken] = useState("");

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <div>
        <ThemeProvider theme={darkTheme}>
          <BrowserRouter>
            <div>
              {<Header loggedin={loggedin} />}
            </div>
            <div>
              <Routes>
                <Route path="/" element={<LandingPage Header={Header} />} />
                <Route path="login" element={<Login token={token} loggedin={loggedin} />} />
                <Route path="volcanolist" element={<VolcanoList />} />
                <Route path="individualVolcano" element={<IndividualVolcano />} />
              </Routes>
            </div>

          </BrowserRouter>
        </ThemeProvider>
    </div>
  );
}

export default App;
