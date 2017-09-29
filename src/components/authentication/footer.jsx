import React from 'react';

export default function Footer({ message, link, linkText }) {
  return (
    <p className="card-text text-center grey-text message mt-3">
      {message}
      <a
        href={`https://bucketlist-react-eric.herokuapp.com${link}`}
        className="card-link"
      >{linkText}
      </a>
    </p>
  );
}
