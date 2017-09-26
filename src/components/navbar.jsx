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
    <div className="">
      <div className="row">
        <div className="col-md-4">
          <a href="" onClick={viewBucketlists} className="navbar-brand logo text-white">
            <h3><span className="fa fa-lg fa-bitbucket mr-3 ml-3" />| &nbsp; Bucketlists</h3>
          </a>
        </div>
        <div className="col-md-4 text-center">
          <input
            className="form-control mr-sm-2 search-box"
            type="text"
            placeholder="Search"
            onKeyDown={triggerSearch}
          />
        </div>
        <div className="col-md-4 text-right">
          <div className="dropdown logout-dropdown">
            <div className="fa fa-user-circle fa-lg text-white dropdown-toggle" id="dropdownMenuLink" data-toggle="dropdown">
              &nbsp;<span className="logo"><b> { localStorage.getItem('username') } </b></span>
            </div>
            <div className="dropdown-menu dropdown-cust" aria-labelledby="dropdownMenuLink">
              <a className="dropdown-item" href="" onClick={logoutUser}>Logout</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
