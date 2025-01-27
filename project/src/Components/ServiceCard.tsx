import "./ServiceCard.css";

export default function ServiceCard(props: {
  tagline: string,
  description: string,
  image: string,
  alt: string,
  technologies?: string[]
}): JSX.Element {
  return <div className="service-card">
    <div className="service-card-header">
      <img src={props.image} alt={props.alt} loading="lazy"/>
      <h3>{props.tagline}</h3>
    </div>

    <p className="service-card-content">{props.description}</p>

    {props.technologies && <div className="service-tech-list">
      {props.technologies.map((tech, i) => (
        <span key={i} className="service-tech-item">{tech}</span>
      ))}
    </div>}
  </div>
}