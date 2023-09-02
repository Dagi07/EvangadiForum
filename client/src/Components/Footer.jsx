import React from "react";
import "./Footer.css";
import logo from "../images/evangadi-logo-footer.png";
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <img className="footerLogo" src={logo} alt="" />
        <div className="socialMedia">
          <FacebookSharpIcon />
          <CameraAltRoundedIcon />
          <SmartDisplayOutlinedIcon />
        </div>
      </div>
      <div>
        <h3>Useful Link</h3>
        <ul>
          <li>How it works</li>
          <li>Terms of Service</li>
          <li>Privacy policy</li>
        </ul>
      </div>
      <div>
        <h3>Contact Info</h3>
        <p>Evangadi Networks</p>
        <p>support@evangadi.com</p>
        <p>+1-202-386-2702</p>
      </div>
    </div>
  );
};

export default Footer;
