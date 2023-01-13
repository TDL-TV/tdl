import { collection, getDocs, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import "../../assets/css/Current.css";
import parse from "html-react-parser";
import { useLoadingContext } from "react-router-loading";

const ArticleContent = () => {
  const loadingContext = useLoadingContext()
  let { id, category } = useParams();

  const [allPosts, setAllPosts] = useState([]);

  const postCollectionRef = collection(db, "posts");

  const sortPosts = query(postCollectionRef);

  useEffect(() => {

    document.title = (category)
    loadingContext.start()
    const getAllPosts = async () => {
      const postData = await getDocs(sortPosts);
      setAllPosts(postData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      loadingContext.done()
    };

    getAllPosts();
  }, []);

  return (
    <div className="current_box">
      {allPosts
        .filter((data) => data.type === "articles and blog")
        .filter((data) => data.id === id)
        .map((post) => {
          document.title = (post.username+" - "+post.title)
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
                    <p>{post.category}</p>
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
            .filter((data) => data.id !== id)
            .map((post) => {
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
                        <h4>{post.title}</h4>
                        <i>{ post.username+" - "+post.type}</i>
                        <div className="date">
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
  );
};

export default ArticleContent;
