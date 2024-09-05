import { useEffect, useState } from "react";
import "./Clock.css";

const formatter =  new Intl.DateTimeFormat([], {
	timeZone: "Europe/Paris",
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric',
});

function getCurrentTime(date: Date) {
	return formatter.format(date);
}

function checkTime(date: Date) {
	var hours = date.getHours();
	var mins = date.getMinutes();
	var day = date.getDay();

	return day >= 1 // at least monday
		&& day <= 5 // not after friday
		&& hours >= 9  // start at 9:00 AM
		&& (hours < 18 || (hours === 18 && mins <= 30)); // ends at 6:30 PM
}

let startedClock = false;
export default function Clock(): JSX.Element {
	let [time, setTime] = useState(new Date());
	useEffect(() => {
		if (startedClock) return;

		startedClock = true;
		setInterval(() => {
			setTime(new Date());
		}, 1000);
	});

	return <div className="clock"><img src="/img/french_flag.svg" alt="French flag"/> {getCurrentTime(time)} ({checkTime(time) ? "Online" : "Offline"})</div>;
}