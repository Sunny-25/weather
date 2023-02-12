import { fun, search, sun, bgn, bgm, weekDays, icons, wind } from './constants'
import './App.css'
import Right from './right'
import { useEffect, useState } from 'react'
import { tempdata } from './assets/temp.js'

function App() {
	const [searchTerm, setSearchTerm] = useState('india')
	const [weatherData, setWeatherData] = useState(tempdata)
	const [hid, setHid] = useState(true)

	useEffect(() => {
		const getData = async () => {
			setWeatherData(await fun(searchTerm))
		}
		getData()
	}, [])

	const handleSubmit = e => {
		e.preventDefault()

		const getData = async () => {
			const data = await fun(searchTerm)
			setWeatherData(data)
			setHid(false)
		}
		getData()
	}

	const {
		current,
		current: { condition },
		location,
	} = weatherData

	const lastUpdatedTime = new Date(current.last_updated).toLocaleTimeString('en-US')

	return (
		<>
			<div className={` ${!hid ? 'hidden' : 'primary'}`}>
				<form className="search" onSubmit={handleSubmit}>
					<input type="text" onChange={e => setSearchTerm(e.target.value)} className="searchbar" placeholder="Search to find out weather....." />
					<button type="submit">
						<i className="fas fa-search" type="submit"></i>
					</button>
				</form>
			</div>
			<div className={`${hid ? 'hidden' : 'app'}`}>
				<div className="left ">
					<form className="search" onSubmit={handleSubmit}>
						<input type="text" onChange={e => setSearchTerm(e.target.value)} className="searchbar" placeholder="Search for places....." />
						<i className="fas fa-search" type="submit"></i>
					</form>
					<img src={icons.get(condition.code)} alt="today-weather-icon" className="today-icon" />
					<h1 className="today-temp">{current.temp_c}°c</h1>
					<p>
						{weekDays[new Date(current.last_updated).getDay()]}, <span className="today-time">{lastUpdatedTime}</span>
					</p>
					<hr />
					<div className="left-bottom">
						<div className="left-bottom-detail">
							<img src={icons.get(condition.code)} alt="bottom-icon" />
							<p>{condition.text}</p>
						</div>
						<div className="left-bottom-detail">
							<img src={wind} alt="bottom-icon" />
							<p>{`${current.wind_kph} kmph`} </p>
						</div>
					</div>
					<div className="left-bottom-img">
						{location.name} ,{location.region}
					</div>
				</div>

				<Right data={weatherData} />
			</div>
		</>
	)
}

export default App
