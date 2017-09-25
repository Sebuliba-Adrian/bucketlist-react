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
  function triggerSearch(event) {
    if (event.keyCode === 13) {
      props.search(event.target.value);
    }
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <a href="" onClick={viewBucketlists} className="navbar-brand logo text-white">
            <h3><span className="fa fa-lg fa-bitbucket mr-3" />| &nbsp; BUCKETLISTS</h3>
          </a>
        </div>
        <div className="col-md-4">
          <input
            className="form-control mr-sm-2 search-box"
            type="text"
            placeholder="Search"
            onKeyDown={triggerSearch}
          />
        </div>
        <div className="col-md-4 text-right">
          <a
            className="nav-link logo text-white"
            href=""
            onClick={logoutUser}
          >
            { localStorage.getItem('username') } &nbsp;<span className="fa fa-sign-out" />
          </a>
        </div>
      </div>
    </div>
  );
}
