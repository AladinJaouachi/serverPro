import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import imageone from "../../images/slider-img.png";
import repair from "../../images/repair.png";
import improve from "../../images/paint.png";
import maintain from "../../images/maintain.jpg";
import aboutimg from "../../images/about-img.jpg";
import professimag from "../../images/professional-img.png";
import maintservice from "../../images/maintservice.png";
import electricservice from "../../images/electricservice.png";
import plumbingservice from "../../images/plumbingservice.png";
import mechanic from "../../images/repaircar.png";
import architecser from "../../images/architectservice.png";
import hairdressing from "../../images/hairdressing.png";

import "../../css/HomePage.css";
import { Link } from "react-router-dom";

import Dropdown from "react-bootstrap/Dropdown";
import FooterMyApp from "./../FooterMyApp";

const HomePage = () => {
  const [pubs, setpubs] = useState([]);
  const getpubs = async (e) => {
    try {
      const res = await fetch("http://localhost:3001/pubs/allpubs", {
        method: "GET",
      });
      const data = await res.json();
      setpubs(data.Response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getpubs();
  }, []);

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
          Email:example@gmail.com
        </h6>
      </div>

      <div className="part1">
        <div className="part1-1">
          <h3>Title</h3>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact us</li>
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
          <div className="part1-2-1">
            <h1>Repair and Maintenance Services</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
              quibusdam eum id aspernatur. Optio, veniam, corrupti et quam, amet
              quos debitis blanditiis unde in est corporis deleniti iusto eos
              soluta laudantium fugiat possimus ipsa? Distinctio consectetur
              doloribus deleniti reprehenderit eum provident necessitatibus
              ducimus obcaecati dolores accusamus veniam non, natus quia sunt,
              ullam architecto cupiditate eligendi doloremque numquam, vitae
              alias asperiores quae aut mollitia. Non molestias laudantium
              temporibus obcaecati, laboriosam aliquam reprehenderit,
              dignissimos iusto, aut quod atque modi animi maxime nemo error.
              Ipsa illum voluptatum vel praesentium? Molestiae, sunt similique
              soluta impedit molestias repellat itaque hic culpa sapiente! Eius,
              deleniti laboriosam!
            </p>
          </div>
          <img src={imageone} alt="" />
        </div>
      </div>
      <div className="part2">
        <div className="part2-1">
          <img src={repair} alt="" />
          <h5>REPAIR</h5>
        </div>
        <div className="part2-1">
          <img src={improve} alt="" />
          <h5>IMPROVE</h5>
        </div>
        <div className="part2-1">
          <img src={maintain} alt="" />
          <h5>MAINTAIN</h5>
        </div>
      </div>
      <div className="part3">
        <div className="part3-1">
          <h2>About us</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore
            tempore eius, ipsa ipsum repudiandae, facilis nam sequi nesciunt
            soluta, ex natus totam ut asperiores autem earum alias aperiam
            praesentium aliquid.
          </p>
          <button>Read more</button>
        </div>
        <img src={aboutimg} alt="" />
      </div>
      <div className="part4">
        <img src={professimag} alt="" />
        <div className="part4-1">
          <h2>WE PROVIDE PROFESSIONAL HOME SERVICES.</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente
            totam voluptates doloribus, soluta possimus, quia expedita quas
            impedit repellendus earum commodi consequuntur illum atque iste
            dolore ullam quod nam architecto.
          </p>
          <button>Read more</button>
        </div>
      </div>
      <div className="part5">
        <h1>Our Services </h1>

        <div className="part5-1">
          <div className="part5-1child">
            <img src={maintservice} alt="" />
            <p>lorem ipsum dolor sit amet.</p>{" "}
          </div>
          <div className="part5-1child">
            <img src={electricservice} alt="" />{" "}
            <p>Lorem ipsum dolor sit amet.</p>{" "}
          </div>
          <div className="part5-1child">
            <img src={plumbingservice} alt="" />{" "}
            <p>Lorem ipsum dolor sit amet.</p>{" "}
          </div>
          <div className="part5-1child">
            <img src={mechanic} alt="" />
            <p>Lorem ipsum dolor sit amet.</p>{" "}
          </div>
          <div className="part5-1child">
            <img src={architecser} alt="" />
            <p>Lorem ipsum dolor sit amet.</p>{" "}
          </div>
          <div className="part5-1child">
            <img src={hairdressing} alt="" />
            <p>Lorem ipsum dolor sit amet.</p>{" "}
          </div>
        </div>
        <button>Read more</button>
      </div>

      <br />
      <div>nouveautés</div>
      <br />
      <div className="fatherchildren">
        {" "}
        {pubs &&
          pubs.map((pub) => {
            return (
              <div key={pub._id} className="children">
                <img src={pub.image} alt="" />
                <p>{pub.title} </p>
                <p>{pub.content} </p>
              </div>
            );
          })}
      </div>
      <FooterMyApp />
    </div>
  );
};

export default HomePage;
