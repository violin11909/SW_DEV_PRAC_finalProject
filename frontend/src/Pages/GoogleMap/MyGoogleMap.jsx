import { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import "../../index.css";
import Camp from "../CampPage/Camp.jsx";
import { campdata } from "../CampPage/CampData.jsx";

const containerStyle = {
  width: "100%",
  height: "100vh",
};
// ตำแหน่งเริ่มต้นของแผนที่ (ตัวอย่าง: กรุงเทพมหานคร)
const center = {
  lat: 13.7563,
  lng: 100.5018,
};

function MyGoogleMap() {
  const [campgrounds, setCampgrounds] = useState(campdata);
  const [showDetail, setShowDetail] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDdAmHuKvXQCnc-UP69yOPHyvRXezi4SGU",
  });

  const infoOpen = (name) => {
    setCampgrounds(
      campgrounds.map((i) => (i.name == name ? { ...i, show: true } : i))
    );
  };

  const infoClose = (name) => {
    setCampgrounds(
      campgrounds.map((i) => (i.name == name ? { ...i, show: false } : i))
    );
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6}>
      {campgrounds.map((camp, index) => (
        <Marker
          key={index}
          position={{ lat: camp.lat, lng: camp.lng }}
          onClick={() => {
            setShowDetail(true);
            console.log("test");
          }}
          onMouseOver={() => infoOpen(camp.name)}
          onMouseOut={() => infoClose(camp.name)}
        >
          {camp.show && (
            <InfoWindow position={{ lat: camp.lat, lng: camp.lng }}>
              <div className="flex flex-col justify-center items-center p-2 gap-2">
                <h3 className="font-bold text-[18px]">{camp.name}</h3>
                <span className="text-[#05339C]">
                  คลิกเพื่อดูรายละเอียดเพิ่มเติม
                </span>
              </div>
            </InfoWindow>
          )}

          {showDetail && (
            <div className="fixed inset-0 bg-white">
              <Camp camp={camp} onBack={() => setShowDetail(false)} />
            </div>
          )}
        </Marker>
      ))}
    </GoogleMap>
  );
}

export default MyGoogleMap;
