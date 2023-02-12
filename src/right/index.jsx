import { useEffect, useState } from 'react'
import Card from '../components/Card'
import { Week, bgm, bgn, fetchDayData, fetchWeekData, icons } from '../constants'
import './index.css'

const Right = ({ data }) => {
	const [day, setDay] = useState([])
	const [week, setWeek] = useState([])

	const {
		current: { is_day },
	} = data

	const bg = is_day ? bgm : bgn

	useEffect(() => {
		setDay(fetchDayData(data))
		setWeek(fetchWeekData(data))
	}, [data])

	return (
		<div className="right" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover' }}>
			<div className="right-top">
				<div className="rtl"></div>
			</div>

			<h1 className="type-selected">Today</h1>
			<div className="week">
				{day.map(item => (
					<Card item={item} key={Math.random()} />
				))}
			</div>

			<h1 className="type-selected">This Week</h1>
			<div className="week">
				{week.map(item => (
					<Card item={item} key={Math.random()} />
				))}
			</div>
		</div>
	)
}

export default Right
