import { HTMLAttributes } from "react";
import "./ServiceCardRow.css";

export default function ServiceCardRow(props:  HTMLAttributes<HTMLDivElement>): JSX.Element {
	return <div className="service-card-row">
		{props.children}
	</div>
}