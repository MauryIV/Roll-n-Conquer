import React from 'react';
import '../../App.css';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Made with ‽ by Tim, Vic, Maury, Hunter & Hinton | © {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;