import { Map, Marker } from "pigeon-maps"

export const GenerateMap = (props,loggedin) => {
    return (
        <Map height={loggedin ? 500: 800} width={1500}
            defaultCenter={[parseFloat(props.latitude), parseFloat(props.longitude)]}
            defaultZoom={4}>
            <Marker width={50}
                anchor={[parseFloat(props.latitude), parseFloat(props.longitude)]}
            />
        </Map>
    )
}