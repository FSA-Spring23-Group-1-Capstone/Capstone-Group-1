import React from "react";
import christian from "../assets/man.png";
import evan from "../assets/man2.png";
import zach from "../assets/avatar.png";
import peter from "../assets/boy.png";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="member">
        <a
          href="https://www.linkedin.com/in/evan-walker-3a8b46235/"
          target="_blank"
        >
          <img src={evan} className="footer-img" />
          Evan Walker
        </a>
      </div>
      <div className="member">
        <a href="https://www.linkedin.com/in/christian-mcneil/" target="_blank">
          <img src={christian} className="footer-img" />
          Christian McNeil
        </a>
      </div>
      <div className="member">
        <a
          href="https://www.linkedin.com/in/peter-laughlin-5a83aa270/"
          target="_blank"
        >
          <img src={peter} className="footer-img" />
          Peter Laughlin
        </a>
      </div>
      <div className="member">
        <a href="https://www.linkedin.com/in/zach-nitzkin/" target="_blank">
          <img src={zach} className="footer-img" />
          Zach Nitzkin
        </a>
      </div>
      <div>
        <a
          className="footer-github"
          href="https://github.com/FSA-Spring23-Group-1-Capstone/Capstone-Group-1"
          target="_blank"
        >
          <i class="fa-brands fa-github"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
