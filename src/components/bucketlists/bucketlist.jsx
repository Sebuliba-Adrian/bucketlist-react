import React from 'react';
import BucketlistModal from './bucketlist-modal';
import ConfirmDelete from '../confirm-delete';

export default function Bucketlist(props) {
  function viewItems(event) {
    console.log('---clicked---')
    event.preventDefault();
    props.viewItems(props.bucketlist);
  }
  return (
    <div>
      <a
        href=""
        onClick={viewItems}
        className="list-group-item list-group-item-action flex-column align-items-start"
      >
        <div className="d-flex w-100 justify-content-between">
          <div>
            {props.bucketlist.updated_at &&
            <small className="text-muted">
              <strong>Updated: </strong>
              {props.bucketlist.updated_at.substring(4)}
            </small>
            }
          </div>
          <div>
            <div
              className="fa fa-lg fa-pencil-square-o mr-2"
              data-toggle="modal"
              data-target={`#${props.bucketlist.id}`}
              data-backdrop="static"
              data-keyboard="false"
            />
            <div
              className="fa fa-lg fa-trash-o ml-2"
              data-toggle="modal"
              data-target={`#deleteBucketModel${props.bucketlist.id}`}
              data-backdrop="static"
              data-keyboard="false"
            />
          </div>
        </div>
        <br />
        <h5 className="mb-1 text-cool-blue">{props.bucketlist.title}</h5>
        <p className="text-muted">{props.bucketlist.description}</p>
        <small className="text-muted">
          <strong>Created: </strong>
          {props.bucketlist.created_at.substring(4)}
        </small>
      </a>
      <BucketlistModal
        title="Edit a bucketlist"
        action="Submit"
        theId={props.bucketlist.id}
        bucketlist={props.bucketlist}
        request={props.request}
      />
      <ConfirmDelete
        theId={`deleteBucketModel${props.bucketlist.id}`}
        bucketlist={props.bucketlist}
        request={props.request}
      />
    </div>
  );
}
