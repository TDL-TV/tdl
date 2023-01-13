import { collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import "../assets/css/Navbar.css";
import { db } from "../firebase/firebaseConfig";
import Themebtn from "./Themebtn";

const Sidebar = (props) => {
  return (
    <>
    {/* <h5><Themebtn text="Change theme "/> </h5> */}
      <h3>Thinkers</h3>
      <li onClick={props.onClick}>
        <Link to="/News and Events"> News and events</Link>
      </li>
      {/* <li>
        <Link> The nerd show </Link>
      </li> */}
      <li onClick={props.onClick}>
        <Link to="/Educational">Class materials </Link>
      </li>

      <h3>
        <Link> Doers </Link>
      </h3>
      <li onClick={props.onClick}>
        <Link to="/Sport">Sports </Link>
      </li>
      {/* <li onClick={props.onClick}>
        <Link to="/Arts and Lifestyle">Arts </Link>
      </li> */}
      <li onClick={props.onClick}>
        <Link to="/Clubs and Societies">Clubs & Societies</Link>
      </li>

      <h3>
        <Link>Leaders</Link>
      </h3>
      <li onClick={props.onClick}>
        <Link to="/Arts and Lifestyle">Lifestyle</Link>
      </li>
      <li onClick={props.onClick}>
        <Link to="/Innovation">Innovation</Link>
      </li>

    </>


  );
};

export default Sidebar;
