import "./ServiceCard.css";

export default function ServiceCard(props: { 
  tagline: string, 
  description: string, 
  image: string, 
  alt: string,
  technologies?: string[]
}): JSX.Element {
  return <div className="service-card">
    <div className="card-header">
      <img src={props.image} alt={props.alt}/>
      <h3>{props.tagline}</h3>
    </div>
    
    <p>{props.description}</p>
    
    {props.technologies && <div className="technologies">
      {props.technologies.map((tech, i) => (
        <span key={i}>{tech}</span>
      ))}
    </div>}
  </div>
}