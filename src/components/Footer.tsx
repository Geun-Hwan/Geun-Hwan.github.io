import type { FC } from "react";

interface SocialNetwork {
  name: string;
  url: string;
  class: string;
}

interface SharedBasicInfo {
  name: string;
  social: SocialNetwork[];
}

interface FooterProps {
  sharedBasicInfo?: SharedBasicInfo;
}

const Footer: FC<FooterProps> = ({ sharedBasicInfo }) => {
  const networks = sharedBasicInfo?.social.map((network) => (
    <span key={network.name} className="m-4">
      <a href={network.url} target="_blank" rel="noopener noreferrer">
        <i className={network.class}></i>
      </a>
    </span>
  ));

  return (
    <footer>
      <div className="col-md-12">
        <div className="social-links">{networks}</div>

        <div className="copyright py-4 text-center">
          <div className="container">
            <small>
              Copyright &copy; 2025{" "}
              {sharedBasicInfo ? sharedBasicInfo.name : "???"}
              <br />
              <a href="mailto:rmsghks1026@gmail.com">msghks1026@gmail.com</a>
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
