import React from 'react';

export default function HourlyForecast({list}) {
    return (
        <div className='p-4 glass mt-4'>
            <div className='flex gap-3 overflow-x-auto'>
                {list.slice(0, 12).map((i)=> (
                    <div key={i.dt} className='min-w-[80px] p-2 text-center bg-white/5 rounded-lg'>
                        <div className='text-sm'>{i.dt_txt.slice(11, 16)}</div>
                        <div className='text-lg font-bold'>{Math.round(i.main.temp)}°</div>
                    </div>
                ))}
            </div>
        </div>
    )
}