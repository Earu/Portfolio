import { Chrono } from "react-chrono";
import "./ProjectTimeline.css";
import Techs, { Tech } from "./Techs";

type Project = {
	title: string;
	description: string;
	image: string;
	alt: string;
	company: string;
	relevantUrl: string;
	startDate: Date;
	endDate: Date;
	techs?: Array<Tech>;
};

export default function ProjectTimeline(props: { projects: Array<Project> }): JSX.Element {
	const isClient = typeof window !== "undefined";
	if (!isClient) return <div />;

	const items = props.projects.map(p => ({
		cardTitle: `${p.title} (${p.company})`,
		url: p.relevantUrl,
		timelineContent: <div>
			<div style={{ marginBottom: 20, pointerEvents: "none" }}>{p.description}</div>
			<div className="technologies">
				{(p.techs ?? []).map((tech, index) => (
					<span key={index} onClick={() => window.open(tech.url, "_blank")}>
						{tech.name}
					</span>
				))}
			</div>
		</div>,
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
		}}
	/>
}