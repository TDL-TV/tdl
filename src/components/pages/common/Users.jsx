import "../../assets/css/Current.css";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useLoadingContext } from "react-router-loading";
import parse from "html-react-parser";

const Users = () => {
  const loadingContext = useLoadingContext()
  let { username } = useParams();
  const [userContent, setUserContent] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currentUserData, setUserData] = useState([])

  const postCollectionRef = collection(db, "posts");
  const userCollectionRef = collection(db, "users");
  const allPosts = query(postCollectionRef);

  const userPosts = query(postCollectionRef, where("username", "==", username));
  const userDescription = query(userCollectionRef, where("username", "==", username))

  useEffect(() => {
    loadingContext.start()
    document.title = username
    const getUserPosts = async () => {
      const postData = await getDocs(userPosts);
      setUserContent(
        postData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    const getUserData = async () => {
      const userData = await getDocs(userDescription)
      setUserData(
        userData.docs.map((doc) => ({...doc.data(), id: doc.id}))
      )
    }

    const getAllPosts = async () => {
      const postData = await getDocs(allPosts);
      setPosts(postData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      loadingContext.done()
    };

    getUserPosts();
    getAllPosts();
    getUserData()
  }, []);

  return (
    <div className="usercontent_div">
          {currentUserData.map((user) => {
            return (
              <div className="post_description">
                <h2>{user.username}</h2>
                <p>{parse(user.description)}</p>
              </div>
            )
          })}

      <div className="currentuser_box">
        <div className="user_div">
          {userContent.map((post) => {
            return (
              <>
                <Link
                  to={"/" + post.type + "/" + post.category + "/" + post.id}
                >

               

                  <div className="userpost_div">
                    <div className="userpost_img">
                      <img src={post.image} alt={post.title} />
                    </div>
                    <div className="userpost_description">
                      <p>{post.category}</p>
                      <h4>{post.title}</h4>
                      <p>{post.date}</p>
                    </div>
                  </div>
                </Link>
              </>
            );
          })}
        </div>

        <div className="related_container">
          <h3>More Posts</h3>
          <div className="related_box">
            {posts.map((post) => {
              return (
                <>
                  <Link
                    to={
                      "/" + post.type + "/" + post.category + "/" + post.id
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

export default Users;
