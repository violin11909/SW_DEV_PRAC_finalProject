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

const Calendar = () => {
  const monthName = "ตุลาคม 2025";
  const daysOfWeek = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];
  // เดือนตุลาคม 2025 เริ่มต้นวันพุธ (index 3 ถ้าวันอาทิตย์คือ 0)
  const firstDayOfMonth = 3;
  const daysInMonth = 31;
  const selectedDay = 14;

  return (
    <div className="w-full max-w-sm mx-auto lg:mx-0">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <button className="p-1 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100">
            <ChevronLeftIcon />
          </button>
          <h3 className="font-semibold text-lg text-gray-800">{monthName}</h3>
          <button className="p-1 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100">
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
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isPast = day < selectedDay;
            const isSelected = day === selectedDay;

            let className =
              "py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors";
            if (isPast) {
              className += " text-gray-300 cursor-not-allowed";
            } else {
              className += " text-gray-700";
            }
            if (isSelected) {
              className = " py-2 rounded-lg text-red-500 font-bold";
            }

            return (
              <div key={day} className={className}>
                {day}
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-red-500 text-sm mt-4">
        กรุณาเลือกวันเข้าพัก (Check-in)
      </p>
    </div>
  );
};
export default Calendar;
