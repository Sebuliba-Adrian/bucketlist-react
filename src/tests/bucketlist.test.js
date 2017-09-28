import React from 'react';
import renderer from 'react-test-renderer';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Bucketlist from '../components/bucketlists/bucketlist';


const props = {
  key: 1,
  bucketlist: {
    id: 1,
    title: 'Test Bucket',
    description: 'This is a test bucket',
    created_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
    updated_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
  },
  request: jest.fn(),
  viewItems: jest.fn(),
};

describe('Test items', () => {
  it('renders correctly', () => {
    const bucketlist = renderer.create(<Bucketlist {...props} />).toJSON();
    expect(bucketlist).toMatchSnapshot();
  });

  configure({ adapter: new Adapter() });
  const bucket = mount(<Bucketlist {...props} />);
  global.fetch = jest.fn(() => {
    return Promise.resolve({
      json: () => Promise.resolve({}),
    });
  });
  it('Shows buckets items', () => {
    const bucketrow = bucket.find('a');
    bucketrow.simulate('click');
    expect(props.viewItems).toHaveBeenCalled();
  });

});

