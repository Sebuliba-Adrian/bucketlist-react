import React from 'react';
import renderer from 'react-test-renderer';
import Items from '../components/items/items';

const props = {
  selectedBucketlist: {
    id: 1,
    title: 'Selected Bucketlist',
    description: 'This is the selected bucketlist',
    created_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
    updated_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
  },
  items: [
    {
      id: 1,
      title: 'Test item',
      description: 'This is a test item',
      created_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
      updated_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
      status: false,
    },
    {
      id: 2,
      title: 'Test item 2',
      description: 'This is a test item 2',
      created_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
      updated_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
      status: true,
    },
  ],
  request: jest.fn(),
};
it('renders correctly', () => {
  const items = renderer.create(<Items {...props} />).toJSON();
  expect(items).toMatchSnapshot();
});
