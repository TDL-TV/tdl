import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { Link, useParams } from "react-router-dom";
import "../../assets/css/Contentbox.css";
import { useLoadingContext } from "react-router-loading";

const PhotoCategory = () => {
  const loadingContext = useLoadingContext();
  let { category } = useParams();

  const [sortedPhotos, setSortedPhotos] = useState([]);
  const [coverPhotos, setCoverPhotos] = useState([]);

  const photosCollectionRef = collection(db, "posts");

  const sortByCategory = query(
    photosCollectionRef,
    where("type", "==", "photo")
  );

  const coverPhoto = query(
    photosCollectionRef,
    where("type", "==", "photo")
    // orderBy("username")
  );

  useEffect(() => {
    loadingContext.start();
    document.title = (category)
    const getSortedPhotos = async () => {
      const photoData = await getDocs(sortByCategory);
      setSortedPhotos(
        photoData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    const getCoverPhoto = async () => {
      const photoData = await getDocs(coverPhoto);
      setCoverPhotos(
        photoData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      loadingContext.done();
    };
    getSortedPhotos();
    getCoverPhoto();
  }, []);

  return (
    <>
      <div className="content">
        <div>
          {coverPhotos

            .filter((post) => post.category === category)
            .slice(0, 1)
            .map((photo) => {
              return (
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
                          <h1>{category}</h1>
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
              );
            })}
          <h3>{category}</h3>
          <div className="photo_container">
            <>
              {sortedPhotos
                .filter((data) => data.category === category)
                .map((post) => {
                  return (
                    <>
                      <div className="photo_box">
                        <div className="photo_img">
                          <Link to={post.id}>
                            <img src={post.image} alt={post.title} />
                          </Link>
                        </div>
                        <div className="photo_text">
                          <Link to={"/user/" + post.username}>
                            <h4>{post.title}</h4>
                            <p>{post.username}</p>
                          </Link>
                        </div>
                      </div>
                    </>
                  );
                })}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotoCategory;
