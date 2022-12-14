import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../../assets/css/Home.css";
import "../../assets/css/Contentbox.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import ContentBox from "../common/ContentBox";

const Home = () => {
  const postCollectionRef = collection(db, "posts");
  const [sortedPosts, setSortedPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  const AllPosts = query(postCollectionRef);

  const sortLatest = query(postCollectionRef, orderBy("date"), limit(6));

  useEffect(() => {
    const getLatestPosts = async () => {
      const postData = await getDocs(sortLatest);
      setSortedPosts(
        postData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    const getAllPosts = async () => {
      const postData = await getDocs(AllPosts);
      setAllPosts(postData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getLatestPosts();
    getAllPosts();
  }, []);

  var settings = {
    // dots: true,
    speed: 2000,
    slidesToShow: 5,
    slidesToScroll: 3,
    initialSlide: 0,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          // dots: true
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    // <div className="content">
    <div className="home_container">
      <h3>Latest posts</h3>
      <div className="latest_container">
        <Slider {...settings}>
          {sortedPosts.map((post) => {
            return (
              <>
                <div className="latestimg_div">
                  <Link
                    to={post.type + "/" + post.category + "/" + post.title}
                  >
                    <div className="img">
                      <img src={post.image} alt={post.title} />
                    </div>
                    <div className="latest_description">
                      <h4>{post.category}</h4>
                      <h3>{post.title}</h3>
                      <div className="posts_date">
                        <p>{post.username}</p>
                        {/* <i>{post.date}</i> */}
                      </div>
                    </div>
                  </Link>
                </div>
              </>
            );
          })}
        </Slider>
      </div>

    <div className="homecontent_container">

  
      Thinkers
      <div className="thinkers_container">
        {allPosts
          .filter((post) => post.category === "News and Events")
          .map((post) => {
            return (
              <>
                <ContentBox
                  link={post.type + "/" + post.category + "/" + post.title}
                  image={post.image}
                  category={post.category}
                  title={post.title}
                  author={post.username}
                  date={post.date}
                />
              </>
            );
          })}
      </div>
      Doersdgfhgtf
      <div className="thinkers_container">
        {allPosts.map((post) => {
          return (
            <>
              <ContentBox
                link={post.type + "/" + post.category + "/" + post.title}
                image={post.image}
                category={post.category}
                title={post.title}
                author={post.username}
                date={post.date}
              />
            </>
          );
        })}
      </div>
      Leaders
      <div className="thinkers_container">
        {allPosts.map((post) => {
          return (
            <>
              <ContentBox
                link={post.type + "/" + post.category + "/" + post.title}
                image={post.image}
                category={post.category}
                title={post.title}
                author={post.username}
                date={post.date}
              />
            </>
          );
        })}
      </div>
      </div>
      <div className="events_container"></div>
    </div>
  );
};

export default Home;
