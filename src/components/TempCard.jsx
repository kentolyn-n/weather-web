import React from 'react';

export default function TempCard( {temp, feels}) {
    let gradientClass;

    if (temp < 0) {
        gradientClass = 'from-blue-400 to-cyan-500';
    } else if (temp < 20) {
        gradientClass = 'from-green-400 to-lime-500';
    } else {
        gradientClass = 'from-red-400 to-pink-500';
    }
    return (
        <div className='p-4'>
            <div className="flex flex-col items-center gap-3 max-w-sm mx-auto mt-10 bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
            <div className="flex w-full h-10 items-center bg-white/10 rounded-full overflow-hidden mt-10 rounded-2xl shadow-xl">
                <div
            style={{ width: `${Math.min(100, Math.max(0, (temp + 30) / 1.2))}%` }}
                className="h-full bg-white/40 bg-gradient-to-r from-yellow-400 to-red-500"
                />
            </div>
            <div className='flex items-end gap-3 mt-4'>
                <div className={`text-4xl font-bold bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>{Math.round(temp)}°C</div>
                <div className={`text-sm font-bold bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>feels {Math.round(feels)}°</div>
            </div>
            </div>
        </div>
    )
}