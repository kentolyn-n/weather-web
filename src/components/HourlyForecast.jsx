import React from "react";

function formatAMPM(dt) {
  let hours = dt.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;
  return `${hours} ${ampm}`;
}
export default function HourlyForecast({list}) {

  const hourly = list?.slice(0, 12) || [];

  return (
    <div className="p-4 mt-6 rounded-2xl shadow-xl">
    <div className="flex overflow-x-auto space-x-4 p-4 bg-white/10 rounded-full backdrop-blur-md rounded-xl">
      {hourly.map((hour) => {
        const date = new Date(hour.dt * 1000);
        const time = formatAMPM(date);

        return (
          <div
            key={hour.dt}
            className="flex flex-col items-center bg-white/90 backdrop-blur-sm p-2 rounded-lg min-w-[60px] overflow-hidden rounded-2xl shadow-xl"
          >
            <p className="text-sm text-black">{time}</p>
            <p className="text-sm text-black">{hour.main.temp}°C</p>
          </div>
        );
      })}
    </div>
    </div>
  );
}
