import "./FooterColumn.css";

export default function FooterColumn(props: { title: string, list: Array<[string, string]> }): JSX.Element {
	return <div className="footer-column">
		<h2>{props.title}</h2>
		{props.list.map(item => <h3 key={`footer_${props.title}_${item[0]}_item`}><a href={item[1]}>{item[0]}</a></h3>)}
	</div>
}