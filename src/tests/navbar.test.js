import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-15';
import Navbar from '../components/navbar';

const props = {
  request: jest.fn(),
  viewBucketlists: jest.fn(),
  search: jest.fn(),
};

global.localStorage = {
  setItem: () => {},
  getItem: () => {},
};

it('renders correctly', () => {
  const navbar = renderer.create(<Navbar {...props} />).toJSON();
  expect(navbar).toMatchSnapshot();
});
