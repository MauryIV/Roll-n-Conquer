import React from 'react';
import '../App.css'

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Made with ‽ Tim, Vic, Maury, Hunter & Hinton | © {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;