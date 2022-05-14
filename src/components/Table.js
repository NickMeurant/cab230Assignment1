import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import axios from "axios";

export default function Table(props) {
  const gridRef = useRef();

  const distances = [5, 30, 100];
  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "http://sefdb02.qut.edu.au:3001/volcanoes?country=" + props.selectedCountry +
      "&populatedWithin=" + props.distance + "km";
    await axios.get(url).then((res) => {
      props.setVolcanos(res.data);
    })
  }

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById('filter-text-box').value
    );
  }, []);

  const columnDefs = [
    { headerName: "Name", field: 'name'},
    { headerName: "Country", field: 'country' },
    { headerName: "Region", field: 'region' },
    { headerName: "SubRegion", field: 'subregion' },
  ];

  const HandleButtonClick = async (value) => {
    const volcanoId = props.volcanos.filter(volcano => volcano.name == value.data.name);
    const url = "http://sefdb02.qut.edu.au:3001/volcano/" + volcanoId[0].id;

    if (props.loggedin) {
      await axios.get(url, {
        headers: {
          'Authorization': "Bearer " + props.token
        }
      }).then((res) => {
        props.setVolcanoInfo(res.data);
      })
    }
    else {
      await axios.get(url).then((res) => {
        props.setVolcanoInfo(res.data);
      })
    }
    props.setViewing(true);
  }

  return (
    <div className="center-div">
    <div id="myGrid" className="ag-theme-alpine-dark" style={{ height: "600px", width: "100%" }}>
      <div className="example-header">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="filter-text-box"
            placeholder="Filter..."
            onInput={onFilterTextBoxChanged}
          />
          <label>Select a country</label>
          <select name="country" id="country" value={props.selectedCountry} onChange={(e) => props.setSelectedCountry(e.target.value)}>
            {props.countries.map((data) =>
              <option value={data} selected={data == props.selectedCountry ? true : false}>{data}</option>)}
          </select>
          <label>Select Distance</label>
          <select name="distance" id="distance" onChange={(e) => props.setDistance(e.target.value)}>
            {distances.map((data) =>
              <option value={data} selected={data == props.distance ? true : false}>{data} </option>)}
          </select>
          <button type="submit">Search</button>
        </form>
      </div>
      <AgGridReact
        rowData={props.volcanos}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        ref={gridRef}
        cacheQuickFilter={true}
        onRowClicked={(row) => HandleButtonClick(row)}>
      </AgGridReact>
    </div>
    </div>
    
  )
}