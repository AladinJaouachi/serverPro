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
import client1 from "../../images/client1.jpeg";
import client2 from "../../images/client2.jpeg";
import client3 from "../../images/client3.jpeg";
import client4 from "../../images/client4.jpeg";

import "../../css/HomePage.css";
import { Link } from "react-router-dom";

import Dropdown from "react-bootstrap/Dropdown";
import FooterMyApp from "./../FooterMyApp";

const HomePage = () => {
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
            <li>Contact us</li>
            <li>
              <Link to={"/userslist"}>Persons</Link>
            </li>{" "}
            <li>
              {" "}
              <Link to={"/news"}>News </Link>
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
      <div className="part3" id="about">
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
      <div className="part6">
        <h1>What our clients says</h1>
        <div className="part6father">
          <div className="part6-1">
            <div className="part6-1child">
              <img src={client1} alt="" />
              <div> name name</div>
            </div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Exercitationem molestias corporis aperiam soluta maiores similique
              aliquam aut voluptates? Molestiae, eveniet.
            </p>
          </div>
          <div className="part6-1">
            <div className="part6-1child">
              <img src={client2} alt="" />
              <div> name name</div>
            </div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Exercitationem molestias corporis aperiam soluta maiores similique
              aliquam aut voluptates? Molestiae, eveniet.
            </p>
          </div>
          <div className="part6-1">
            <div className="part6-1child">
              <img src={client3} alt="" />
              <div> name name</div>
            </div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Exercitationem molestias corporis aperiam soluta maiores similique
              aliquam aut voluptates? Molestiae, eveniet.
            </p>
          </div>
          <div className="part6-1">
            <div className="part6-1child">
              <img src={client4} alt="" />
              <div> name name</div>
            </div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Exercitationem molestias corporis aperiam soluta maiores similique
              aliquam aut voluptates? Molestiae, eveniet.
            </p>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />

      <FooterMyApp />
    </div>
  );
};

export default HomePage;
