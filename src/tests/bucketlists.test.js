import React from 'react';
import renderer from 'react-test-renderer';
import Bucketlists from '../components/bucketlists/bucketlists';

const props = {
  bucketlists: [
    {
      id: 1,
      title: 'Test Bucket',
      description: 'This is a test bucket',
      created_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
      updated_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
    },
    {
      id: 2,
      title: 'Test Bucket 2',
      description: 'This is a test bucket 2',
      created_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
      updated_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
    },
  ],
  request: jest.fn(),
  viewItems: jest.fn(),
};
it('renders correctly', () => {
  const tree = renderer.create(<Bucketlists {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
