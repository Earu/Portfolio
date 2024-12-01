import { useEffect, useState } from "react";
import "./Clock.css";

const formatter = new Intl.DateTimeFormat([], {
	timeZone: "Europe/Paris",
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric'
});

function getCurrentTime(date: Date) {
	return formatter.format(date);
}

function checkTime(date: Date) {
	const hours = date.getHours();
	const mins = date.getMinutes();
	const day = date.getDay();

	return day >= 1 // at least monday
		&& day <= 5 // not after friday
		&& hours >= 9  // start at 9:00 AM
		&& (hours < 18 || (hours === 18 && mins <= 30)); // ends at 6:30 PM
}

export default function Clock(): JSX.Element {
	const [time, setTime] = useState(new Date());
	const isOnline = checkTime(time);
	
	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="clock">
			<img src="/img/french_flag.svg" alt="French flag" />
			<span className="time">{getCurrentTime(time)}</span>
			<span className={`status ${isOnline ? 'online' : 'offline'}`}>
				{isOnline ? "Online" : "Offline"}
			</span>
		</div>
	);
}