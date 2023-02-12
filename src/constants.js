// icons

import sun from './assets/icons/animated/day.svg'
import rain from './assets/icons/animated/rainy-3.svg'
import snow from './assets/icons/animated/snowy-6.svg'
import cloud from './assets/icons/animated//cloudy.svg'
import thunder from './assets/icons/animated/thunder.svg'
import wind from './assets/icons/animated/wind-48.png'
import bgn from './assets/images/bgn.jpg'
import bgm from './assets/images/bgm.jpg'
import search from './assets/icons/static/icons8-search.svg'
import { tempdata } from './assets/temp'
import axios from 'axios'

const key = '91261328ffcb4bf496b45019230802'

// get weather data

export const fun = async searchTerm => {
	try {
		const { data } = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${searchTerm}&days=7&aqi=yes&alerts=yes`)
		return data
	} catch (error) {
		alert('Search for valid place...')
		location.reload()
	}
}

export { sun, rain, snow, cloud, thunder, search, bgn, bgm, wind }

// set icons for days

export const icons = new Map()

addMap([1000, 1003], sun)
addMap([1063, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1198, 1201, 1240, 1243], rain)
addMap([1030, 1066, 1069, 1114, 1117, 1135, 1147, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264], snow)
addMap([1006, 1009], cloud)
addMap([1087, 1273, 1276, 1279, 1282, 1192, 1246, 1195], thunder)

function addMap(values, icon) {
	values.forEach(v => icons.set(v, icon))
}

export const Week = [
	{
		name: 'Sun',
		icon: sun,
		temp: '15°',
		rain: '-3°',
	},
	{
		name: 'Sun',
		icon: rain,
		temp: '15°',
		rain: '-3°',
	},
	{
		name: 'Sun',
		icon: cloud,
		temp: '15°',
		rain: '-3°',
	},
	{
		name: 'Sun',
		icon: thunder,
		temp: '15°',
		rain: '-3°',
	},
	{
		name: 'Sun',
		icon: sun,
		temp: '15°',
		rain: '-3°',
	},
	{
		name: 'Sun',
		icon: sun,
		temp: '15°',
		rain: '-3°',
	},
	{
		name: 'Sun',
		icon: sun,
		temp: '15°',
		rain: '-3°',
	},
]

export function fetchDayData(weatherData) {
	const {
		forecast: { forecastday },
	} = weatherData

	const { current: last_updated } = weatherData

	const hour = forecastday[0].hour
	const uptime = new Date(last_updated.last_updated_epoch).toLocaleTimeString()

	const ret = hour.filter(i => new Date(i.time_epoch).toLocaleTimeString() >= uptime).slice(0, 6)
	const res = ret.map(i => {
		const tempDaytime = new Date(i.time).toLocaleTimeString().split(':')[0]
		const time1 = tempDaytime <= 12 ? `${tempDaytime} AM` : `${tempDaytime - 12} PM`
		return {
			name: time1,
			icon: icons.get(i.condition.code),
			temp: `${i.temp_c} °C`,
		}
	})
	console.log(res)
	return res
}

export function fetchWeekData(weatherData) {
	const {
		forecast: { forecastday },
	} = weatherData

	const res = forecastday.map(i => {
		const day = weekDays[new Date(i.date).getDay()]
		return {
			name: day,
			icon: icons.get(i.day.condition.code),
			temp: `${i.day.maxtemp_c} °C`,
		}
	})
	console.log(res)
	return res
}

export const weekDays = {
	0: 'Sunday',
	1: 'Monday',
	2: 'Tuesday',
	3: 'Wednesday',
	4: 'Thursday',
	5: 'Friday',
	6: 'Saturday',
}
