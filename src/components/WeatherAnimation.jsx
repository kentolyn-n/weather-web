import React from "react";
import Sunny from "./Sunny";
import BrokenClouds from "./BrokenCloud";
import ScatteredClouds from "./ScatteredCloud";
import OvercastClouds from "./OvercastCloud";
import LightRain from "./LightRain";
import HeavyRain from "./HeavyRain";    

export function WeatherAnimation({ description }) {

    return (
    <div className="fixed inset-0 pointer-events-none z-0">
        {description === "broken clouds" && <BrokenClouds description={description} />}
        {description === "scattered clouds" && <ScatteredClouds description={description} />}
        {description === "light rain" && <LightRain description={description} />}
        {description === "heavy rain" && <HeavyRain description={description} />}
        {description === "overcast clouds" && <OvercastClouds description={description} />}
        {(description === "clear sky" || description === "few clouds") && <Sunny description={description} />}
    </div>
    );
}