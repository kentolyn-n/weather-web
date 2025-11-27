import React from 'react';

export default function TempCard( {temp, feels}) {
    return (
        <div className='p-4 glass'>
            <div className="mt-3 h-3 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                style={{ width: `${Math.min(100, Math.max(0, (temp + 30) / 1.2))}%` }}
                className="h-full bg-white/40"
                />
            </div>
            <div className='flex items-end gap-3 mt-4'>
                <div className='text-4xl font-bold'>{Math.round(temp)}°C</div>
                <div className='text-sm text-grey-600 dark:text-grey-300'>feels {Math.round(feels)}°</div>
            </div>
        </div>
    )
}