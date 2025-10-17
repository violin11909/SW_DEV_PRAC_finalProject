import { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import "../../index.css";
import Camp from "../CampPage/Camp.jsx";
import { getCampgrounds } from "../../service/campService.js";

const containerStyle = {
  width: "100%",
  height: "100vh",
};
// ตำแหน่งเริ่มต้นของแผนที่ (กรุงเทพมหานคร)
const center = {
  lat: 13.7563,
  lng: 100.5018,
};

function MyGoogleMap() {
  const [campgrounds, setCampgrounds] = useState([]);
  const [onMouseOverIndex, setOnMouseOverIndex] = useState(null);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    getAllCampData();
  }, []);

  const getAllCampData = async () => {
    const allCampgrounds = await getCampgrounds();
    setCampgrounds(allCampgrounds.data);
    console.log("getCampgrounds() result:", allCampgrounds.data);

    return allCampgrounds;
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDdAmHuKvXQCnc-UP69yOPHyvRXezi4SGU",
  });

  const infoOpen = (index, camp) => {
    setOnMouseOverIndex(index);
    setSelectedCamp(camp);
  };

  const infoClose = () => {
    setOnMouseOverIndex(null);
  };

  const openDetail = () => {
    setShowDetail(true);
  };
  const closeDetail = () => {
    setShowDetail(false);
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
          onClick={openDetail}
          onMouseOver={() => infoOpen(index, camp)}
          onMouseOut={infoClose}
        >
          {index == onMouseOverIndex && (
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
              <Camp camp={selectedCamp} onBack={closeDetail} />
            </div>
          )}
        </Marker>
      ))}
    </GoogleMap>
  );
}

export default MyGoogleMap;
