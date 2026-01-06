import React from 'react';

export default function WindCard( {speed, deg}) {

    let gradientClass;

    if (speed < 2) {
        gradientClass = 'from-green-400 to-lime-500';
    } else if (speed < 5) {
        gradientClass = 'from-yellow-400 to-orange-500';
    } else {
        gradientClass = 'from-red-400 to-pink-500';
    }
    return (
        <div className="p-4">
            <div className="flex flex-col items-center gap-3 max-w-sm mx-auto mt-10 bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-xl">
               <svg xmlns="http://www.w3.org/2000/svg" width="100" height="70" viewBox="0 0 24 24" fill="none" stroke="#80d42b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-fan-icon lucide-fan"><path d="M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z"/><path d="M12 12v.01"/></svg>
            <div className={`text-3xl font-bold bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>{speed} m/s</div>
                <div className={`text-3xl font-bold bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>{deg}°</div>
            </div>
        </div>
    )
}