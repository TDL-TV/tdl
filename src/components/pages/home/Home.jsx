import {
  collection,
  getDocs,
  limit,
  orderBy,
  query
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
import { useLoadingContext } from "react-router-loading";

const Home = () => {
  const loadingContext = useLoadingContext();

  const postCollectionRef = collection(db, "posts");
  const [sortedPosts, setSortedPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  const AllPosts = query(postCollectionRef);

  const sortLatest = query(postCollectionRef, orderBy("createdAt", "desc"),  limit(6));

  useEffect(() => {
    loadingContext.start();
    document.title = ("TDL TV")

    const getLatestPosts = async () => {
      const postData = await getDocs(sortLatest);
      setSortedPosts(
        postData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    const getAllPosts = async () => {
      const postData = await getDocs(AllPosts);
      setAllPosts(postData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      loadingContext.done();
    };

    getLatestPosts();
    getAllPosts();
  }, []);

  var settings = {
    // dots: true,
    speed: 6000,
    slidesToShow: 5,
    slidesToScroll: 3,
    initialSlide: 0,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
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

  var setting = {
    // dots: true,
    // speed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    infinite: true,
    // autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          // dots: true
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="home_container">
      <div className="latest_container">
        <h3>Latest posts</h3>
        <Slider {...settings}>
          {sortedPosts.map((post) => {
            return (
              <>
                <div className="latestimg_div">
                  <Link to={post.type + "/" + post.category + "/" + post.id}>
                    <div className="img">
                      <img src={post.image} alt={post.title} />
                    </div>
                    <div className="latest_description">
                      {/* <h4>{post.category}</h4> */}
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
      <p className="featured-p">

        TDL Featured
      </p>
      <div className="featured_container">
        <Slider {...setting}>

          {allPosts
            .filter(
              (post) =>
              post.username === "Media Club"
              )
              .map((photo) => {
                return (
                  <>
                <div className="cover_photocontainer">
                  <div className="photocover">
                    <div className="picture_container">
                      <picture className="picture_img">
                        <img src={photo.image} />
                      </picture>
                    </div>
                    <div className="cover_description">
                      <div className="cover_1">
                        <div className="category_text">
                          <h1>{photo.title}</h1>
                        </div>
                        <div className="title_text">
                          Photo by&nbsp;
                          <Link to={"/user/" + photo.username}>
                            {" " + photo.username}
                          </Link>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                  {/* <ContentBox
                    link={post.type + "/" + post.category + "/" + post.id}
                    image={post.image}
                    category={post.category}
                    title={post.title}
                    author={post.username}
                    date={post.date}
                  /> */}
                </>
              );
            })}
            </Slider>
        </div>


      <div className="homecontent_container">


        Thinkers
        <div className="thinkers_container">
          {allPosts
            .filter(
              (post) =>
                post.category === "Educational" ||
                post.category ==="News and Events"
            )
            .map((post) => {
              return (
                <>
                  <ContentBox
                    link={post.type + "/" + post.category + "/" + post.id}
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

        Doers
        <div className="thinkers_container">
          {allPosts
            .filter(
              (post) =>
                post.category === "Sports" ||
                post.category === "Clubs and Societies"
            )
            .map((post) => {
              return (
                <>
                  <ContentBox
                    link={post.type + "/" + post.category + "/" + post.id}
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
          {allPosts
            .filter(
              (post) =>
                post.category === "Arts and Lifestyle" ||
                post.category === "Innovation"
            )
            .map((post) => {
              return (
                <>
                  <ContentBox
                    link={post.type + "/" + post.category + "/" + post.id}
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
