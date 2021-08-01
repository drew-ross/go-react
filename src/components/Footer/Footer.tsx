import { ReactElement } from "react";

import "./Footer.css";

const Footer = (): ReactElement => {
  return (
    <footer>
      <p>Site created by Drew Ross, &copy; 2021</p>
      <a href='https://github.com/drew-ross/go-react'>GitHub</a>
    </footer>
  );
};

export default Footer;
