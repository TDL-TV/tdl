import { Link } from "react-router-dom";
import Slider from "react-slick";
import "../assets/css/Navbar.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  RiMenu2Fill,
  RiCloseLine,
  RiSearch2Line,
  RiSearchLine,
  RiApps2Line,
  RiAppsLine,
} from "react-icons/ri";
import Sidebar from "./Sidebar";
import Themebtn from "./Themebtn";
import Tdllogo from "../assets/images/tdllogo.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const Navbar = () => {
  const navigate = useNavigate();

  const [home, setHome] = useState(false);
  const [photos, setPhotos] = useState(false);
  const [videos, setVideos] = useState(false);
  const [articles, setArticles] = useState(false);

  const [sidebar, setSidebar] = useState(false);

  const [searchInput, setSearchInput] = useState("");

  const [toggleSearch, setToggleSearch] = useState(false);

  function homeClicked() {
    setPhotos(false);
    setVideos(false);
    setArticles(false);
    setHome(true);
  }

  function photosClicked() {
    setHome(false);
    setVideos(false);
    setArticles(false);
    setPhotos(true);
  }

  function videosClicked() {
    setHome(false);
    setArticles(false);
    setPhotos(false);
    setVideos(true);
  }

  function articlesClicked() {
    setHome(false);
    setVideos(false);
    setPhotos(false);
    setArticles(true);
  }

  useEffect(() => {
    setHome(true);
  }, []);

  // Slider
  var settings = {
    // dots: true,
    infinite: false,
    speed: 500,
    className: "slider variable-width",
    slidesToShow: 10,
    slidesToScroll: 10,
    initialSlide: 0,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          // infinite: true,
          // dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  const photoCategories = [
    "News & Events",
    "Sports",
    "Clubs & Societies",
    "Arts & Lifestyle",
    "Product",
    "Nature",
    "Potrait",
  ];

  const [categories, setCategories] = useState([]);

  const [allPosts, setAllPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const categoryCollectionRef = collection(db, "categories");
  const postCollectionRef = collection(db, "posts");
  const usersCollectionRef = collection(db, "users");

  document.body.addEventListener("click", function () {
    setToggleSearch(false);
  });

  console.log(searchInput);

  useEffect(() => {
    const getCategories = async () => {
      const categoryData = await getDocs(categoryCollectionRef);
      setCategories(
        categoryData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    const getPosts = async () => {
      const postData = await getDocs(postCollectionRef);
      setAllPosts(postData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getUsers = async () => {
      const userData = await getDocs(usersCollectionRef);
      setAllUsers(userData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getCategories();
    getPosts();
    getUsers();
  }, []);

  return (
    <>
      <div className="nav_container">
        {/* Home Content */}

        {sidebar ? (
          <>
            <div className="menu_icon">
              <RiCloseLine
                size={30}
                onClick={() => {
                  setSidebar(false);
                }}
              />
            </div>

            <div className="side_bar">
              <div className="side_container">
                <Themebtn text="Change theme" />
                {home ? (
                  <>
                    <div className="active_link">
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                    </div>
                  </>
                ) : (
                  <li onClick={homeClicked}>
                    <Link to="/">Home</Link>
                  </li>
                )}

                {/* Photo Content */}

                {photos ? (
                  <>
                    <div className="active_link">
                      <li>
                        <Link to="/photo">Photos</Link>
                      </li>
                    </div>
                  </>
                ) : (
                  <li onClick={photosClicked}>
                    <Link to="/photo">Photos</Link>
                  </li>
                )}

                {/* Video Content */}
                {videos ? (
                  <>
                    <div className="active_link">
                      <li>
                        <Link to="/video">Videos</Link>
                      </li>
                    </div>
                  </>
                ) : (
                  <li onClick={videosClicked}>
                    <Link to="/video">Videos</Link>
                  </li>
                )}

                {/* Articles Content */}
                {articles ? (
                  <>
                    <div className="active_link">
                      <li>
                        <Link to="/articles and blog">Articles & Blog</Link>
                      </li>
                    </div>
                  </>
                ) : (
                  <li onClick={articlesClicked}>
                    <Link to="/articles and blog">Articles & Blog</Link>
                  </li>
                )}
                <Sidebar />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="menu_icon">
              <RiMenu2Fill
                size={25}
                onClick={() => {
                  setSidebar(true);
                }}
              />
            </div>
          </>
        )}

        <div className="logo">
          <img src={Tdllogo} />
        </div>

        <form
          className="search_form"
          onSubmit={() => {
            setToggleSearch(false);
            navigate(`${"/search/"}${searchInput}`);
          }}
        >
          <input
            type="search"
            value={searchInput}
            className="search_bar"
            placeholder="Search TDL"
            onChange={(event) => {
              setSearchInput(event.target.value);
              setToggleSearch(true);
            }}
          />
          <button type="submit">
            <RiSearch2Line />
          </button>
          {toggleSearch ? (
            <>
              <div className="suggestion_box">
                <RiCloseLine
                  style={{ cursor: "pointer" }}
                  size={23}
                  onClick={() => {
                    setToggleSearch(false);
                  }}
                />
                {allUsers
                  .filter((items) =>
                    items.username
                      .toLowerCase()
                      .match(searchInput.toLowerCase())
                  )
                  .map((post) => {
                    return (
                      <>
                        <Link to={"/search/" + post.username}>
                          <li
                            onClick={(event) => {
                              setSearchInput(event.target.innerText);
                              setToggleSearch(false);
                            }}
                          >
                            {post.username} <RiSearchLine />
                          </li>
                        </Link>
                      </>
                    );
                  })}
                {allPosts
                  .filter((items) =>
                    (items.username + items.title + items.type + items.category)
                      .toLowerCase()
                      .match(searchInput.toLowerCase())
                  )
                  .map((post) => {
                    return (
                      <>
                        <Link to={"/search/" + post.title}>
                          <li
                            onClick={(event) => {
                              setSearchInput(event.target.innerText);
                              setToggleSearch(false);
                            }}
                          >
                            {post.title}
                            <RiSearchLine />
                          </li>
                        </Link>
                      </>
                    );
                  })}
              </div>
            </>
          ) : (
            <></>
          )}
        </form>

        <Themebtn size={35} />

        {/* <label htmlFor="show_nav" className="show_nav">
          <RiApps2Line size={27} />
        </label> */}

        {/* <input type="checkbox" id="show_nav" /> */}
        <div className="right_nav">
          {home ? (
            <>
              <div className="active_link">
                <li className="rightnav_links">
                  <Link to="/">Home</Link>
                </li>
              </div>

              <div className="nav_list">
                <Slider {...settings}>
                  {categories.map((category) => {
                    return (
                      <li>
                        <Link to={"/" + category.tag}>{category.tag}</Link>
                      </li>
                    );
                  })}
                </Slider>
              </div>
            </>
          ) : (
            <li className="rightnav_links" onClick={homeClicked}>
              <Link to="/">Home</Link>
            </li>
          )}

          {/* Photo Content */}

          {photos ? (
            <>
              <div className="active_link">
                <li className="rightnav_links">
                  <Link to="/photo">Photos</Link>
                </li>
              </div>

              <div className="nav_list">
                <Slider {...settings}>
                  {categories.map((name) => {
                    return (
                      <li>
                        <Link to={"photo/" + name.tag}>{name.tag}</Link>
                      </li>
                    );
                  })}
                </Slider>
              </div>
            </>
          ) : (
            <li className="rightnav_links" onClick={photosClicked}>
              <Link to="/photo">Photos</Link>
            </li>
          )}

          {/* Video Content */}
          {videos ? (
            <>
              <div className="active_link">
                <li className="rightnav_links">
                  <Link to="/video">Videos</Link>
                </li>
              </div>

              <div className="nav_list">
                <Slider {...settings}>
                  {categories.map((name) => {
                    return (
                      <li>
                        <Link to={"video/" + name.tag}>{name.tag}</Link>
                      </li>
                    );
                  })}
                </Slider>
              </div>
            </>
          ) : (
            <li className="rightnav_links" onClick={videosClicked}>
              <Link to="/video">Videos</Link>
            </li>
          )}

          {/* Articles Content */}
          {articles ? (
            <>
              <div className="active_link">
                <li className="rightnav_links">
                  <Link to="/articles and blog">Articles & Blog</Link>
                </li>
              </div>

              <div className="nav_list">
                <Slider {...settings}>
                  {categories.map((name) => {
                    return (
                      <li>
                        <Link to={"articles and blog/" + name.tag}>
                          {name.tag}
                        </Link>
                      </li>
                    );
                  })}
                </Slider>
              </div>
            </>
          ) : (
            <li className="rightnav_links" onClick={articlesClicked}>
              <Link to="/articles and blog">Articles & Blog</Link>
            </li>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
