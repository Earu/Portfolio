import "./FooterColumn.css";

export default function FooterColumn(props: { title: string, list: Array<[string, string]> }): JSX.Element {
	return <div className="footer-column">
		<h3>{props.title}</h3>
		{props.list.map(item => <h4 key={`footer_${props.title}_${item[0]}_item`}><a href={item[1]}>{item[0]}</a></h4>)}
	</div>
}