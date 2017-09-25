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
          <div className="col-md-10 col-sm-12">
            <div className="d-flex w-100 justify-content-between">
              <div>
                {props.item.updated_at &&
                <small className="text-muted">
                  <strong>Updated: </strong>
                  {props.item.updated_at.substring(4)}
                </small>
                }
              </div>
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
            <br />
            <h4 className="mb-1">{props.item.title}</h4>
            <h6>{props.item.description}</h6>
          </div>
        </div>
      </div>
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
    </a>
  );
}
