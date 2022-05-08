import Chart from 'chart.js/auto'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Map, Marker } from "pigeon-maps"
import ListItemText from '@mui/material/ListItemText';

export const GenerateMap = (props) => {
    return (
        <Map height={500}
            defaultCenter={[parseInt(props.latitude), parseInt(props.longitude)]}
            defaultZoom={11}>
            <Marker width={50}
                color={`hsl(0deg 100% 50%)`}
                anchor={[parseInt(props.latitude), parseInt(props.longitude)]}
                onClick={() => <div><p>{props.name}</p></div>} />
        </Map>
    )
}


export const RetrivePopulation = (data) => {
    const dataArray = [];
    dataArray.push(data.population_5km);
    dataArray.push(data.population_10km);
    dataArray.push(data.population_30km);
    dataArray.push(data.population_100km);
    return dataArray;
}

export const generateList = (props) => {
    return (
        <List dense={false}>
            <ListItem>
                <ListItemText
                    primary={props.name}
                />
            </ListItem>
            <ListItem>
                <ListItemText
                    primary={"Country: " + props.country}
                />
            </ListItem>
            <ListItem>
                <ListItemText
                    primary={"Region: " + props.country}
                />
            </ListItem>
            <ListItem>
                <ListItemText
                    primary={"SubRegion: " + props.subregion}
                />
            </ListItem>
            <ListItem>
                <ListItemText
                    primary={"Last Eruption: " + props.last_eruption}
                />
            </ListItem>
            <ListItem>
                <ListItemText
                    primary={"Summit: " + props.summit}
                />
            </ListItem>
            <ListItem>
                <ListItemText
                    primary={"Elevation: " + props.elevation}
                />
            </ListItem>
        </List>
    )
}