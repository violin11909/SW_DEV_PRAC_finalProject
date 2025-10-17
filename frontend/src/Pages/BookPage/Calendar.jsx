import { use, useEffect, useState } from "react";

const ChevronLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5L8.25 12l7.5-7.5"
    />
  </svg>
);
const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 4.5l7.5 7.5-7.5 7.5"
    />
  </svg>
);

const Calendar = ({ date, setDate }) => {
  const months = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];
  const daysOfWeek = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];
  const [displayDate, setDisplayDate] = useState(date || new Date());

  useEffect(() => {
    if (date) {
      date.setHours(0, 0, 0, 0);
      setDisplayDate(date);
    }
  }, [date]);

  const year = displayDate.getFullYear();
  const month = displayDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setDisplayDate(new Date(year, month - 1, 1));
  };
  const handleNextMonth = () => {
    setDisplayDate(new Date(year, month + 1, 1));
  };
  const handleDayClick = (day) => {
    const selectedDate = new Date(year, month, day);
    setDate(selectedDate);
  };

  return (
    <div className="w-full max-w-sm mx-auto lg:mx-0">
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handlePrevMonth}
            className="p-1 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100"
          >
            <ChevronLeftIcon />
          </button>
          <h3 className="font-semibold text-lg text-gray-800">
            {months[month]} {year + 543}
          </h3>
          <button
            onClick={handleNextMonth}
            className="p-1 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100"
          >
            <ChevronRightIcon />
          </button>
        </div>
        <div className="grid grid-cols-7 text-center text-sm text-gray-500 mb-3">
          {daysOfWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 text-center text-sm">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`}></div>
          ))}

          {/* Map through the days of the month */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dayDate = new Date(year, month, day);
            const today = new Date();
            // Reset time to compare dates only
            today.setHours(0, 0, 0, 0);

            const isPast = dayDate < today;
            const isSelected =
              date &&
              dayDate.getFullYear() === date.getFullYear() &&
              dayDate.getMonth() === date.getMonth() &&
              dayDate.getDate() === date.getDate();

            let className =
              "py-2 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-100 transition-colors w-9 h-9 mx-auto";

            if (isPast) {
              className += " text-gray-300 cursor-not-allowed";
            } else if (isSelected) {
              className += " bg-red-500 text-white font-bold hover:bg-red-600";
            } else {
              className += " text-gray-700";
            }
            return (
              <div
                key={day}
                className={className}
                onClick={() => !isPast && handleDayClick(day)}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
