import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import AwesomeSlider from "react-awesome-slider";
import AwesomeSliderStyles from "@/scss/light-slider.scss";
import AwesomeSliderStyles2 from "@/scss/dark-slider.scss";
import "react-awesome-slider/dist/custom-animations/scale-out-animation.css";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import java from "react-syntax-highlighter/dist/esm/languages/hljs/java";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Collapse from "react-collapse";
SyntaxHighlighter.registerLanguage("java", java);

const isVideo = (url) => {
  const videoExtensions = ["mp4", "webm", "ogg", "mov"];
  const ext = url.split(".").pop().toLowerCase();
  return videoExtensions.includes(ext);
};

const ProjectDetailsModal: React.FC<any> = (props) => {
  const { data, onHide, ...modalProps } = props;

  const tech = data?.technologies?.map((icons, i) => (
    <li className="list-inline-item mx-3" key={i}>
      <span>
        <div className="text-center">
          <i className={icons.class} style={{ fontSize: "300%" }}>
            <p className="text-center" style={{ fontSize: "30%" }}>
              {icons.name}
            </p>
          </i>
        </div>
      </span>
    </li>
  ));

  const playVideoFullscreen = (src) => {
    const doc = document as any;

    const video = doc.createElement("video");
    video.src = src;
    video.controls = true;
    video.style.width = "100%";
    video.style.height = "100%";
    doc.body.appendChild(video);

    const requestFullScreen =
      video.requestFullscreen ||
      video.webkitRequestFullscreen ||
      video.msRequestFullscreen;

    if (requestFullScreen) {
      requestFullScreen.call(video);
    }

    video.play();

    // 전체화면 종료 시 비디오 DOM 제거
    const onFullscreenChange = () => {
      const doc = document as any;

      if (
        !doc.fullscreenElement &&
        !doc.webkitFullscreenElement &&
        !doc.msFullscreenElement
      ) {
        video.pause();
        video.remove();
        doc.removeEventListener("fullscreenchange", onFullscreenChange);
        doc.removeEventListener("webkitfullscreenchange", onFullscreenChange);
        doc.removeEventListener("msfullscreenchange", onFullscreenChange);
      }
    };

    doc.addEventListener("fullscreenchange", onFullscreenChange);
    doc.addEventListener("webkitfullscreenchange", onFullscreenChange);
    doc.addEventListener("msfullscreenchange", onFullscreenChange);
  };

  const mediaElements = data?.images?.map((elem, i) => {
    if (isVideo(elem)) {
      return (
        <div
          key={i}
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          aria-label="Play Video"
          tabIndex={0}
        >
          <i
            role="button"
            onClick={() => playVideoFullscreen(elem)}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") playVideoFullscreen(elem);
            }}
            className="fas fa-play-circle"
            style={{ fontSize: 64, color: "white" }}
          />
        </div>
      );
    }
    return (
      <div
        key={i}
        data-src={elem}
        role="button"
        onClick={() => window.open(elem, "_blank", "noopener,noreferrer")}
      />
    );
  });

  const [codeContent, setCodeContent] = useState(null);
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    if (data?.codeSnippet) {
      fetch(`${data?.codeSnippet}`)
        .then((res) => res.text())
        .then(setCodeContent)
        .catch(() => setCodeContent("코드를 불러오지 못했습니다."));
    }

    return () => {
      setCodeContent(null);
      setShowCode(false);
    };
  }, [data?.codeSnippet]);

  return (
    <>
      <Modal
        {...modalProps}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-inside"
      >
        <span onClick={onHide} className="modal-close">
          <i className="fas fa-times fa-3x close-icon"></i>
        </span>
        <div className="col-md-12">
          <div className="col-md-10 mx-auto" style={{ paddingBottom: "50px" }}>
            <div className="slider-tab">
              <span
                className="iconify slider-iconfiy"
                data-icon="emojione:red-circle"
                data-inline="false"
                style={{ marginLeft: "5px" }}
              ></span>{" "}
              &nbsp;{" "}
              <span
                className="iconify slider-iconfiy"
                data-icon="twemoji:yellow-circle"
                data-inline="false"
              ></span>{" "}
              &nbsp;{" "}
              <span
                className="iconify slider-iconfiy"
                data-icon="twemoji:green-circle"
                data-inline="false"
              ></span>
            </div>

            <AwesomeSlider
              cssModule={[AwesomeSliderStyles, AwesomeSliderStyles2]}
              animation="scaleOutAnimation"
              className="slider-image"
              bullets={mediaElements?.length > 1}
              buttons={mediaElements?.length > 1}
            >
              {mediaElements}
            </AwesomeSlider>
          </div>
          <div className="col-md-10 mx-auto">
            <h3
              style={{
                padding: "5px 5px 0 5px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>
                {data?.title}
                {data?.url ? (
                  <a
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-href"
                  >
                    <i
                      className="fas fa-external-link-alt"
                      style={{ marginLeft: "10px" }}
                    ></i>
                  </a>
                ) : null}
              </span>

              {data?.codeSnippet && (
                <button
                  onClick={() => setShowCode(!showCode)}
                  className="btn btn-outline-primary"
                >
                  <i className="fas fa-code" style={{ marginRight: "5px" }}></i>
                  {showCode ? "Hide" : "More"}
                </button>
              )}
            </h3>
            <p className="modal-description">{data?.description}</p>
            <div className="col-md-12 text-center">
              <ul className="list-inline mx-auto">{tech}</ul>
            </div>
          </div>
        </div>
      </Modal>
      <CodeModal
        show={showCode}
        onHide={() => setShowCode(false)}
        codeContent={codeContent}
      />
    </>
  );
};

export default ProjectDetailsModal;

const CodeModal = ({ show, onHide, codeContent }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      className="modal-code"
    >
      <Modal.Header style={{ alignItems: "center" }}>
        <Modal.Title style={{ fontSize: "1.8rem" }}>주요 코드 보기</Modal.Title>
        <span onClick={onHide} className="modal-close">
          <i className="fas fa-times fa-3x close-icon"></i>
        </span>
      </Modal.Header>

      <Modal.Body>
        <p
          className="text-muted"
          style={{ fontSize: "1.3rem", fontWeight: "bold" }}
        >
          ※ 전체 소스는 비공개이며 요청 시 공개 가능합니다.
        </p>
        <div
          style={{
            maxHeight: "70vh",
            overflowY: "auto",
            borderRadius: "8px",
            backgroundColor: "#f8f8f8",
            padding: "1rem",
          }}
        >
          <Collapse isOpened={true}>
            <SyntaxHighlighter
              language="java"
              style={atomOneLight}
              showLineNumbers
              customStyle={{ fontSize: "1.2rem" }}
            >
              {codeContent}
            </SyntaxHighlighter>
          </Collapse>
        </div>
      </Modal.Body>
    </Modal>
  );
};
