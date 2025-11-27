import React from 'react';

function groupByDay(list) {
    const map = new Map();
    for (const item of list) {
        const day = item.dt_txt.slice(0, 10);

        if (!map.has(day)) map.set (day, []);
        map.get(day).push(item)
    }
    return Array.from(map.entries()).slice(0, 5).map(([day, arr])=> ({day, items: arr}));
} 

export default function FiveDaysForecast({list}) {
    const days = groupByDay(list);
    return (
        <div className='p-4 glass'>
            <div className='grid grid-cols-5 gap-2'>
                {days.map((d)=> {
                    const temps = d.items.map((i)=> i.main.temp);
                    const minTemp = Math.min(...temps);
                    const maxTemp = Math.max(...temps);

                    return (
                        <div key={d.day} className='p-2 text-center'>
                            <div className='text-xs'>{d.day.slice(5)}</div>
                            <div className='text-sm'>{maxTemp} / {minTemp}°C </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}