import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {newsApi} from '../../utils/HackerNewsApi';

import "./NewsPage.css";

const Link = ({ url, title, className }) => (
  <a className={className} href={url} target="_blank" rel="noreferrer">
    {title}
  </a>
);


//{ news: { by, title, score, time, url }, props }
const NewsPage = (props) => {
  const { id } = useParams()
  const  [thisNews, setThisNews] = useState({})
  const  [comments, setComments] = useState({})
 
  useEffect(() => {
    if(props.news.length > 0) {
      setThisNews(props.news.find((i) => i.id == id))
    } else {
     return
    }
  }, [props.news]);

  useEffect(() => {
    if(thisNews.kids && thisNews.kids.length > 0) {
      console.log(thisNews.kids)
      Promise.all(thisNews.kids.map((i) => newsApi.getComments(i)))
      .then((res) => {
        console.log(res)
        setComments(res)})
    }
  }, [props.isLoading]);

  console.log(id)
  console.log(props.news)
  console.log(thisNews)
  return (
    <React.Fragment>
            {props.isLoading ? 
      (<p className="loading">Загрузка новости...</p>
      ) : (
        <div className="news">
        <div className="news__title">
        <Link className="news__title-link" url={thisNews.url} title={thisNews.title} />
        <p>{thisNews.text}</p>
      </div>
      <div>
        <span className="news__info">
          by{" "}
          <Link url={`https://news.ycombinator.com/user?id=${thisNews.by}`} title={thisNews.by} />
        </span>
        |
        <span className="news__info">
          {new Date(thisNews.time * 1000).toLocaleDateString("en-GB", {
            hour: "numeric",
            minute: "numeric",
          })}
        </span>
        |
        <span className="news__info">
          <Link
            url={`https://news.ycombinator.com/item?id=${id}`}
            title={`${thisNews.kids && thisNews.kids.length > 0 ? thisNews.kids.length : 0} comments`}
          />
        </span>
        <div>
          <p>Comments</p>
          <span>
          {comments.map((comment) => (
            <div>
              <p>{comment.by} at {
                          new Date(comment.time * 1000).toLocaleDateString("en-GB", {
                            hour: "numeric",
                            minute: "numeric",
                          })
              } : {comment.text} </p>

              {comment.kids ? 
              <p></p>
              : null
              }
            </div>
          )
          )}
          </span>
        </div>
      </div>
      </div>
      )
    }
    </React.Fragment>
  );
};

export default NewsPage;