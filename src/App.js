import { useEffect, useState } from 'react';
import logo from './assets/logo.svg';
import './styling/App.css';
import volcano from './assets/volcano.png';


function App() {

  const [logged,setLogged] = useState(false);

  useEffect(()=>{ // 
    console.log("use effect has started");
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={volcano} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
