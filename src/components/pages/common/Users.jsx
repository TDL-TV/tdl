import "../../assets/css/Current.css";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const Users = () => {
  let { username } = useParams();
  const [userContent, setUserContent] = useState([]);
  const [posts, setPosts] = useState([]);

  const postCollectionRef = collection(db, "posts");
  const allPosts = query(postCollectionRef);

  const userPosts = query(postCollectionRef, where("username", "==", username));

  useEffect(() => {
    const getUserPosts = async () => {
      const postData = await getDocs(userPosts);
      setUserContent(
        postData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    const getAllPosts = async () => {
      const postData = await getDocs(allPosts);
      setPosts(postData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUserPosts();
    getAllPosts();
  }, []);

  return (
    <div>
      <div className="current_box">
        <div className="user_div">
          {userContent.map((post) => {
            return (
              <>
                <Link
                  to={"/" + post.type + "/" + post.category + "/" + post.title}
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
          <div className="related_box">
            {posts.map((post) => {
              return (
                <>
                  <Link
                    to={
                      "/" + post.type + "/" + post.category + "/" + post.title
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
