import React from "react";
import "./NewsCard.css";

const Link = ({ url, title, className }) => (
  <a className={className} href={url} target="_blank" rel="noreferrer">
    {title}
  </a>
);

const NewsCard = ({ news: { id, by, title, score, time, url } }) => {
  return (
    <div className="news">
      <div className="news__title">
        <Link className="news__title-link" url={url} title={title} />
      </div>
      <div>
        <span className="news__info">
          by{" "}
          <Link url={`https://news.ycombinator.com/user?id=${by}`} title={by} />
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
