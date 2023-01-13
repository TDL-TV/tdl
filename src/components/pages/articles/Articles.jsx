import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLoadingContext } from "react-router-loading";
import { db } from "../../firebase/firebaseConfig";
import ContentBox from "../common/ContentBox";

const Articles = () => {
  const loadingContext = useLoadingContext()
  const [allArticles, setAllArticles] = useState([]);

  const articleCollectionRef = collection(db, "posts");

  const sortArticles = query(
    articleCollectionRef,
    where("type", "==", "articles and blog")
  );

  useEffect(() => {
    document.title = ("Articles and Blog")
    loadingContext.start()
    const getAllArticles = async () => {
      const articleData = await getDocs(sortArticles);
      setAllArticles(
        articleData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      loadingContext.done()
    };
    getAllArticles();
  }, []);

  return (
    <>
      <div className="content">
        <div className="common_container">
          {allArticles.map((post) => {
            return (
              <>
                <ContentBox
                  link={post.category + "/" + post.id}
                  image={post.image}
                  category={post.category}
                  title={post.title}
                  author={post.username}
                  date={post.date}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Articles;
