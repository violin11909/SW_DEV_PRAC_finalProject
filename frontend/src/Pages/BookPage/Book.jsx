import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import Calendar from './Calendar';


const InfoInput = ({ label, placeholder, isRequired = false }) => (
  <div className="mb-6">
    <label className="block text-base font-medium text-gray-800 mb-2">
      {label} {isRequired && <span className="text-red-500">*</span>}
    </label>
    <input
      type="text"
      placeholder={placeholder}
      className="w-full lg:w-7/8 px-4 py-2.5 bg-white border border-green-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors placeholder-gray-400"
    />
  </div>
);

const Book = ({ camp }) => {
  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center p-4 font-sans">
      <div className="w-full max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-sm">
        {/* head */}
        <div className="flex flex-row w-full gap-5 items-center justify-center relative p-5 mb-5">
          <div
            className="hover:bg-gray-200 cursor-pointer rounded-full p-2 absolute left-[-20px] top-[-5px] lg:left-0 lg:top-5"
            onClick={() => {
              onBack();
            }}
          >
            <FaArrowLeft className="lg:w-10 lg:h-10 md:w-8 md:h-8  w-6 h-6" />
          </div>
          <div className="flex flex-row items-center justify-center">
            <img
              src="https://i.postimg.cc/HL2jYJDc/camping-tent.png"
              alt="Camping Logo"
              className="lg:w-16 w-12 md:w-14 aspect-square rounded-full mr-4 border-2 border-white shadow-md"
            />

            <h1 className="text-xl lg:text-3xl md:text-2xl font-bold text-gray-800">
              {camp.name}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-5">
          {/* Date*/}
          <div className="lg:pl-10">
            <div className="text-gray-800 mb-5 font-semibold text-xl">
              เลือกวันที่ต้องการเข้าพัก
            </div>

            <Calendar />
          </div>

          {/* Info */}
          <div>
            <div className="text-gray-800 mb-5 font-semibold text-xl">
              ข้อมูล
            </div>

            <InfoInput
              label="ชื่อ-นามสกุล"
              placeholder="กรุณากรอก ชื่อ-นามสกุล"
              isRequired={true}
            />
            <InfoInput
              label="เบอร์โทรศัพท์"
              placeholder="กรุณากรอก เบอร์โทรศัพท์ "
              isRequired={true}
            />

            <InfoInput
              label="จำนวนผู้เข้าพัก"
              placeholder="กรุณากรอกข้อมูล"
              isRequired={true}
            />
          </div>
        </div>

        <div className="w-full flex justify-center">
          <button className="p-4 px-10 text-xl bg-teal-400 text-black rounded-[3px] font-semibold cursor-pointer hover:bg-teal-300">
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
};

export default Book;
