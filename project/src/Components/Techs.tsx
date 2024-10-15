import "./Techs.css";

type Tech = { name: string, url: string, image: string };

export default function Techs(props: { techs: Array<Tech>, size: number, showTitle: boolean }): JSX.Element {
	return <div className="techs">
		{props.techs.map(tech => <div onClick={() => window.open(tech.url, "_blank")}>
			<img src={tech.image} alt={tech.name} width={props.size} height={props.size} onClick={() => window.open(tech.url, "_blank")} />
			<a href={tech.url} style={{ display: props.showTitle ? "block" : "none" }}>{tech.name}</a>
		</div>)}
	</div>
}

export type { Tech };