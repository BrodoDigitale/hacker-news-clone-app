import React from 'react';
import NewsCard from '../NewsCard/NewsCard';

const NewsList = (props) => {
  return (
    <React.Fragment>
      {props.isLoading ? (
        <p className="loading">Загрузка новостей...</p>
      ) : (
        <React.Fragment>
          {props.news.map((newsItem) => (
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