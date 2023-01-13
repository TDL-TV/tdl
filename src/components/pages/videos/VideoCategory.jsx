import {  useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import ContentBox from "../common/ContentBox";
import { useLoadingContext } from "react-router-loading";

const VideoCategory = () => {
  const loadingContext = useLoadingContext()
  let { category } = useParams();

  const [sortedVideos, setSortedVideos] = useState([]);

  const videoCollectionRef = collection(db, "posts");

  const sortByCategory = query(
    videoCollectionRef,
    where("type", "==", "video")
  );

  useEffect(() => {
    document.title = ("Video - "+category)
    loadingContext.start()
    const getSortedVideos = async () => {
      const videoData = await getDocs(sortByCategory);
      setSortedVideos(
        videoData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      loadingContext.done()
    };

    getSortedVideos();
  }, []);

  return (
    <>
      <div className="content">
        <div className="common_container">
          {sortedVideos
            .filter((data) => data.category === category)
            .map((post) => {
              return (
                <>
                  <ContentBox
                    link={post.id}
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

export default VideoCategory;
