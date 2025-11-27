import React from 'react';
import { Wind } from "lucide-react";

export default function WindCard( {speed}) {
    return (
        <div className='p-4 glass'>
            <div className='flex items-center gap-3 mt-4'>
                <Wind className='w-10 h-10'/>
                <div className='text-3xl font-bold'>{speed} m/s</div>
                
            </div>
        </div>
    )
}