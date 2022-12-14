import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import "../assets/css/Common.css";

const Search = () => {
  let { searched } = useParams();

  const [searchedPost, setSearchedPost] = useState([]);

  const postCollectionRef = collection(db, "posts");

  const allPosts = query(postCollectionRef);

  //   const filteredSearch = searchedPost.filter((post) =>
  //     post.title.toLowerCase().includes(searched)
  //   );

  console.log(searched);

  //   console.log(filteredSearch)

  useEffect(() => {
    const getAllPosts = async () => {
      const postData = await getDocs(allPosts);
      setSearchedPost(
        postData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getAllPosts();
  }, []);

  return (
    <>
      <div className="content">
        <div>
          <h5>Showing results for {searched}</h5>

          <div className="search_container">
            <div className="search_result">
              {searchedPost
                .filter((items) =>
                  (items.username + items.title + items.type + items.category)
                    .toLowerCase()
                    .match(searched.toLowerCase())
                )
                .map((post) => {
                  return (
                    <Link
                      to={
                        "/" + post.type + "/" + post.category + "/" + post.title
                      }
                    >
                      <div className="result">
                        <img src={post.image} alt="" />
                        <div className="result_description">
                          <h4>{post.title}</h4>
                          <p>{post.category}</p>
                          <p>{post.username}</p>
                          <div>
                            <p>{post.type}</p>
                            <i>{post.date}</i>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
