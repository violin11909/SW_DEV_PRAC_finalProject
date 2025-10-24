import MyGoogleMap from "./MyGoogleMap";

const containerStyle = {
    width: "400px",
    height: "400px"
};

const center = {
    lat: 13.7563,
    lng: 100.5018
};

function GoogleMapContainer() {
    return (
        <MyGoogleMap></MyGoogleMap>
    );
}

export default GoogleMapContainer;