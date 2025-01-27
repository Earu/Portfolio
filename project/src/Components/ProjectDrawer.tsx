import React, { useState } from 'react';
import './ProjectDrawer.css';
import { Tech } from './Techs';

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

export default function ProjectDrawer(props: { projects: Array<Project> }): JSX.Element {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const sortedProjects = [...props.projects].sort((a, b) => b.startDate.getTime() - a.startDate.getTime());

    const handleCardClick = (index: number) => {
        setSelectedIndex(selectedIndex === index ? null : index);
    };

    return (
        <div className="projects-grid">
            {sortedProjects.map((project, index) => (
                <div
                    key={index}
                    className={`project-card ${selectedIndex === index ? 'expanded' : ''}`}
                    onClick={() => handleCardClick(index)}
                >
                    <div className="project-card-header">
                        <img src={project.image} alt={project.alt} />
                        <div className="text-content">
                            <h3>{project.title}</h3>
                            <a
                                href={project.relevantUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {project.company}
                            </a>
                        </div>
                    </div>

                    <div className="project-card-content">
                        <p>{project.description}</p>
                    </div>

                    <div className="project-card-techs">
                        {(project.techs ?? []).map((tech, techIndex) => (
                            <span
                                key={techIndex}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(tech.url, "_blank");
                                }}
                                className="project-tech-tag"
                            >
                                <img src={tech.image} alt={tech.name} />
                                {tech.name}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export type { Project };