import axios from "axios";
import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { Button } from '@mui/material';
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import { useNavigate } from "react-router-dom";
import { Box, getThemeProps, height } from "@mui/system";

import Table from "../components/Table";

import { GenerateMap } from "../components/Map";
import { generateList } from "../components/GenerateList";
import { RetrivePopulation } from "../utils/helperFunctions";

import BarChart from "../components/Chart";


export default function VolcanoList(props) {
  const distances = [5, 30, 100];

  const [countries, setCountries] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState();
  const [distance, setDistance] = useState(distances[0]);

  const [volcanos, setVolcanos] = useState([]);
  const [volcanoInfo, setVolcanoInfo] = useState([]);

  const [viewing, setViewing] = useState(false);

  useEffect(() => {
    console.log(volcanoInfo);
  }, [volcanoInfo]);

  const GetCountries = async () => {
    const url = "http://sefdb02.qut.edu.au:3001/countries";
    await axios.get(url).then((res) => {
      setCountries(res.data);
    }).catch((error) => {
      console.log(error);
    })
  }

  const GetVolcanos = async () => {
    const url = "http://sefdb02.qut.edu.au:3001/volcanoes?country=Algeria"
      + "&populatedWithin=" + "5km";
    await axios.get(url).then((res) => {
      setVolcanos(res.data);
    }).catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => { // initial useEffect() called on page load
    GetCountries()
    GetVolcanos();
  }, [])

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
        loggedin = {props.loggedin}
        token={props.token}
        setViewing={setViewing}
        volcanoInfo={volcanoInfo}
        setVolcanoInfo={setVolcanoInfo}
      ></Table >
    )
  }
  else {
    if (props.loggedin) {
      return (
        <div className="volcanoDisplay">
          <div className="firstHalf">
            <div className="left-third">
              <Box sx={{ height: "100%" }}>
                <Button color="grey" variant="contained" onClick={() => handleBackPress()}>Back</Button>
                {generateList(volcanoInfo)}
              </Box>
            </div>
            <div className="left-twothirds">
              {GenerateMap(volcanoInfo)}
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
          <div className="left-third">
            <Button color="grey" variant="contained" onClick={() => handleBackPress()}>Back</Button>
            {generateList(volcanoInfo)}
          </div>
          <div className="left-twothirds">
          {GenerateMap(volcanoInfo)}
        </div>
        </div>
      )
    }
  }

}