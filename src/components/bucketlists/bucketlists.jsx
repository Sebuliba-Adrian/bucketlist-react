import React from 'react';
import BucketlistModal from './bucketlist-modal';
import Bucketlist from './bucketlist';

export default function Bucketlists(props) {
  return (
    <div>
      <div className="container">
        <div className="card mt-3 mb-3">
          <div className="card-block">
            <div className="d-flex w-100 justify-content-between mb-2">
              <p />
              <button
                className="btn btn-sm btn-cool-blue col-xs-12"
                data-toggle="modal"
                data-target="#addBucketlistModal"
              ><span className="fa fa-plus pull-left" /> Add bucketlist
              </button>
            </div>
            {
              props.bucketlists && props.bucketlists.length !== 0 &&
                <div>
                  <h6 className="card-text ml-4 pb-2">
                      Bucketlists <small className="text-muted">select a bucketlist to view it's items</small>
                  </h6>
                  <ul className="list-group list-group-flush">
                    {
                      props.bucketlists.map(bucketlist =>
                        (<Bucketlist
                          key={bucketlist.id}
                          bucketlist={bucketlist}
                          request={props.request}
                          viewItems={props.viewItems}
                        />
                        ),
                      )
                    }
                  </ul>
                </div>
            }
          </div>
        </div>
      </div>
      <BucketlistModal
        title="Create a bucket"
        action="Submit"
        theId="addBucketlistModal"
        request={props.request}
      />
    </div>
  );
}
