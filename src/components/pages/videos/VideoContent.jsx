import { collection, getDocs, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import { useParams, Link } from "react-router-dom";
import "../../assets/css/Current.css";
import parse from "html-react-parser";
import { useLoadingContext } from "react-router-loading";

const VideoContent = () => {
  let { id, category } = useParams();

  const loadingContext = useLoadingContext();
  const [allPostVideos, setAllPostVideo] = useState([]);

  const videoCollectionRef = collection(db, "posts");
  const [userName, setUserName] = useState("");

  const allVideos = query(videoCollectionRef);

  

  useEffect(() => {


    loadingContext.start();
    const getAllPosts = async () => {
      const postData = await getDocs(allVideos);
      setAllPostVideo(
        postData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      loadingContext.done();
    };

    getAllPosts();
  }, []);

  return (
    <div>
      <div className="current_box">
        {allPostVideos
          .filter((data) => data.type === "video")
          .filter((data) => data.id === id)
          .map((post) => {
            // (setUserName(post.title));
            document.title = (post.username+" - "+post.title)
            return (
              <>
                <div className="content_div">
                  <div className="current_video">
                    <div className="video_box">{parse(post.youtube)}</div>
                  </div>
                  <div className="current_description">
                    <h3>{post.title}</h3>
                    <div className="post_date">
                      <Link to={"/user/" + post.username}>
                        <p>{post.username}</p>
                      </Link>
                      <p>{post.date}</p>
                      <p>{post.category}</p>
                    </div>

                    <h4>Description</h4>
                    <p className="post_description">
                      {parse(post.description)}
                    </p>
                  </div>
                </div>
              </>
            );
          })}

        {/* Related Box */}

        <div className="related_container">
          <h3>Related Posts</h3>
          <div className="related_box">
            {allPostVideos
              .filter((data) => data.category === category)
              .filter((data) => data.id !== id)
              .map((post) => {
                return (
                  <>
                    <Link
                      to={"/" + post.type + "/" + post.category + "/" + post.id}
                    >
                      <div className="related_div">
                        <div className="related_img">
                          <img src={post.image} alt={post.title} />
                        </div>
                        <div className="related_description">
                          <h4>{post.title}</h4>
                          <i>{post.username + " - " + post.type}</i>
                          <div className="date">
                            <p>{post.date}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </>
                );
              })}

            {/* {allPostVideos
              .filter((data) => data.username === userName)
              .map((post) => {
                return (
                  <>
                    <Link
                      to={"/" + post.type + "/" + post.category + "/" + post.id}
                    >
                      <div className="related_div">
                        <div className="related_img">
                          <img src={post.image} alt={post.title} />
                        </div>
                        <div className="related_description">
                          <h4>{post.title}</h4>
                          <i>{post.username + " - " + post.type}</i>
                          <div className="date">
                            <p>{post.date}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </>
                );
              })} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoContent;
