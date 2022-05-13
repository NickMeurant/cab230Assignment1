import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

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