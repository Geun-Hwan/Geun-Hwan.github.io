import React, { useState } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";

interface Project {
  title: string;
  images: string[];
  startDate: string;
  [key: string]: any; // 필요시 다른 속성도 포함
}

interface ProjectsProps {
  resumeProjects?: Project[];
  resumeBasicInfo?: any;
}

const Projects: React.FC<ProjectsProps> = ({
  resumeProjects,
  resumeBasicInfo,
}) => {
  const [detailsModalShow, setDetailsModalShow] = useState(false);
  const [deps, setDeps] = useState<Project | {}>({});

  const detailsModalShowHandler = (data: Project) => {
    setDeps(data);
    setDetailsModalShow(true);
  };

  const detailsModalCloseHandler = () => {
    setDetailsModalShow(false);
  };

  let sectionName = resumeBasicInfo?.section_name.projects || "";
  let projects = resumeProjects?.map((project) => (
    <div
      className="col-sm-12 col-md-6 col-lg-4"
      key={project.title}
      style={{ cursor: "pointer" }}
    >
      <span className="portfolio-item d-block">
        <div className="foto" onClick={() => detailsModalShowHandler(project)}>
          <div>
            <img
              src={project.images[0]}
              alt="projectImages"
              height={230}
              style={{
                marginBottom: 0,
                paddingBottom: 0,
                position: "relative",
              }}
            />
            <span className="project-date">{project.startDate}</span>
            <br />
            <p className="project-title-settings mt-3">{project.title}</p>
          </div>
        </div>
      </span>
    </div>
  ));

  return (
    <section id="portfolio">
      <div className="col-md-12">
        <h1 className="section-title" style={{ color: "black" }}>
          <span>{sectionName}</span>
        </h1>
        <div className="col-md-12 mx-auto">
          <div className="row mx-auto">{projects}</div>
        </div>
        <ProjectDetailsModal
          show={detailsModalShow}
          onHide={detailsModalCloseHandler}
          data={deps}
        />
      </div>
    </section>
  );
};

export default Projects;
