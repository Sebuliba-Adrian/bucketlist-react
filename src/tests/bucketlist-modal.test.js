import React from 'react';
import renderer from 'react-test-renderer';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import BucketlistModal from '../components/bucketlists/bucketlist-modal';


const props = {
  theId: 'addBucketlistModal',
  bucketlist: {
    id: 1,
    title: 'Test Bucket',
    description: 'This is a test bucket',
    created_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
    updated_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
  },
  request: jest.fn(),
};

describe('Bucket modal tests', () => {
  configure({ adapter: new Adapter() });
  const bucketMod = mount(<BucketlistModal {...props} />);
  const instance = bucketMod.instance();

  it('renders correctly', () => {
    const bucketlistModal = renderer.create(<BucketlistModal {...props} />).toJSON();
    expect(bucketlistModal).toMatchSnapshot();
  });

  it('Updates title in state on change', () => {
    const title = bucketMod.find("[type='text']").at(0);
    title.simulate('change', {
      target: {
        name: 'title',
        value: 'Test bucket',
      },
    });
    expect(bucketMod.state().title).toEqual('Test bucket');
  });
  it('submits bucket details', () => {
    const button = bucketMod.find('button').at(2);
    button.simulate('click');
    expect(props.request).toHaveBeenCalled();
    bucketMod.setProps({ theId: 'updateBucketlist' });
    button.simulate('click');
    expect(props.request).toHaveBeenCalled();
  });
});

