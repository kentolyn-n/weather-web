import React from 'react';
import { CloudSun } from 'lucide-react';
function weekFormat(dt) {
   const date = new Date(dt * 1000);
   return new Intl.DateTimeFormat("en-US", { weekday: 'short', day:'numeric', month: 'numeric' }).format(date);
}

    export default function OneWeekForecast({list}) {
    const daily = list?.filter((_, i) => i % 8 === 0).slice(0, 5) || [];

    
    return (
        <div className='p-4 mt-6 rounded-2xl shadow-xl'>
            <div className='flex overflow-x-auto space-x-4 p-4 bg-white/10 rounded-full backdrop-blur-md rounded-xl'>
                {daily.map((day)=>
                    <div key={day.dt} className='flex flex-col items-center bg-white/90 backdrop-blur-sm p-2 rounded-lg min-w-[60px] overflow-hidden rounded-2xl shadow-xl justify-between w-[72px] h-[150px] flex-shrink-0'>
                        <p className='text-sm text-black'>{weekFormat(day.dt)}
                            <CloudSun className="w-5 h-5"/>{day.weather[0].description}
                        </p>
                        <p className='text-sm text-black'>{Math.round(day.main.temp)}°C</p>
                    </div>
                )}
            </div>

        </div>
    )
}