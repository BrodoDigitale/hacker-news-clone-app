import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import Header from '../Header/Header';

const NewsList = (props) => {
  return (
    <React.Fragment>
      <Header />
      {props.isLoading ? (
        <p className="loading">Loading news...</p>
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