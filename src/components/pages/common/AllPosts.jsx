import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLoadingContext } from "react-router-loading";
import { db } from "../../firebase/firebaseConfig";
import ContentBox from "./ContentBox";

const AllPosts = () => {
  const loadingContext = useLoadingContext()
  let { category } = useParams();
  const [posts, setPosts] = useState([]);

  const postCollectionRef = collection(db, "posts");

  const sortPosts = query(postCollectionRef, where("category", "==", category));

  useEffect(() => {
    loadingContext.start()
    document.title = (category)
    const getAllPosts = async () => {
      const postData = await getDocs(postCollectionRef);
      setPosts(postData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      loadingContext.done()
    };
    getAllPosts();
  }, []);

  return (
    <div className="home_content">
      <div className="home-content_container">
        {posts
          .filter((post) => post.category === category)
          .map((post) => {
            return (
              <>
                <ContentBox
                  category={post.category}
                  title={post.title}
                  image={post.image}
                  author={post.username}
                  date={post.date}
                  link={"/"+post.type + "/" + post.category + "/" + post.id}
                />
              </>
            );
          })}
      </div>
    </div>
  );
};

export default AllPosts;
