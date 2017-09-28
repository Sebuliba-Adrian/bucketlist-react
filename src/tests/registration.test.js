import React from 'react';
import renderer from 'react-test-renderer';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Registration from '../components/authentication/registration';

describe('Test registration', () => {
  it('renders correctly', () => {
    const registration = renderer.create(<Registration />).toJSON();
    expect(registration).toMatchSnapshot();
  });
  configure({ adapter: new Adapter() });
  const register = mount(<Registration />);
  const instance = register.instance();
  global.fetch = jest.fn(() => {
    return Promise.resolve({
      json: () => Promise.resolve({}),
    });
  });
  it('Sets user credentials in state on change', () => {
    const usernameInput = register.find("[type='text']").at(1);
    usernameInput.simulate('change', {
      target: {
        name: 'username',
        value: 'eric',
      },
    });
    register.snackbar = <div>Test message</div>;
    register.setState({
      registered: false,
      message: 'Test message',
    });
    expect(register.state().username).toEqual('eric');
  });
  it('Registers a user', () => {
    const button = register.find("[type='submit']");
    button.simulate('submit');
    expect(global.fetch).toHaveBeenCalled();
  });
});
