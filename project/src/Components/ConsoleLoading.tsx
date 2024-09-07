import { useEffect } from "react";
import "./ConsoleLoading.css";
import { getCookie, setCookie } from "../cookieUtils";
import { getPrivacyVariable } from "../privacy";

let hasLoaded = false;
let doneShowing = false;
export default function ConsoleLoading(): JSX.Element {
	function onLoaded() {
		const loadElement = document.getElementsByClassName("load")[0] as HTMLDivElement | undefined;
		if (loadElement) {
			loadElement.style.display = "none";
		}

		let classesToShow = ["App", "star", "star--alt"];
		for (let className of classesToShow) {
			let elements = document.getElementsByClassName(className) as HTMLCollectionOf<HTMLElement>;
			for (let element of Object.values(elements)) {
				element.style.display = "block";
			}
		}

		window.scrollTo({ top: 0 });
		doneShowing = true;

		if (getCookie("ConsoleLoading") !== "1") {
			setCookie("ConsoleLoading", "1", 1000 * 60 * 60 * 24 * 30); // one month
		}
	}

	useEffect(() => {
		if (hasLoaded) return;

		hasLoaded = true;

		if (getCookie("ConsoleLoading") === "1") {
			onLoaded();
			return;
		}

		const textarea = document.getElementsByClassName("term")[0];
		const text = `sh ${getPrivacyVariable("NAME")}_website.sh`;

		let i = 0;
		let time = 1;
		function feedbacker() {
			if (doneShowing) return;

			window.scrollTo(0, document.body.scrollHeight);
			i++;
			time = Math.floor(Math.random() * 4) + 1;
			setTimeout(() => {
				textarea.append("Booting up...\n");
				setTimeout(onLoaded, 1000);
			}, time);
		}

		function runner() {
			textarea.append(text.charAt(i));
			i++;
			setTimeout(() => {
				if (i < text.length) {
					runner();
				} else {
					textarea.append("\n");
					i = 0;
					setTimeout(feedbacker, 1000);
				}
			}, Math.floor(Math.random() * 110) + 50);
		}

		runner();
	});

	return <div className="load">
		<pre className="term">{getPrivacyVariable("NAME").toLowerCase()}@server:~$ </pre>
	</div>
}