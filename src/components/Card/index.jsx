import './index.css'

const Card = ({ item: { name, icon, temp, rain } }) => {
	return (
		<div className="card">
			<h1>{name} </h1>
			<img src={icon} alt="" />
			<h1>
				{temp} <span>{rain}</span>
			</h1>
		</div>
	)
}

export default Card
