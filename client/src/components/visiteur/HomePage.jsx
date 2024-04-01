import "@fortawesome/fontawesome-free/css/all.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import aboutimg from "../../images/about-img.jpg";
import professimag from "../../images/professional-img.png";
import maintservice from "../../images/maintservice.png";
import electricservice from "../../images/electricservice.png";
import plumbingservice from "../../images/plumbingservice.png";
import mechanic from "../../images/repaircar.png";
import architecser from "../../images/architectservice.png";
import hairdressing from "../../images/hairdressing.png";
import client1 from "../../images/client1.jpeg";
import client2 from "../../images/client2.jpeg";
import client3 from "../../images/client3.jpeg";
import client4 from "../../images/client4.jpeg";
import nettoyage from "../../images/nettoyage.jpeg";

import "../../css/HomePage.css";
import { Link } from "react-router-dom";

import Dropdown from "react-bootstrap/Dropdown";
import FooterMyApp from "./../FooterMyApp";

const HomePage = () => {
  const plombier = "plombier";
  const mechanicien = "mechanicien";
  const electricien = "electricien";
  const architect = "architect";
  const coiffeur = "coiffeur";
  const menage = "menage";
  const maintenance = "maintenance";
  return (
    <div className="HomePage">
      <div className="blak">
        <h6>
          {" "}
          <FontAwesomeIcon icon={faPhone} style={{ color: "#FFD43B" }} />
          call : 96931269
        </h6>
        <h6>
          <FontAwesomeIcon icon={faEnvelope} style={{ color: "#FFD43B" }} />
          Email:alaajawachi5@gmail.com
        </h6>
      </div>

      <div className="part1">
        <div className="part1-1">
          <h3>Title</h3>
          <ul>
            <li>
              {" "}
              <Link to={"/"}>Home </Link>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              {" "}
              <a href="#contactus">Contact us</a>
            </li>
            <li>
              <Link to={"/userslist"}>Chercher services</Link>
            </li>{" "}
            <li>
              {" "}
              <Link to={"/news"}> Nouveautés </Link>
            </li>
          </ul>
          <Dropdown data-bs-theme="dark">
            <Dropdown.Toggle
              id="dropdown-button-dark-example1"
              variant="secondary"
              className="btndrop"
              style={{ height: "40px" }}
            >
              interfaces
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <button>
                  {" "}
                  <Link to={"/Loginadmin"}> interface admin </Link>{" "}
                </button>
              </Dropdown.Item>
              <Dropdown.Item>
                <button>
                  {" "}
                  <Link to={"/loginuser"}> interface personnel</Link>{" "}
                </button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="part1-2">
          <img src={professimag} alt="" />
          <div className="part1-2-1">
            <h1>Services de réparation et d'entretien</h1>
            <p>
              Bienvenue sur notre plateforme de services à domicile, où chaque
              aspect reflète l'essence de votre foyer. Nous nous engageons à
              relier les propriétaires à des services fiables, offrant une gamme
              variée de solutions, de l'entretien à l'aménagement intérieur.
              Nous effectuons des recherches approfondies et fournissons des
              services de manière transparente. Si vous avez des compétences
              dans l'un de nos domaines, rejoignez-nous en vous inscrivant sur
              notre plateforme et devenez membre d'une communauté axée sur
              l'appartenance et l'attention aux détails. Si vous recherchez un
              service, explorez notre plateforme sans hésitation.
            </p>
            <Link to={"/AboutUs"}>
              <button>En savoir plus</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="part3" id="about">
        <div className="part3-1">
          <h2>About us</h2>
          <p>
            Welcome to <b>ServiceME</b> platform, where we're dedicated to
            simplifying your home service needs. Our platform was founded on the
            principle that every homeowner deserves easy access to reliable,
            high-quality services to maintain and enhance their living spaces.
          </p>
        </div>
        <img src={aboutimg} alt="" />
      </div>

      <div className="part5">
        <h1>Our Services </h1>

        <div className="part5-1">
          <div className="part5-1child">
            <Link to={`/filtered/${maintenance}`}></Link>
            <img src={maintservice} alt="" />
            <p>lorem ipsum dolor sit amet.</p>{" "}
          </div>
          <div className="part5-1child">
            <Link to={`/filtered/${electricien}`}>
              <img src={electricservice} alt="" />
              <p>electrique</p>{" "}
            </Link>
          </div>

          <div className="part5-1child">
            <Link to={`/filtered/${plombier}`}>
              <img src={plumbingservice} alt="" /> <p>Plomberie</p>{" "}
            </Link>
          </div>

          <div className="part5-1child">
            <Link to={`/filtered/${mechanicien}`}>
              <img src={mechanic} alt="" />
              <p>mechanique</p>{" "}
            </Link>
          </div>

          <div className="part5-1child">
            <Link to={`/filtered/${architect}`}>
              <img src={architecser} alt="" />
              <p>Architecture</p>{" "}
            </Link>
          </div>
          <div className="part5-1child">
            <Link to={`/filtered/${menage}`}>
              <img src={nettoyage} alt="" />
              <p> Nettoyage </p>
            </Link>
          </div>
          <div className="part5-1child">
            <Link to={`/filtered/${coiffeur}`}>
              <img src={hairdressing} alt="" />
              <p>Coiffure</p>{" "}
            </Link>
          </div>
        </div>
      </div>
      <div className="part6">
        <h1>What our clients says</h1>
        <div className="part6father">
          <div className="part6-1">
            <div className="part6-1child">
              <img src={client1} alt="" />
              <div> name name</div>
            </div>
            <p>
              I recently used ServiceME platform to find a plumber for a leaky
              faucet in my kitchen. The process was incredibly smooth, and I was
              impressed by the quality of service provided. I'll definitely be
              using this platform again for future home repair needs.
            </p>
          </div>
          <div className="part6-1">
            <div className="part6-1child">
              <img src={client2} alt="" />
              <div> name name</div>
            </div>
            <p>
              As a busy homeowner, I don't have the time to search for reliable
              service providers. Thankfully, I discovered [Platform Name], and
              it has been a game-changer! From finding a trustworthy electrician
              to scheduling routine maintenance, this platform has made managing
              my home so much easier.
            </p>
          </div>
          <div className="part6-1">
            <div className="part6-1child">
              <img src={client3} alt="" />
              <div> name name</div>
            </div>
            <p>
              I was hesitant to try a new home services platform, but I'm so
              glad I did! Not only did I find a fantastic landscaper for my
              backyard project, but the entire booking process was effortless.
              Plus, the customer service team was responsive and helpful. Highly
              recommend!
            </p>
          </div>
          <div className="part6-1">
            <div className="part6-1child">
              <img src={client4} alt="" />
              <div> name name</div>
            </div>
            <p>
              I've had mixed experiences with home service providers in the
              past, so I was pleasantly surprised by the professionalism and
              expertise of the handyman I found through [Platform Name]. He
              arrived on time, completed the job quickly, and even offered
              helpful tips for future maintenance. Thank you for exceeding my
              expectations!
            </p>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <div id="contactus"></div>
      <FooterMyApp />
    </div>
  );
};

export default HomePage;
