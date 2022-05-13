import { useEffect } from "react";
import volcano from "../assets/volcano.jpg";

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
        <div className="center-div">
        <p className="title">
        Welcome To Your One-Stop Volcano Info Shop
        </p>
        </div>
        <div className="center-div">
        <img src={volcano} className="App-logo" alt="logo" />
        </div>
      </div>
    )
}