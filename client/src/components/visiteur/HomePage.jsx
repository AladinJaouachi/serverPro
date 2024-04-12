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
import client1 from "../../images/client1.jpeg";
import client2 from "../../images/client2.jpeg";
import client3 from "../../images/client3.jpeg";
import client4 from "../../images/client4.jpeg";
import nettoyage from "../../images/nettoyage.jpeg";

import "../../css/HomePage.css";
import { Link } from "react-router-dom";

import Dropdown from "react-bootstrap/Dropdown";
import FooterMyApp from "./../FooterMyApp";
import logo from "../../images/logo.jpg";

const HomePage = () => {
  const plombier = "plombier";
  const mechanicien = "mechanicien";
  const electricien = "electricien";
  const architect = "architect";

  const menage = "menage";
  const maintenance = "maintenance";
  return (
    <div className="HomePage">
      <div className="blak">
        <h6>
          {" "}
          <FontAwesomeIcon icon={faPhone} style={{ color: "#FFD43B" }} />
          Tel: 96931269
        </h6>
        <h6>
          <FontAwesomeIcon icon={faEnvelope} style={{ color: "#FFD43B" }} />
          Email:alaajawachi5@gmail.com
        </h6>
      </div>

      <div className="part1">
        <div className="part1-1">
          <img src={logo} alt="" />
          <ul>
            <li>
              {" "}
              <Link to={"/"}>Acceuil</Link>
            </li>
            <li>
              <a href="#about">A propos</a>
            </li>
            <li>
              {" "}
              <a href="#contactus">Contact</a>
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
          <h2>A propos</h2>
          <p>
            Nous avons pour objectif de simplifier l'accès à une gamme de
            services essentiels pour les foyers, couvrant des besoins variés
            tels que{" "}
            <u>
              <b> la maintenance</b>
            </u>
            ,{" "}
            <u>
              <b>l'architecture</b>
            </u>
            ,
            <u>
              <b>la plomberie</b>
            </u>
            ,{" "}
            <u>
              <b>l'électricité</b>
            </u>
            ,{" "}
            <u>
              {" "}
              <b>le nettoyage</b>
            </u>
            et{" "}
            <u>
              <b>la mécanique</b>
            </u>
            . Notre engagement est de fournir des solutions de qualité dans ces
            domaines, afin de répondre aux besoins quotidiens des utilisateurs
            et d'améliorer leur qualité de vie.
          </p>
        </div>
        <img src={aboutimg} alt="" />
      </div>

      <div className="part5">
        <h1>Notre Services </h1>

        <div className="part5-1">
          <div className="part5-1child">
            <Link to={`/filtered/${maintenance}`}>
              <img src={maintservice} alt="" />
              <p>technicien de maintenance</p>{" "}
            </Link>
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
        </div>
      </div>
      <div className="part6">
        <h1>Meilleurs avis des clients</h1>
        <div className="part6father">
          <div className="part6-1">
            <div className="part6-1child">
              <img src={client1} alt="" />
              <div>
                <b>test name</b>{" "}
              </div>
            </div>
            <p>
              J'ai récemment utilisé la plateforme ProCell pour trouver un
              plombier pour une fuite robinet dans ma cuisine. Le processus
              s'est déroulé incroyablement bien et j'étais impressionné par la
              qualité du service fourni. je le serai certainement utiliser à
              nouveau cette plate-forme pour de futurs besoins de réparation de
              maison.
            </p>
          </div>
          <div className="part6-1">
            <div className="part6-1child">
              <img src={client2} alt="" />
              <div>
                {" "}
                <b>test name</b>
              </div>
            </div>
            <p>
              En tant que propriétaire occupé, il m'est souvent difficile de
              trouver du temps pour rechercher des fournisseurs de services.
              Heureusement, j'ai découvert la plateforme ProCell, et cela a
              réellement changé la donne ! De la recherche d'un électricien
              digne de confiance à la planification de la maintenance de
              routine, cette plateforme a rendu la gestion de ma maison
              tellement plus facile.
            </p>
          </div>
          <div className="part6-1">
            <div className="part6-1child">
              <img src={client3} alt="" />
              <div>
                {" "}
                <b>test name</b>
              </div>
            </div>
            <p>
              J'avais des doutes quant à l'utilisation d'une nouvelle plateforme
              de services à domicile, mais je suis vraiment ravi de l'avoir
              essayée ! Non seulement j'ai trouvé un paysagiste fantastique pour
              mon projet d'arrière-cour, mais tout le processus de réservation
              s'est déroulé sans aucun problème. De plus, l'équipe du service
              client a été très réactive et serviable. Je la recommande vivement
              !
            </p>
          </div>
          <div className="part6-1">
            <div className="part6-1child">
              <img src={client4} alt="" />
              <div>
                {" "}
                <b>test name</b>
              </div>
            </div>
            <p>
              Ayant eu des expériences mitigées avec les prestataires de
              services à domicile par le passé, j'ai été agréablement surpris
              par le professionnalisme et l'expertise du bricoleur que j'ai
              découvert grâce à la plateforme ProCell. Il est arrivé à l'heure
              convenue, a accompli le travail de manière efficace et a même
              offert des conseils utiles pour l'entretien à venir. Merci d'avoir
              largement dépassé mes attentes !
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
