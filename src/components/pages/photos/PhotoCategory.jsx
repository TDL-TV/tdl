import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { Link, useParams } from "react-router-dom";
import "../../assets/css/Contentbox.css";

const PhotoCategory = () => {
  let { category } = useParams(); 

  const [sortedPhotos, setSortedPhotos] = useState([]);

  const photosCollectionRef = collection(db, "posts");

  const sortByCategory = query(
    photosCollectionRef,
    where("type", "==", "photo")
  );

  useEffect(() => {
    const getSortedPhotos = async () => {
      const photoData = await getDocs(sortByCategory);
      setSortedPhotos(
        photoData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getSortedPhotos();
  }, []);

  return (
    <div className="content">
      <div className="photo_container">
        <>
          {sortedPhotos
            .filter((data) => data.category === category)
            .map((post) => {
              return (
                <>
                  <div className="photo_box">
                    <div className="photo_img">
                      <Link to={post.title}>
                        <img src={post.image} alt={post.title} />
                      </Link>
                    </div>
                  </div>
                </>
              );
            })}
        </>
      </div>
    </div>
  );
};

export default PhotoCategory;
