import MyGoogleMap from './Pages/GoogleMap/MyGoogleMap'; 

const containerStyle = {
  width: "400px",
  height: "400px"
};

const center = {
  lat: 13.7563, // พิกัดกรุงเทพ
  lng: 100.5018
};

function App() {

  return (
    <>
     <MyGoogleMap></MyGoogleMap>
     
    </>
  )
}

export default App
