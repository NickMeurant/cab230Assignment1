import * as React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './styling/App.css';
import volcano from './assets/volcano.png';
import LandingPage from './routes/LandingPage';
import VolcanoList from './routes/VolcanoList';
import IndividualVolcano from './routes/IndividualVolcano';
import Register from './routes/Register';
import Header from './components/Header';
import Login from './routes/Login';


function App() {
  const [loggedin, setLoggedin] = useState(false);
  const [token, setToken] = useState("");
  const [distance, setDistance] = useState(null);
  const [country, setCountry] = useState(null);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <div className='header'>
            {<Header loggedin={loggedin} />}
          </div>
          <div>
            <Routes>
              <Route path="/" element={<LandingPage
                loggedin={loggedin}
                setLoggedin={setLoggedin}
                token={token}
                setToken={setToken}
              />} />
              <Route path="login" element={<Login
                loggedin={loggedin}
                setLoggedin={setLoggedin}
                token={token}
                setToken={setToken}
              />} />
              <Route path="register" element={<Register
                loggedin={loggedin}
                setLoggedin={setLoggedin}
                token={token}
                setToken={setToken} />} />
              <Route path="volcanolist" element={<VolcanoList
                country={country}
                setCountry={setCountry}
                distance={distance}
                setDistance={setDistance}
                loggedin={loggedin}
                setLoggedin={setLoggedin}
                token={token}
                setToken={setToken} />} />
              <Route path="/individual" element={<IndividualVolcano
                loggedin={loggedin}
                setLoggedin={setLoggedin}
                token={token}
                setToken={setToken} />} />
            </Routes>

          </div>

        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
