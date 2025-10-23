import {Outlet} from "react-router-dom";
import MyGoogleMap from './Pages/GoogleMap/MyGoogleMap'; 
import Header from './Components/Header';

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
      <Header/>
      {/* <MyGoogleMap></MyGoogleMap> */}
      <Outlet/>
    </>
  )
}

export default App
