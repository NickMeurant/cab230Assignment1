import { Map, Marker } from "pigeon-maps"

export const GenerateMap = (props) => {
    return (
        <div>
            <Map height={600}
                defaultCenter={[parseFloat(props.latitude), parseFloat(props.longitude)]}
                defaultZoom={11}>
                <Marker width={50}
                    color={`hsl(0deg 100% 50%)`}
                    anchor={[parseFloat(props.latitude), parseFloat(props.longitude)]}
                />
            </Map>
        </div>

    )
}