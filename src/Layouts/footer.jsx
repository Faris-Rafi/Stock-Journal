import React from "react";
import { PlainCard } from "../Components/Cards/Cards";
import './styles/footer.css'

const Footer = () => {
  return (
    <div className="footer__app p-4">
      <PlainCard bg="color__primary">
        <div className="text-center text-white">© 2023 Jurnal & Kalkulator Saham,</div>
        <div className="text-center text-white">All Right Reserved.</div>
      </PlainCard>
    </div>
  );
};

export default Footer;
