import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { Link } from "react-router-dom";
import "../../assets/css/Contentbox.css";
import { useLoadingContext } from "react-router-loading";

const Photos = () => {
  const loadingContext = useLoadingContext()
  const [allPhotos, setAllPhotos] = useState([]);

  const photosCollectionRef = collection(db, "posts");

  const sortAllPhotos = query(
    photosCollectionRef,
    where("type", "==", "photo")
  );

  useEffect(() => {
    loadingContext.start()
    document.title = ("Photos")
    const getAllPhotos = async () => {
      const photoData = await getDocs(sortAllPhotos);
      setAllPhotos(
        photoData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      loadingContext.done()
    };

    getAllPhotos();
  }, []);

  // All Photos

  return (
    <>
      <div className="content">
        <div className="photo_container">
          {allPhotos.map((post) => {
            return (
              <>
                <div className="photo_box">
                  <div className="photo_img">
                    <Link to={post.category + "/" + post.id}>
                      <img src={post.image} alt={post.title} />
                    </Link>
                  </div>
                  <div className="photo_text">
                    <div className="phototext_title">
                      <Link to={"/user/" + post.username}>
                        <h4>{post.title}</h4>
                        <p>{post.username}</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Photos;
