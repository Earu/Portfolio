/* eslint-disable jsx-a11y/anchor-has-content */
import { HTMLAttributes } from "react";
import "./SlantedBox.css";

export default function SlantedLink(props:  HTMLAttributes<HTMLAnchorElement> & { href: string }): JSX.Element {
	return <div className="slanted-box">
		<a {...props} />
	</div>
}