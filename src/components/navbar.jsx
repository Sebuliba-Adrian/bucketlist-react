import React from 'react';

export default function NavBar(props) {
  function logoutUser(event) {
    event.preventDefault();
    props.request('logoutUser', 'auth/logout', 'GET');
  }
  function viewBucketlists(event) {
    event.preventDefault();
    props.viewBucketlists();
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <a href="" onClick={viewBucketlists} className="navbar-brand logo text-white">
            <h3>BUCKETLISTS</h3>
          </a>
        </div>
        <div className="col-md-4">
          <input
            className="form-control mr-sm-2 search-box"
            type="text"
            placeholder="Search"
          />
        </div>
        <div className="col-md-4 text-right">
          <a
            className="nav-link logo text-white"
            href=""
            onClick={logoutUser}
          >
            { localStorage.getItem('username') } <span className="fa fa-sign-out" />
          </a>
        </div>
      </div>
    </div>
  );
}
