import { collection, getDocs, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import { useParams, Link } from "react-router-dom";
import "../../assets/css/Current.css";
import parse from "html-react-parser";

const VideoContent = () => {
  let { title, category } = useParams();

  const [allPostVideos, setAllPostVideo] = useState([]);

  const videoCollectionRef = collection(db, "posts");

  const allVideos = query(videoCollectionRef);

  useEffect(() => {
    const getAllPosts = async () => {
      const postData = await getDocs(allVideos);
      setAllPostVideo(
        postData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getAllPosts();
  }, []);

  return (
    <div>
      <div className="current_box">
        {allPostVideos
          .filter((data) => data.type === "video")
          .filter((data) => data.title === title)
          .map((post) => {
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
              .filter((data) => data.title !== title)
              .map((post) => {
                return (
                  <>
                    <Link
                      to={
                        "/" + post.type + "/" + post.category + "/" + post.title
                      }
                    >
                      <div className="related_div">
                        <div className="related_img">
                          <img src={post.image} alt={post.title} />
                        </div>
                        <div className="related_description">
                          <p>{post.category}</p>
                          <h4>{post.title}</h4>
                          <div className="date">
                            <p>{post.username}</p>
                            <p>{post.date}</p>
                          </div>
                          <i>{post.type}</i>
                        </div>
                      </div>
                    </Link>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoContent;
