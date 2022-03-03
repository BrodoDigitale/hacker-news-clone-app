import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom';
import CommentsList from "../CommentsList/CommentsList";
import ReactHtmlParser from 'react-html-parser';
import "./NewsPage.css";


const Link = ({ url, title, className}) => (
  <a className={className} href={url} target="_blank" rel="noreferrer">
    {title}
  </a>
);

//{ news: { by, title, score, time, url }, props }
const NewsPage = (props) => {
  const history = useHistory();
  const { id } = useParams()
  const  [thisNews, setThisNews] = useState([])


  useEffect(() => {
    if(props.news.length > 0) {
      setThisNews(props.news.find((i) => i.id == id))
    } 
  }, [props.news]);



  /*console.log(id)
  console.log(props.news)
  console.log(thisNews)*/
 

  return (
    <React.Fragment>
            {props.isLoading ? 
      (<p className="loading">Loading...</p>
      ) : (
        <div className="newsPage">
        <Link className="newsPage__title" url={thisNews.url} title={thisNews.title} />
      <p className="newsPage__text">{ ReactHtmlParser(thisNews.text) }</p>
        <span className="newsPage__info">
          by{" "}
          <Link url={`https://news.ycombinator.com/user?id=${thisNews.by}`} title={thisNews.by} />
        </span>
        |
        <span className="newsPage__info">
          {new Date(thisNews.time * 1000).toLocaleDateString("en-GB", {
            hour: "numeric",
            minute: "numeric",
          })}
        </span>
        |
        <span className="newsPage__info">
          <Link
            url={`https://news.ycombinator.com/item?id=${id}`}
            title={`${thisNews.kids && thisNews.kids.length > 0 ? thisNews.kids.length : 0} comments`}
          />
        </span>
        |
        <button className="newsPage__go-back-button" onClick={history.goBack}>Go back</button>
      {thisNews.kids && thisNews.kids.length > 0
      ?
      <CommentsList comments={thisNews.kids}/>
      :
      null
      }
      </div>
      )
    }
    </React.Fragment>
  );
};

export default NewsPage;