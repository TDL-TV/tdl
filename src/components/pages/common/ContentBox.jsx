import { Link } from "react-router-dom";
import "../../assets/css/Contentbox.css";

const ContentBox = (props) => {
  return (
    <div className="content_box">
      <Link to={props.link}>
        <div className="contentbox_img">
          <img src={props.image} />
        </div>
        <div className="contentbox_description">
          <p>{props.category}</p>
          <div className="contentbox_title">

          <h4>{props.title}</h4><p>...</p>
          </div>

          <div className="content_author">
            <p>{props.author}</p>
            <p>{props.date}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ContentBox;
