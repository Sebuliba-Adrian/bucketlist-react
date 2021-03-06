import React from 'react';
import renderer from 'react-test-renderer';
import { mount, configure } from 'enzyme';
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
describe('Navbar tests', () => {
  configure({ adapter: new Adapter() });
  const navbar = mount(<Navbar {...props} />);
  const instance = navbar.instance();

  it('renders correctly', () => {
    const navBar = renderer.create(<Navbar {...props} />).toJSON();
    expect(navBar).toMatchSnapshot();
  });

  it('Logs out user', () => {
    const logoutLink = navbar.find('a').at(1);
    logoutLink.simulate('click');
    expect(props.request).toHaveBeenCalled();
  });

  it('Shows bucketlists', () => {
    const logo = navbar.find('a').at(0);
    logo.simulate('click');
    expect(props.viewBucketlists).toHaveBeenCalled();
  });

  it('Triggers search', () => {
    const searchBox = navbar.find("[type='text']");
    searchBox.simulate('keyDown', {keyCode: 13});
    expect(props.search).toHaveBeenCalled();
  });
});
