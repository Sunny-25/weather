import './index.css'

const Hcard = ({ item: { name, status, exp } }) => {
	return (
		<div className="hcard">
			<h1 className="head">{name}</h1>
			<h1 className="status">{status}</h1>
			<h1 className="exp">{exp} </h1>
		</div>
	)
}

export default Hcard
