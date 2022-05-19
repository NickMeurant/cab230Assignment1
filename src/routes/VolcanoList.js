import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from '@mui/material';
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import { Box } from "@mui/system";

import Table from "../components/Table";

import { GenerateMap } from "../components/Map";
import { generateList } from "../components/GenerateList";
import { RetrivePopulation } from "../utils/helperFunctions";
import { customTheme } from "../utils/defines";

import BarChart from "../components/Chart";

export default function VolcanoList(props) {
  const distances = [5, 30, 100];

  const [countries, setCountries] = useState([]);


  const [selectedCountry, setSelectedCountry] = useState();
  const [distance, setDistance] = useState(distances[0]);

  const [volcanos, setVolcanos] = useState([]);
  const [volcanoInfo, setVolcanoInfo] = useState([]);

  const [viewing, setViewing] = useState(false);

  const [loaded, setLoaded] = useState(false);

  const GetCountries = async () => {
    try {
      let url = "http://sefdb02.qut.edu.au:3001/countries";
      let response = await axios.get(url);
      setCountries(response.data);
      setSelectedCountry(response.data[0]);
      setLoaded(true);
    } catch (error) {
      console.log("Something went wrong " + error);
    }
  }

  const GetVolcanos = async () => {
    try {
      const url = "http://sefdb02.qut.edu.au:3001/volcanoes?country=" + countries[0]
        + "&populatedWithin=5km";
      const response = await axios.get(url);
      setVolcanos(response.data);
    } catch (error) {
      console.log("Something went wrong " + error);
    }
  }

  useEffect(() => { // initial useEffect() called on page load
    GetCountries();
  }, [])

  useEffect(() => {
    if (loaded) {
      GetVolcanos();
    }
  }, [countries])

  const handleBackPress = () => {
    setViewing(false);
  };

  if (!viewing) {
    return (
      <Table
        setDistance={setDistance}
        distance={distance}
        setSelectedCountry={setSelectedCountry}
        selectedCountry={selectedCountry}
        countries={countries}
        volcanos={volcanos}
        setVolcanos={setVolcanos}
        loggedin={props.loggedin}
        token={props.token}
        setViewing={setViewing}
        volcanoInfo={volcanoInfo}
        setVolcanoInfo={setVolcanoInfo}
      ></Table>
    )
  }
  else {
    if (props.loggedin) {
      return (
        <div className="volcanoDisplay">
          <div className="firstHalf">
            <div className="left-third">
              <Box sx={{ height: "100%" }}>
                <Button theme={customTheme} variant="contained" onClick={() => handleBackPress()}>Back</Button>
                {generateList(volcanoInfo)}
              </Box>
            </div>
            <div className="left-twothirds">
              {GenerateMap(volcanoInfo, props.loggedin)}
            </div>
          </div>
          <div className="bottom">
            <div className="chart">
              <BarChart data={RetrivePopulation(volcanoInfo)}></BarChart>
            </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="volcanoDisplay">
          <div className="firstHalf">
            <div className="left-third">
              <Box sx={{ height: "100%" }}>
                <Button theme={customTheme} variant="contained" onClick={() => handleBackPress()}>Back</Button>
                {generateList(volcanoInfo)}
              </Box>
            </div>
            <div>
              {GenerateMap(volcanoInfo, props.loggedin)}
            </div>
          </div>
        </div>
      )
    }
  }
}