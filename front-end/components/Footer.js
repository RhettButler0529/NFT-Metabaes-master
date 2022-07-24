import React from 'react';
import { Container, Row, Col } from "reactstrap";

const Footer = () => {
  
  return (
    <section className="footer section" style={{marginTop: "50px"}}>
      <Container>
        <div className="footer-main">
          <div>
            <div className="com-name">@2021THEMETABAES</div>
            <div className="terms-cond">TEMRS&CONDITIONS</div>
          </div>
          <ul className="list-group">
            <li className="list-group-item">
              <a href="https://opensea.io/collection/the-doge-pound" target="_blank" rel="noreferrer">
                <img src="/images/opensea.png" alt="Opensea" style={{width: "35px"}} />
              </a>
            </li>
            <li className="list-group-item">
              <a href="https://medium.datadriveninvestor.com/how-to-buy-and-sell-the-doge-pound-nft-7c7bff7601f5" target="_blank" rel="noreferrer">
                <img src="/images/medium.png" alt="Medium" style={{width: "35px"}} />
              </a>
            </li>
            <li className="list-group-item">
              <a href="https://www.instagram.com/challenge/AXERaZztICtpfm8eGnJujiYwUtch4Zp-nf6tbvDoOTol0GM6sot1h6tLZip1uFCVRlRDOxU/BKRQuTtkUC/" target="_blank" rel="noreferrer">
                <img src="/images/instagram.png" alt="Instagram" style={{width: "35px"}} />
              </a>
            </li>
            <li className="list-group-item">
              <a href="https://twitter.com/TheDogePoundNFT?s=20" target="_blank" rel="noreferrer">
                <img src="/images/twitter.png" alt="Twitter" style={{width: "35px"}} />
              </a>
            </li>
            <li className="list-group-item">
              <a href="https://discord.gg/6xEq5wxR6M" target="_blank" rel="noreferrer">
                <img src="/images/discord.png" alt="Discord" style={{width: "35px"}} />
              </a>
            </li>
            <li className="list-group-item">
              <a href="https://www.youtube.com/watch?v=JG5XVwAKGWY" target="_blank" rel="noreferrer">
                <img src="/images/youtube.png" alt="Youtube" style={{width: "35px"}} />
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}

export default Footer;