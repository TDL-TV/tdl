import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { Link } from "react-router-dom";
import "../../assets/css/Contentbox.css";

const Photos = () => {

  const [allPhotos, setAllPhotos] = useState([]);

  const photosCollectionRef = collection(db, "posts");

  const sortAllPhotos = query(
    photosCollectionRef,
    where("type", "==", "photo")
  );

  useEffect(() => {
    const getAllPhotos = async () => {
      const photoData = await getDocs(sortAllPhotos);
      setAllPhotos(
        photoData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
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
                    <Link to={post.category + "/" + post.title}>
                      <img src={post.image} alt={post.title} />
                    </Link>
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
