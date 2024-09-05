import "./ServiceCard.css";

export default function ServiceCard(props: { tagline: string, description: string, image: string }): JSX.Element {
	return <div className="service-card">
		<div style={{ backgroundImage: `` }}>
			<img src={props.image} alt=""/>
			<span>{props.tagline}</span>
		</div>

		<p>{props.description}</p>
	</div>
}