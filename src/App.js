import { Route, Routes } from "react-router-loading";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Articles from "./components/pages/articles/Articles";
import Home from "./components/pages/home/Home";
import Photos from "./components/pages/photos/Photos";
import Videos from "./components/pages/videos/Videos";

import "./components/assets/fonts/SlimJoe.otf"
import PhotoCategory from "./components/pages/photos/PhotoCategory";
import PhotoContent from "./components/pages/photos/PhotoContent";
import Users from "./components/pages/common/Users";
import VideoContent from "./components/pages/videos/VideoContent";
import VideoCategory from "./components/pages/videos/VideoCategory";
import ArticleContent from "./components/pages/articles/ArticleContent";
import ArticleCategory from "./components/pages/articles/ArticleCategory";
import AllPosts from "./components/pages/common/AllPosts";
import Search from "./components/navbar/Search";
import { topbar } from 'react-router-loading'

topbar.config({
  barColors: {
    0: 'rgb(0, 214, 214)',
    .3: 'rgb(255, 2, 128)',
    1.0: 'rgb(255, 0, 0)'
},
})

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photo" element={<Photos />} />
          <Route path="/video" element={<Videos />} />
          <Route path="/articles and blog" element={<Articles />} />

          {/* Home */}
          <Route path="/:category" element={<AllPosts />} />

          {/* Photos */}
          <Route path="/photo/:category" element={<PhotoCategory />} />
          <Route path="/photo/:category/:id" element={<PhotoContent />} />

          {/* Videos */}
          <Route path="/video/:category/:id" element={<VideoContent />} />
          <Route path="/video/:category" element={<VideoCategory/>} />

          {/* Articles */}
          <Route path="/articles and blog/:category/:id" element={<ArticleContent />} />
          <Route path="/articles and blog/:category" element={<ArticleCategory/>} />

          {/* Users */}
          <Route path="/user/:username" element={<Users />}/>

          {/* Searched */}
          <Route path="/search/:searched" element={<Search />}/>
        </Routes>
    </>
  );
}

export default App;
