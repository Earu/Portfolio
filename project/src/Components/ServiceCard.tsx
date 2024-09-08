import "./ServiceCard.css";

export default function ServiceCard(props: { tagline: string, description: string, image: string, alt: string }): JSX.Element {
	return <div className="service-card">
		<div>
			<img src={props.image} alt={props.alt}/>
			<h3>{props.tagline}</h3>
		</div>

		<p>{props.description}</p>
	</div>
}