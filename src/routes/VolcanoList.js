import axios from "axios";
import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "ag-grid-community/dist/styles/ag-grid.css";


export default function VolcanoList() {
  const distances = [5, 30, 100]

  const [countries, setCountries] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [distance, setDistance] = useState(distances[0]);

  const [volcanos, setVolcanos] = useState([]);
  const gridRef = useRef();


  const [columnDefs] = useState([
    { headerName: "Country", field: 'country' },
    { headerName: "Name", field: 'name' },
    { headerName: "Region", field: 'region' },
    { headerName: "SubRegion", field: 'subregion' },
  ]);

  const GetCountires = async () => {
    const url = "http://sefdb02.qut.edu.au:3001/countries";
    await axios.get(url).then((res) => {
      // console.log(res.data);
      return setCountries(res.data);
    }).catch((error) => {
      console.log(error);
    })
  }

  const GetVolcanos = async () => {
    const url = "http://sefdb02.qut.edu.au:3001/volcanoes?country=Chile"
      + "&populatedWithin=" + distance + "km";
    await axios.get(url).then((res) => {
      // console.log(res.data);
      return setVolcanos(res.data);
    }).catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => { // initial useEffect() called on page load
    console.log("Volcano UseEffect");
    GetCountires().then(() => {
      GetVolcanos();
    })
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "http://sefdb02.qut.edu.au:3001/volcanoes?country=" + selectedCountry +
      "&populatedWithin=" + distance+ "km";
      await axios.get(url).then((res) => {
        return setVolcanos(res.data);
      })
  }

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById('filter-text-box').value
    );
  }, []);


  return (
    <div id="myGrid" class="ag-theme-alpine-dark" style={{ height: "600px", width: "80%" }}>
      <div className="example-header">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="filter-text-box"
            placeholder="Filter..."
            onInput={onFilterTextBoxChanged}
          />
          <label for="country">Select a country</label>
          <select name="country" id="country" onChange={(e) => setSelectedCountry(e.target.value)}>
            {countries.map((data) =>
              <option value={data}>{data}</option>)}
          </select>
          <label for="distance">Select Distance</label>
          <select name="distance" id="distance" onChange={(e) => setDistance(e.target.value)}>
            {distances.map((data) =>
              <option value={data}>{data}</option>)}
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