import React from "react";
import "./NewsCard.css";
//import { Link } from "react-router-dom";

const Link = ({ url, title, className }) => (
  <a className={className} href={url}>
    {title}
  </a>
);
//<Link className="news__title-link" to={`/${id}`}/>
const NewsCard = ({ news: { id, by, title, score, time, url } }) => {

  return (
    <div className="news">
      <Link className="news__title-link" url={`/hacker-news-clone-app/${id}`} title={title} />
      <div>
        <span className="news__info">
          by{" "}
          <Link url={`https://news.ycombinator.com/user?id=${by}`} title={by}/>
        </span>
        |
        <span className="news__info">
          {new Date(time * 1000).toLocaleDateString("en-GB", {
            hour: "numeric",
            minute: "numeric",
          })}
        </span>
        |<span className="news__info">{`rating ${score}`}</span>
      </div>
    </div>
  );
};

export default NewsCard;
