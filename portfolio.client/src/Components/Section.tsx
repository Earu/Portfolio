import "./Section.css";

export default function Section(props: { id: string, title: string, children: Array<JSX.Element> | JSX.Element }): JSX.Element {
	return 	<section id={props.id} className={props.id}>
		<h2>{props.title}</h2>
		{props.children}
	</section>
}