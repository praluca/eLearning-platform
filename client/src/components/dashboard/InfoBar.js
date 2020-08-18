import React from "react";
import PropTypes from "prop-types";
import closeIcon from "../../icons/closeIcon.png";
import onlineIcon from "../../icons/onlineIcon.png";
import { Link } from "react-router-dom";
const InfoBar = ({ room }) => {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        {/* <img className="onlineIcon" src={onlineIcon} alt="online image" /> */}
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <Link to="/join">
          <img src={closeIcon} alt="close image" />
        </Link>
      </div>
    </div>
  );
};

InfoBar.propTypes = {};

export default InfoBar;
