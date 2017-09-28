import React from 'react';
import renderer from 'react-test-renderer';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Dashboard from '../components/dashboard';
//Dashboard.request=jest.fn()

global.localStorage = {
  setItem: () => {},
  getItem: () => 't0k3n',
};

describe('Dashboard tests', () => {
  configure({ adapter: new Adapter() });
  global.fetch = jest.fn(() => {
    return Promise.resolve({
      json: () => Promise.resolve({}),
    });
  });
  const dashboard = mount(<Dashboard />);
  const instance = dashboard.instance();
  it('renders correctly', () => {
    const dashbrd = renderer.create(<Dashboard />).toJSON();
  expect(dashbrd).toMatchSnapshot();
  });

  it('shows bucketlists', () => {
    expect(global.fetch).toHaveBeenCalled();
  });

  it('shows items', () => {
    instance.viewItems({
      id: 1,
      title: 'Selected Bucketlist',
      description: 'This is the selected bucketlist',
      created_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
      updated_at: 'Wed, 20 Sep 2017 11:31:50 GMT',
    },
    );
    expect(global.fetch).toHaveBeenCalled();
  });

  it('Test viewBucketlists', () => {
    instance.viewBucketlists();
    expect(global.fetch).toHaveBeenCalled();
  });

  it('It searches for buckets with b:', () => {
    instance.search('b:mybucket');
    expect(global.fetch).toHaveBeenCalled();
  });

  it('It searches for buckets with B:', () => {
    instance.search('b:mybucket');
    expect(global.fetch).toHaveBeenCalled();
  });

  it('It searches for items with i:', () => {
    instance.search('i:myitem');
    expect(global.fetch).toHaveBeenCalled();
  });

  it('It searches for items with I:', () => {
    instance.search('I:myitem');
    expect(global.fetch).toHaveBeenCalled();
  });

  it('It searches items and buckets for blank search terms', () => {
    instance.search('');
    expect(global.fetch).toHaveBeenCalled();
  });
});
