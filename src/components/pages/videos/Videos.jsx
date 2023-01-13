import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import "../../assets/css/Contentbox.css";
import "../../assets/css/Common.css";
import ContentBox from "../common/ContentBox";
import { useLoadingContext } from "react-router-loading";


const Videos = () => {
    const loadingContext = useLoadingContext()
  const [allVideos, setAllVideos] = useState([]);

  const videoCollectionRef = collection(db, "posts");

  const sortAllVideos = query(videoCollectionRef, where("type", "==", "video"));

  useEffect(() => {
    loadingContext.start()
    document.title = ("Videos")
    const getAllVideos = async () => {
      const videoData = await getDocs(sortAllVideos);
      setAllVideos(
        videoData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      loadingContext.done()
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
                  link={post.category + "/" + post.id}
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
