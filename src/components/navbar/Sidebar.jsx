import { collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import "../assets/css/Navbar.css";
import { db } from "../firebase/firebaseConfig";
import Themebtn from "./Themebtn";

const Sidebar = () => {
  return (
    <>
    {/* <h5><Themebtn text="Change theme "/> </h5> */}
      <h3>Thinkers</h3>
      <li>
        <Link> News and events</Link>
      </li>
      <li>
        <Link> The nerd show </Link>
      </li>
      <li>
        <Link>Class materials </Link>
      </li>

      <h3>
        <Link> Doers </Link>
      </h3>
      <li>
        <Link>Sports </Link>
      </li>
      <li>
        <Link>Arts </Link>
      </li>
      <li>
        <Link>Clubs & Societies</Link>
      </li>

      <h3>
        <Link>Leaders</Link>
      </h3>
      <li>
        <Link>Lifestyle</Link>
      </li>
      <li>
        <Link>Innovation</Link>
      </li>

    </>


  );
};

export default Sidebar;
