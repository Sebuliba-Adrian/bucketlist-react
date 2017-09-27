import React from 'react';
import DateDisplay from '../date-display';
import ItemModal from './item-modal';
import ConfirmDelete from '../confirm-delete';

export default function Item(props) {
  function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  return (
    <div>
      <a
        href=""
        onClick={handleClick}
        className="list-group-item list-group-item-action flex-column align-items-start"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-2 hidden-sm-down">
              <DateDisplay date={props.item.created_at} />
            </div>
            <div className="col-md-10 item-data">
              <div className="d-flex w-100 justify-content-between">
                <p>
                  <small className="text-muted">
                    {props.item.status ? 'Finished' : 'Pending'}
                  </small>
                </p>
                <div>
                  <div
                    className="fa fa-lg fa-pencil-square-o mr-2"
                    data-toggle="modal"
                    data-backdrop="static"
                    data-keyboard="false"
                    onClick={handleClick}
                    data-target={`#${props.item.id}`}
                  />
                  <div
                    className="fa fa-lg fa-trash-o ml-2"
                    data-toggle="modal"
                    data-backdrop="static"
                    data-keyboard="false"
                    onClick={handleClick}
                    data-target={`#deleteItemModel${props.item.id}`}
                  />
                </div>
              </div>
              <h5 className="mb-1 text-cool-blue">{props.item.title}</h5>
              <h6 className="text-muted">{props.item.description}</h6>
              <div>
                {props.item.updated_at &&
                <small className="text-muted">
                  <strong>Updated: </strong>
                  {props.item.updated_at.substring(4)}
                </small>
                }
              </div>
            </div>
          </div>
        </div>
      </a>
      <ItemModal
        title="Edit a item"
        action="Submit"
        theId={props.item.id}
        item={props.item}
        selectedBucketlist={props.selectedBucketlist}
        request={props.request}
      />
      <ConfirmDelete
        theId={`deleteItemModel${props.item.id}`}
        item={props.item}
        selectedBucketlist={props.selectedBucketlist}
        request={props.request}
      />
    </div>
  );
}
