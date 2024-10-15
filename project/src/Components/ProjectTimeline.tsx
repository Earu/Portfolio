import { Chrono } from "react-chrono";
import "./ProjectTimeline.css";

type Project = {
	title: string;
	description: string;
	image: string;
	alt: string;
	company: string;
	relevantUrl: string;
	startDate: Date;
	endDate: Date;
};

export default function ProjectTimeline(props: { projects: Array<Project> }): JSX.Element {
	const isClient = typeof window !== "undefined";
	if (!isClient) return <div />;

	const items = props.projects.map(p => ({
		cardTitle: `${p.title} (${p.company})`,
		url: p.relevantUrl,
		cardDetailedText: p.description,
		media: {
		  type: "IMAGE",
		  source: {
			url: p.image,
			alt: p.alt,
		  }
		},
		date: p.startDate,
	}));

	items.sort((a, b) => b.date.getTime() - a.date.getTime());

	return <Chrono
		items={items}
		mode="VERTICAL_ALTERNATING"
		disableToolbar={true}
		itemWidth="100%"
		theme={{
			primary: "rgb(36, 36, 36)",
			secondary: "black",
			titleColor: "white",
			titleColorActive: "white",
		}}
		classNames={{
			card: "timeline-card",
			cardTitle: "timeline-card-title",
			cardText: "timeline-card-text",
		}}
	/>
}