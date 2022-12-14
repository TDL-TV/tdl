import { collection, getDocs, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import "../../assets/css/Current.css";
import parse from "html-react-parser";

const ArticleContent = () => {
  let { title, category } = useParams();

  const [allPosts, setAllPosts] = useState([]);

  const postCollectionRef = collection(db, "posts");

  const sortPosts = query(postCollectionRef);

  useEffect(() => {
    const getAllPosts = async () => {
      const postData = await getDocs(sortPosts);
      setAllPosts(postData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getAllPosts();
  }, []);

  return (
    <div className="current_box">
      {allPosts
        .filter((data) => data.type === "articles and blog")
        .filter((data) => data.title === title)
        .map((post) => {
          return (
            <>
              <div className="content_div">
                <div className="current_view">
                  <div className="articleimg_box">
                    <img src={post.image} alt={post.title} />
                  </div>
                </div>
                <div className="current_description">
                  <h3>{post.title}</h3>
                  <div className="post_date">
                    <Link to={"/user/" + post.username}>
                      <p>{post.username}</p>
                    </Link>
                    <p>{post.date}</p>
                  </div>
                  <h4>Description</h4>
                  <p className="post_description">{parse(post.description)}</p>
                </div>
              </div>
            </>
          );
        })}

      {/* Related Box */}
      <div className="related_container">
        <h3>Related Posts</h3>
        <div className="related_box">
          {allPosts
            .filter((data) => data.category === category)
            .filter((data) => data.title !== title)
            .map((post) => {
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
                        <i>{post.type}</i>
                      </div>
                    </div>
                  </Link>
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ArticleContent;
