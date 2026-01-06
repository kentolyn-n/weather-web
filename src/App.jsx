import React, { useState, useEffect } from 'react'
import { Moon, Sun, CloudSun } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import SearchBar from './components/SearchBar'
import TempCard from './components/TempCard'
import WindCard from './components/WindCard'
import OneWeekForecast from './components/OneWeekForecast'
import HourlyForecast from './components/HourlyForecast'
import { WeatherAnimation} from './components/WeatherAnimation'
import { fetchWeatherByCity} from './service/WeatherApi'
import { fetchCityImage } from './service/CityImageApi'
import { fetchCityCoordinates } from './service/WeatherApi'

export default function App() {
const [cityInput, setCityInput] = useState('')
const [cityName, setCityName] = useState('')
const [suggestions, setSuggestions] = useState([])
const [cityImage, setCityImage] = useState(null)	
const [forecast, setForecast] = useState(null)
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)

useEffect(() => {
  const timeOut = setTimeout(() => {
    if (cityInput.trim().length >= 3) {
      fetchSuggestions(cityInput)
    } else {
      setSuggestions([])
    }
  },300);
  return () => clearTimeout(timeOut);
},[cityInput]);

async function fetchSuggestions(cityInput) {
  const data = await fetchCityCoordinates(cityInput);
  setSuggestions(data.map(item => ({
    name: item.name,
    country: item.country,
    state: item.state,
    lat: item.lat,
    lon: item.lon
  })));
}
  


async function handleSearch() {
if (!cityInput) return
setLoading(true)
setError(null)
try {
const data = await fetchWeatherByCity(cityInput);
const imageUrl = await fetchCityImage(cityInput)

setCityInput('');
setForecast(data)
setCityName(data.city?.name || cityInput)
setSuggestions([])
setCityImage(imageUrl)
} catch (err) {
setError(err.message)
setForecast(null)
} finally {
setLoading(false)
}
}

const current = forecast?.list?.[0]
let backgroundGradient = 'from-gray-100 to-gray-300';

if(current?.main?.temp !== undefined) {
  const temp = current.main.temp;
  
  if (temp <= 0) {
      backgroundGradient = 'from-blue-600 via-blue-400 to-cyan-300';
    } else if (temp <= 15) {
      backgroundGradient = 'from-cyan-400 via-teal-300 to-emerald-200';
    } else if (temp <= 25) {
      backgroundGradient = 'from-emerald-200 via-lime-300 to-yellow-200';
    } else if (temp <= 35) {
      backgroundGradient = 'from-orange-400 via-red-400 to-pink-500';
    } else {
      backgroundGradient = 'from-red-600 via-orange-600 to-yellow-500';
    }
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  } 
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

return (
<div className={`min-h-screen transition-all duration-1000 bg-gradient-to-br ${backgroundGradient} pb-10`}>

  {current && <WeatherAnimation description={current.weather?.[0]?.description} />}
    
    <nav className="sticky top-0 z-50 w-full px-6 py-4 bg-white/20  backdrop-blur-2xl border-b border-white/30 shadow-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400">Weather Dashboard</span>
          <h1 className="text-xl font-bold text-gray-800">Search Weather by City</h1>
        </div>

        <div className="w-full max-w-md bg-white/30 backdrop-blur-md rounded-2xl border border-white/40 shadow-inner px-2">
          <SearchBar
            value={cityInput}
            onChange={setCityInput}
            onSearch={handleSearch}
          />
          {suggestions.length > 0 && (
      <ul className="absolute bg-white shadow rounded w-full bg-white/40 backdrop-blur-2xl p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-white/50mt-1 z-10">
        {suggestions.map((city) => (
          <li
            key={`${city.name}-${city.lat}-${city.lon}`}
            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => handleSearch(city.name)}
          >
            <span className="font-bold">{city.name}</span>
              {city.state && <span className="text-gray-500 text-sm">, {city.state}</span>}
            <span className="text-gray-400 text-xs ml-1">({city.country})</span>
          </li>

        ))}
      </ul>
    )}
        </div>
      </div>
    </nav>

    <div className="max-w-6xl mx-auto flex flex-col gap-10 px-4 pt-10 sm:px-6 lg:px-10 relative z-10">
      
      <div className="w-full px-4">
        <AnimatePresence mode='wait'>
        {forecast && (
          <motion.div
            key= {cityName}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity:0, y: -20 }}
            className="flex flex-col text-gray-900 bg-white/40 backdrop-blur-2xl p-10 rounded-[4rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-white/50 text-center break-words"
          >
            <motion.h1
              variants={itemVariants}
              className="text-6xl font-black tracking-tighter"
            >
              {cityName}
            </motion.h1>
            <div className="flex items-center gap-3 mt-2 text-gray-500 items-center justify-center">
              <div className="p-2 bg-white/60 rounded-full shadow-sm text-center flex ">
                {current?.weather?.[0]?.icon && (
                  <img
                    src={`https://openweathermap.org/img/wn/${current.weather[0].icon}.png`}
                    alt={current.weather[0].description}
                    className="w-6 h-6"
                  />
                )}
              </div>
              <span className="text-xl font-medium capitalize">
                {current?.weather?.[0]?.description || "Weather Overview"}
              </span>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>

      {error && <div className="text-red-500 px-4 bg-red-50/50 p-3 rounded-xl border border-red-100">{error}</div>}
      {loading && <div className="text-gray-400 animate-pulse px-4 text-center">Updating local weather...</div>}
      <AnimatePresence mode='wait'>
      {forecast && current?.main && (
        <motion.div
          key={forecast.city?.name}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit={{ opacity:0}}
          className="flex flex-col gap-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            <div className="lg:col-span-2 flex flex-col gap-8">
              {cityImage && (
                <motion.div
                  variants={itemVariants}
                  className="h-80 md:h-96 rounded-[3rem] overflow-hidden shadow-2xl shadow-black/5 border border-white relative group">
                  <img
                    src={cityImage}
                    alt={cityName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </motion.div>
              )}

              <motion.div 
              variants={itemVariants}
              className="bg-white/40 backdrop-blur-2xl p-8 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-white/50">
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-6 px-2">
                  Hourly Conditions
                </h3>
                <div className="overflow-x-auto custom-scrollbar">
                  <HourlyForecast list={forecast.list} />
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col gap-6">
              <motion.div 
              variants={itemVariants}
              className="bg-white/70 backdrop-blur-xl p-8 rounded-[3rem] shadow-sm border border-white flex-1 flex flex-col justify-center transition-all hover:shadow-md text-center">
                 <h1 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-8">Temperature</h1>
                <TempCard temp={current.main.temp} feels={current.main.feels_like} />
              </motion.div>

              <motion.div 
              variants={itemVariants}
              className="bg-white/70 backdrop-blur-xl p-8 rounded-[3rem] shadow-sm border border-white flex-1 flex flex-col justify-center transition-all hover:shadow-md">
                  <h1 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-8 text-center">Wind</h1>
                <WindCard speed={current.wind.speed} deg={current.wind.deg} />
              </motion.div>
            </div>
          </div>

          <motion.div
            variants={itemVariants}
           className="w-full bg-white/40 backdrop-blur-2xl p-10 rounded-[4rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-white/50">
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-8">
              Five Days Forecast
            </h3>
            <div className="overflow-x-auto custom-scrollbar">
              <OneWeekForecast list={forecast.list} />
            </div>
          </motion.div>

        </motion.div>
      )}
      </AnimatePresence>

      {!forecast && !loading && !error && (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-500  ">
          <Sun className="w-16 h-16 mb-4 text-yellow-400 animate-pulse" />
          <p className="text-lg">Search for a city to view its weather forecast.</p>  
        </div>
      )}
    </div>
  </div>
)
}