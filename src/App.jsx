import React, { useState } from 'react'
import { Moon, Sun, CloudSun } from 'lucide-react'
import SearchBar from './components/SearchBar'
import TempCard from './components/TempCard'
import WindCard from './components/WindCard'
import FiveDaysForecast from './components/FiveDaysForecast'
import HourlyForecast from './components/HourlyForecast'
import { fetchWeatherByCity } from './service/WeatherApi'


export default function App() {
const [cityInput, setCityInput] = useState('')
const [cityName, setCityName] = useState('')
const [forecast, setForecast] = useState(null)
const [mode, setMode] = useState('dark')
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)

async function handleSearch() {
if (!cityInput) return
setLoading(true)
setError(null)
try {
const data = await fetchWeatherByCity(cityInput)
setCityInput('');
setForecast(data)
setCityName(data.city?.name || cityInput)
} catch (err) {
setError(err.message)
setForecast(null)
} finally {
setLoading(false)
}
}

const current = forecast?.list?.[0]


return (
<div className="min-h-screen px-4 sm:px-6 lg:px-10 py-6 max-w-4xl mx-auto" >

    <div style={{backgroundColor: mode === 'dark' ? '#1a202c' : '#f7fafc', color: mode === 'dark' ? '#edf2f7' : '#1a202c'}} className={mode === 'dark' ? 'dark' : ''}>
  <div className="min-h-screen px-4 sm:px-6 lg:px-10 py-6 max-w-4xl mx-auto">
	<div className="flex justify-between items-center mb-6">
	  <div className="flex justify-between items-center mb-6">
		<button onClick={() => setMode((d) => d === 'dark' ? 'light' : 'dark')} className="p-2 glass rounded-lg">
		  {mode === 'dark' ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}
		</button>
	  </div>
	</div>
    
        <SearchBar
        value={cityInput}
        onChange={setCityInput}
        onSearch={handleSearch}
        />


	<div className="mt-6">
	  {loading && <div className="p-4 glass">Loading...</div>}
	  {error && <div className="p-4 glass text-red-500">{error}</div>}

	  {forecast && current && (
		<div>
		  <h1 className="text-2xl font-semibold text-center">{cityName}</h1>
		  <p className="text-center flex items-center justify-center gap-2 mt-2"><CloudSun className="w-5 h-5"/>{current.weather[0].description}</p>

		  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
			<TempCard temp={current.main.temp} feels={current.main.feels_like} />
			<WindCard speed={current.wind.speed} />
		  </div>

		  <FiveDaysForecast list={forecast.list} />
		  <HourlyForecast list={forecast.list} />
		</div>
	  )}
	</div>

	{!forecast && !loading && (
	  <div className="mt-8 text-center text-gray-600 dark:text-gray-300">Type a city name and click search to see the weather.</div>
	)}
  </div>
</div>
</div>
)}