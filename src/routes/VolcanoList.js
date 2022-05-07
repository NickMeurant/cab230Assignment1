import axios from "axios";
import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import { Button } from '@mui/material';
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import { useNavigate } from "react-router-dom";
import { Box, getThemeProps, height } from "@mui/system";
import Chart from 'chart.js/auto'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Map, Marker } from "pigeon-maps"
import { sizing } from '@mui/system';
import { stamenToner } from 'pigeon-maps/providers'

import BarChart from "../components/Chart";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { green, red } from "@mui/material/colors";


export default function VolcanoList(props) {
  const distances = [5, 30, 100];

  const [countries, setCountries] = useState([]);

  const [loading, setLoading] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState();
  const [distance, setDistance] = useState(distances[0]);

  const [volcanos, setVolcanos] = useState([]);
  const [volcanoInfo, setVolcanoInfo] = useState([]);

  const gridRef = useRef();

  const [viewing, setViewing] = useState(false);

  const navigate = useNavigate();

  const HandleButtonClick = async (value) => {
    const volcanoId = volcanos.filter(volcano => volcano.name == value);
    const url = "http://sefdb02.qut.edu.au:3001/volcano/" + volcanoId[0].id;

    if (props.loggedin) {
      await axios.get(url, {
        headers: {
          'Authorization': "Bearer " + props.token
        }
      }).then((res) => {
        setVolcanoInfo(res.data);
      })
    }
    else {
      await axios.get(url).then((res) => {
        setVolcanoInfo(res.data);
      })
    }
    setViewing(true);
  }

  useEffect(() => {
    console.log(volcanoInfo);
  }, [volcanoInfo]);

  const columnDefs = [
    {
      headerName: "Name", field: 'name', cellRenderer:
        (params) => <Button color="grey" variant="contained"
          onClick={() => HandleButtonClick(params.value)}>
          {params.value}</Button>
    },
    { headerName: "Country", field: 'country' },
    { headerName: "Region", field: 'region' },
    { headerName: "SubRegion", field: 'subregion' },
  ];

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
    console.log("Volcano UseEffect");
    GetCountries()
    GetVolcanos();
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "http://sefdb02.qut.edu.au:3001/volcanoes?country=" + selectedCountry +
      "&populatedWithin=" + distance + "km";
    await axios.get(url).then((res) => {
      setVolcanos(res.data);
    })
  }

  const handleBackPress = () => {
    setViewing(false);
  };

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById('filter-text-box').value
    );
  }, []);

  const generateList = () => {
    return (
      <List dense={false}>
        <ListItem>
          <ListItemText
            primary={volcanoInfo.name}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={"Country: " + volcanoInfo.country}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={"Region: " + volcanoInfo.country}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={"SubRegion: " + volcanoInfo.subregion}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={"Last Eruption: " + volcanoInfo.last_eruption}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={"Summit: " + volcanoInfo.summit}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={"Elevation: " + volcanoInfo.elevation}
          />
        </ListItem>
      </List>
    )
  }

  const GenerateMap = () => {
    return (
      <Map height={500} 
      defaultCenter={[parseInt(volcanoInfo.latitude), parseInt(volcanoInfo.longitude)]} 
      defaultZoom={11}>
        <Marker width={50}
          color={`hsl(0deg 100% 50%)`}
          anchor={[parseInt(volcanoInfo.latitude), parseInt(volcanoInfo.longitude)]}
          onClick={() => <div><p>{volcanoInfo.name}</p></div>} />
      </Map>
    )
  }

  const RetrivePopulation = (data) => {
    const dataArray = [];
    dataArray.push(data.population_5km);
    dataArray.push(data.population_10km);
    dataArray.push(data.population_30km);
    dataArray.push(data.population_100km);
    return dataArray;
  }

  if (!viewing) {
    return (
      <div id="myGrid" className="ag-theme-alpine-dark" style={{ height: "600px", width: "80%" }}>
        <div className="example-header">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="filter-text-box"
              placeholder="Filter..."
              onInput={onFilterTextBoxChanged}
            />
            <label>Select a country</label>
            <select name="country" id="country" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
              {countries.map((data) =>
                <option value={data} selected={data == selectedCountry ? true : false}>{data}</option>)}
            </select>
            <label>Select Distance</label>
            <select name="distance" id="distance" onChange={(e) => setDistance(e.target.value)}>
              {distances.map((data) =>
                <option value={data} selected={data == distance ? true : false}>{data} </option>)}
            </select>
            <button type="submit">Search</button>
          </form>
        </div>
        <AgGridReact
          rowData={volcanos}
          columnDefs={columnDefs}
          pagination={true}
          ref={gridRef}
          cacheQuickFilter={true}>
        </AgGridReact>
      </div>
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
                {generateList()}
              </Box>
            </div>
            <div className="left-twothirds">
                {GenerateMap()}
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
        <div>
          <div className="left-third">
            <Button color="grey" variant="contained" onClick={() => handleBackPress()}>Back</Button>
            {generateList()}
          </div>
          <div className="left-twothirds">
            <p>div inside div</p>
          </div>
        </div>
      )
    }
  }

}