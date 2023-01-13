import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import "../assets/css/Common.css";
import { useLoadingContext } from "react-router-loading";

const Search = () => {
  const loadingContext = useLoadingContext();
  let { searched } = useParams();

  const [searchedPost, setSearchedPost] = useState([]);
  const [users, setUsers] = useState([]);

  const postCollectionRef = collection(db, "posts");
  const userCollectionRef = collection(db, "users");

  const allPosts = query(postCollectionRef);

  useEffect(() => {
    loadingContext.start();
    document.title = (searched)
    const getAllPosts = async () => {
      const postData = await getDocs(allPosts);
      setSearchedPost(
        postData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      loadingContext.done();
    };

    const getAllUsers = async () => {
      const userData = await getDocs(userCollectionRef);
      setUsers(userData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getAllPosts();
    getAllUsers();
  }, []);

  return (
    <>
      <div className="content">
        <div className="search_content">
          <h5>Showing results for {searched}</h5>
          <div className="search_container">
            <div className="search_result">
              {users
                .filter((user) =>
                  user.username.toLowerCase().match(searched.toLowerCase())
                )
                .map((user) => {
                  return (
                    <Link to={"/user/" + user.username}>
                      <div className="result">
                        <div className="user_result">

                        <h4>{user.username}</h4>
                        </div>
                          {/* <i>{parse(user.description)}</i> */}
                      </div>
                    </Link>
                  );
                })}
              {searchedPost
                .filter((items) =>
                  (items.username + items.title + items.type + items.category)
                    .toLowerCase()
                    .match(searched.toLowerCase())
                )
                .map((post) => {
                  return (
                    <Link
                      to={"/" + post.type + "/" + post.category + "/" + post.id}
                    >
                      <div className="result">
                        <div className="result_img">
                          <img src={post.image} alt="" />
                        </div>
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
