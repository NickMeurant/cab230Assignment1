import { useEffect } from "react";
import volcano from "../assets/volcano.png";

export default function LandingPage(props) {
  const header = props.Header
  useEffect(()=>{
    console.log("landing page");
  })
    return(
      <div>
        <div>
        {header}
        </div>
          <img src={volcano} className="App-logo" alt="logo" />
      </div>
    )
}