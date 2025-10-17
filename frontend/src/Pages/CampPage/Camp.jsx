import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";

import Book from "../BookPage/Book.jsx";

const Item = ({ icon, detail }) => (
  <li className="flex items-center space-x-3">
    <div className="w-7 aspect-square">
      <img src={icon} alt="icon" className="w-full h-full" />
    </div>
    <p>{detail}</p>
  </li>
);

const Header = ({ img, title }) => (
  <div className="w-full bg-[#224432] p-3 text-white rounded-t-sm flex flex-row gap-2">
    <div className="w-7 aspect-square">
      <img src={img} alt="icon" className="w-full h0full" />
    </div>
    <h2 className="text-lg font-semibold">{title}</h2>
  </div>
);

const ImageSlide = ({ camp, goToSlide, currentIndex }) => (
  <div className="lg:col-span-3 relative">
    <img
      src={camp.images[currentIndex]}
      alt="Camping"
      className="rounded-lg transition-transform duration-500 ease-in-out w-full h-full shadow-md"
    />
    {camp.images.length > 1 && (
      <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center space-x-2">
        {camp.images.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`
              w-3 h-3 rounded-full cursor-pointer transition-all duration-300
              ${
                currentIndex === slideIndex
                  ? "bg-white scale-110"
                  : "bg-white/50 hover:bg-white/75"
              }
            `}
          ></div>
        ))}
      </div>
    )}
  </div>
);

const Camp = ({ camp, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inbook, setInBook] = useState(false);
  const [checkInTime, setcheckInTime] = useState("");
  const [checkOutTime, setcheckOutTime] = useState("");

  const icon = {
    "./src/assets/money.png": `คืนละ ${camp.price} บาท/คน`,
    "./src/assets/pet.png": camp.petsAllowed
      ? "สัตว์เลี้ยงเข้าพักได้"
      : "ไม่อนุญาตสัตว์เลี้ยง",
    "./src/assets/clock.png": checkInTime,
    "./src/assets/clock.png": checkOutTime,
    "./src/assets/car.png": camp.parking ? "มีที่จอกรถ" : "ไม่มีที่จอกรถ",
    "./src/assets/group.png": `จำนวนผู้เข้าพักไม่เกิน ${camp.maxGuests} คน/วัน`,
    "./src/assets/call.png": camp.tel,
  };

  useEffect(() => {
    setcheckInTime(toTimeString(camp.startCheckIn + " - " + camp.endCheckIn));
    setcheckOutTime(toTimeString(camp.checkOutTime));
  }, []);

  const toTimeString = (time) => {
    const date = new Date(time);
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");

    return `${hour}:${minute}`;
  };

  const backToCampPage = () => {
    setInBook(false);
  };

  const goToBookPage = () => {
    setInBook(true);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  return (
    <div className="bg-gray-300 p-5 md:p-7 font-sans h-screen overflow-y-auto ">
      {inbook && <Book camp={camp} onBack={backToCampPage} />}
      {!inbook && (
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg px-10 py-3 relative">
          {/* Header Section */}
          <div className="p-6 py-4 pb-3 relative">
            <div
              className="top-3 left-[-30px] absolute hover:bg-gray-200 cursor-pointer rounded-full p-2"
              onClick={() => {
                onBack();
              }}
            >
              <FaArrowLeft size={30} />
            </div>
            <div className="flex flex-col justify-start">
              {/* Capm Name */}
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 px-2">
                {camp.name}
              </h1>

              <div className="flex flex-row gap-2 items-center">
                <img
                  src="https://iili.io/Kkde2wJ.md.png"
                  alt="mark"
                  className="w-8 h-8"
                />
                <p className="text-sm text-gray-900">
                  {camp.address} {camp.district} {camp.province}{" "}
                  {camp.postalcode}
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 pb-4">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Image */}
              <ImageSlide
                camp={camp}
                goToSlide={goToSlide}
                currentIndex={currentIndex}
              />

              <div className="lg:col-span-2 bg-white text-black shadow-md rounded-sm relative hover:scale-101 hover:shadow-black/40 ease-in-out transition duration-100">
                <Header img="./src/assets/data.png" title="ข้อมูล" />

                <ul className="grid grid-cols-2 lg:grid-cols-1 space-y-4 text-sm px-4 py-3">
                  {Object.entries(icon).map(([key, value], index) => (
                    <Item key={index} icon={key} detail={value} />
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Details  */}
          <div className="bg-white text-black mx-6 mb-2 rounded-sm shadow-md hover:scale-101  hover:shadow-black/40 ease-in-out transition duration-100">
            <Header img="./src/assets/info.png" title="รายละเอียด" />

            <p className="text-sm leading-relaxed p-4 pb-5">{camp.detail}</p>
          </div>

          {/* Button */}
          <div className="p-2 py-1 text-center ">
            <button
              className="bg-[#3A6F43] hover:bg-green-900 text-white font-bold py-3 w-1/3 mb-3 rounded-sm  cursor-pointer hover:scale-101  hover:shadow-black/40 ease-in-out transition duration-100"
              onClick={goToBookPage}
            >
              จองเลย
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Camp;
