import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
    <footer className="bg-white text-blue text-center p-3 mt-5">
      <div>© {new Date().getFullYear()} Invedat. All rights reserved.</div>
    </footer>
  );
}

export default Footer;
