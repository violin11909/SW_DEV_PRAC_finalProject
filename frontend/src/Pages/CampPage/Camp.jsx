import { useEffect, useState } from "react";
import {
  FaPhoneAlt,
  FaUserFriends,
  FaClock,
  FaDollarSign,
  FaParking,
  FaPaw,
  FaInfoCircle,
} from "react-icons/fa";

import { FaArrowLeft } from "react-icons/fa6";
import { LuMousePointerClick } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

import Book from "../BookPage/Book.jsx";

const Camp = ({ camp, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inbook, setInBook] = useState(false);

  const navigate = useNavigate();

  const goToBookPage = () => {
    setInBook(true);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="bg-gray-50 h-screen overflow-y-auto font-sans p-4 sm:p-6 lg:p-8">
      {inbook && <Book camp={camp}/>}
      {!inbook && (
        <div className="max-w-7xl mx-auto ">
          <main className="lg:flex lg:space-x-8">
            <div className="lg:w-2/3 w-full">
              {/* Title */}
              <div className="flex items-center justify-center mb-6 relative">
                <div
                  className="top-0 left-0 absolute hover:bg-gray-200 cursor-pointer rounded-full p-2"
                  onClick={() => {
                    onBack();
                  }}
                >
                  <FaArrowLeft size={40} />
                </div>

                <img
                  src="https://i.postimg.cc/HL2jYJDc/camping-tent.png"
                  alt="Camping Logo"
                  className="w-16 h-16 rounded-full mr-4 border-2 border-white shadow-md"
                />

                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  {camp.name}
                </h1>
              </div>

              {/* Details */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold text-[#4C763B] border-b pb-2 mb-4">
                  รายละเอียด
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>{camp.description}</p>
                </div>
              </div>

              {/* Info */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-[#4C763B] border-b pb-2 mb-4">
                  ข้อมูลสำคัญ
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-gray-800">
                  <InfoItem
                    icon={<FaDollarSign />}
                    title={camp.details.price}
                  />
                  <InfoItem
                    icon={<FaUserFriends />}
                    title={camp.details.limit}
                  />
                  <InfoItem icon={<FaClock />} title={camp.details.checkin} />
                  <InfoItem icon={<FaClock />} title={camp.details.checkout} />
                  <InfoItem icon={<FaParking />} title={camp.details.more} />
                  <InfoItem icon={<FaPaw />} title={camp.details.pet} />
                </div>
              </div>
            </div>

            <aside className="lg:w-1/3 w-full mt-8 lg:mt-0 space-y-4 ">
              {/* Picture */}
              <div className="relative w-full rounded-lg overflow-hidden mt-20">
                <img
                  src={camp.images[currentIndex]}
                  alt="Camping"
                  className="rounded-lg transition-transform duration-500 ease-in-out"
                />

                {/* Dot pic */}
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
              </div>

              {/* Booking */}
              <div className="bg-white p-4 rounded-lg shadow-md mb-6 space-y-1.5 ">
                <h3 className="font-semibold text-gray-800 mb-3">
                  ติดต่อแคมป์
                </h3>
                <button className="w-full bg-[#73C8D2] hover:bg-[#538f96] text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition">
                  <FaPhoneAlt className="mr-2" />
                  โทร +66803296644
                </button>

                <button className="w-full bg-[#4C763B] hover:bg-[#4C763B]/80 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition cursor-pointer" onClick={goToBookPage()}>
                  <LuMousePointerClick className="text-white" size={25} />
                  จองเลย
                </button>
              </div>

              <div className="flex items-start text-sm text-gray-500">
                <FaInfoCircle className="mr-2 mt-0.5 shrink-0" />
                <p>ข้อมูลอาจมีการเปลี่ยนแปลงตลอดเวลา</p>
              </div>
            </aside>
          </main>
        </div>
      )}
      ;
    </div>
  );
};

const InfoItem = ({ icon, title, subtitle }) => (
  <div className="flex items-start">
    <div className="text-2xl text-gray-500 mr-4 mt-1">{icon}</div>
    <div>
      <p className="font-semibold">{title}</p>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  </div>
);

export default Camp;
