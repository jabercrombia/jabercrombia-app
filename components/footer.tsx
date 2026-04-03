import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.07)', backgroundColor: '#080b10' }}>
      <div className="container mx-auto px-6">
        <div
          className="flex justify-between items-center"
          style={{ padding: '2rem 0', fontSize: '11px', letterSpacing: '0.06em', color: '#4a5068' }}
        >
          <span>&copy; {new Date().getFullYear()} Justin Abercrombia</span>
          <Link href="mailto:justinabercrombia@gmail.com" className="footer-link">
            justinabercrombia@gmail.com
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
