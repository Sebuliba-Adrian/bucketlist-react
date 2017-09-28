import React from 'react';
import renderer from 'react-test-renderer';
import Item from '../components/items/item';


const props = {
  key: 1,
  selectedBucketlist: {
    id: 1,
    title: 'Selected Bucketlist',
    description: 'This is the selected bucketlist',
    created_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
    updated_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
  },
  item: {
    id: 1,
    title: 'Test Item',
    description: 'This is a test item',
    created_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
    updated_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
    status: false,
  },
  request: jest.fn(),
};
it('renders correctly', () => {
  const item = renderer.create(<Item {...props} />).toJSON();
  expect(item).toMatchSnapshot();
});
