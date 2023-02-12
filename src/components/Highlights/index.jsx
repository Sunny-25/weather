import { high } from '../../constants'
import Hcard from '../Hcard'
import './index.css'

const Highlights = () => {
	return (
		<div className="highlights">
			<h1>Today's Hightlights</h1>
			<div className="highlights-grid">
				{high.map((item) => (
					<Hcard key={Math.random()} item={item} />
				))}
			</div>
		</div>
	)
}

export default Highlights
