import React from 'react';
import ItemModal from './item-modal';
import Item from './item';

export default function Items(props) {
  return (
    <div>
      <div className="container">
        <div className="card mt-3 mb-3">
          <div className="card-block">
            <div className="d-flex w-100 justify-content-between mb-2">
              <h5>{props.selectedBucketlist.title}</h5>
              <button
                className="btn btn-sm btn-cool-blue col-xs-12"
                data-toggle="modal"
                data-target="#addItemModal"
              ><span className="fa fa-plus pull-left" /> Add Item
              </button>
            </div>
            {
              props.items && props.items.length !== 0 &&
                <div>
                  <h6 className="card-text ml-4 pb-2">
                    Items <small className="text-muted"> select to view details</small>
                  </h6>
                  <ul className="list-group list-group-flush">
                    {
                      props.items.map(item =>
                        (<Item
                          key={item.id}
                          item={item}
                          request={props.request}
                          selectedBucketlist={props.selectedBucketlist}
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
      <ItemModal
        title="Create an item"
        action="Submit"
        theId="addItemModal"
        request={props.request}
        selectedBucketlist={props.selectedBucketlist}
      />
    </div>
  );
}
