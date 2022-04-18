import { useEffect, useState } from 'react';
import './styling/App.css';
import volcano from './assets/volcano.png';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from './routes/LandingPage';
import VolcanoList from './routes/VolcanoList';
import IndividualVolcano from './routes/IndividualVolcano';
import Login from './routes/Login';
import Header from './components/Header';
import { ThemeProvider } from '@emotion/react';

function App() {
  const [loggedin, setLoggedin] = useState(false);
  const [token, setToken] = useState("");
  const header = Header;

  useEffect(() => {
    console.log("use effect has started");
  }, [])

  return (<div>

    <BrowserRouter>
      <div>
        {<Header loggedin={loggedin} />}
      </div>
      <Routes>
        <Route path="/" element={<LandingPage Header={Header} />} />
        <Route path="login" element={<Login />} />
        <Route path="volcanolist" element={<VolcanoList />} />
        <Route path="individualVolcano" element={<IndividualVolcano />} />
      </Routes>
    </BrowserRouter>
  </div>


  );
}

export default App;
