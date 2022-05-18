import { Map, Marker } from "pigeon-maps"

export const GenerateMap = (props) => {
    return (
        <Map height={600} width={1000}
            defaultCenter={[parseFloat(props.latitude), parseFloat(props.longitude)]}
            defaultZoom={11}>
            <Marker width={50}
                anchor={[parseFloat(props.latitude), parseFloat(props.longitude)]}
            />
        </Map>
    )
}