import React from 'react';
import NewsCard from '../App/NewsCard/NewsCard';

const NewsList = (props) => {
console.log(props.isLoading)
const news = props.allNews

  return (
    <React.Fragment>
      {props.isLoading ? (
        <p className="loading">Загрузка новостей...</p>
      ) : (
        <React.Fragment>
          {news.map((newsItem) => (
            <NewsCard 
            key={newsItem.id} 
            news={newsItem} 
            />
          ))}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default NewsList;