import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import "../../assets/css/Contentbox.css";
import "../../assets/css/Common.css";
import ContentBox from "../common/ContentBox";


const Videos = () => {
  const [allVideos, setAllVideos] = useState([]);

  const videoCollectionRef = collection(db, "posts");

  const sortAllVideos = query(videoCollectionRef, where("type", "==", "video"));

  useEffect(() => {
    const getAllVideos = async () => {
      const videoData = await getDocs(sortAllVideos);
      setAllVideos(
        videoData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getAllVideos();
  }, []);

  return (
    <>
      <div className="content">
        <div className="common_container">
          {allVideos.map((post) => {
            return (
              <>
                <ContentBox
                  link={post.category + "/" + post.title}
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
    </>
  );
};

export default Videos;
