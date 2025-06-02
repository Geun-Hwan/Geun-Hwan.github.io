import { useEffect, useState } from "react";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import "bootstrap/dist/css/bootstrap.min.css";

interface ResumeData {
  basic_info?: any;
  projects?: any;
  experience?: any;
}

interface SharedData {
  basic_info?: any;
  skills?: any;
}

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>({});
  const [sharedData, setSharedData] = useState<SharedData>({});

  useEffect(() => {
    loadSharedData();
    loadResumeData();
  }, []);

  const loadResumeData = async () => {
    try {
      const res = await fetch("res_primaryLanguage.json");
      const data = await res.json();
      console.log("data", data);
      setResumeData(data);
    } catch (error) {
      alert(error);
    }
  };

  const loadSharedData = async () => {
    try {
      const res = await fetch("portfolio_shared_data.json");
      const data = await res.json();
      setSharedData(data);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <Header sharedData={sharedData.basic_info} />
      <div className="col-md-12 mx-auto text-center language">
        <div style={{ display: "inline" }}>
          <span
            id="en"
            className="iconify language-icon mr-5"
            data-icon="twemoji-flag-for-flag-united-kingdom"
            data-inline="false"
          ></span>
        </div>
      </div>
      {/* <About
        resumeBasicInfo={resumeData.basic_info}
        sharedBasicInfo={sharedData.basic_info}
      />
      <Projects
        resumeProjects={resumeData.projects}
        resumeBasicInfo={resumeData.basic_info}
      />
      <Skills
        sharedSkills={sharedData.skills}
        resumeBasicInfo={resumeData.basic_info}
      />
      <Experience
        resumeExperience={resumeData.experience}
        resumeBasicInfo={resumeData.basic_info}
      />
      <Footer sharedBasicInfo={sharedData.basic_info} /> */}
    </div>
  );
}

export default App;
