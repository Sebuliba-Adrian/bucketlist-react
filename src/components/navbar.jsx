import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <Link to="/dashboard" className="navbar-brand logo">
            <h3>BUCKETLIST</h3>
          </Link>
        </div>
        <div className="col-md-4">
          <input
            className="form-control mr-sm-2 search-box"
            type="text"
            placeholder="Search"
          />
        </div>
        <div className="col-md-4 text-right">
          <a className="nav-link logo" href="#">
            { localStorage.getItem('username') } <span className="fa fa-sign-out" />
          </a>
        </div>
      </div>
    </div>
  );
}
