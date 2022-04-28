import React from 'react';
import "./PageNotFound.css";
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <p className='page-not-found'>
      Такой страницы не существует. Вернуться <Link to="/">на главную</Link>
    </p>
  );
};

export default PageNotFound;