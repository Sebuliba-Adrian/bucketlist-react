import React from 'react';
import renderer from 'react-test-renderer';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Login from '../components/authentication/login';

const props = {
  location: {
    data: {
      message: 'Test message',
    },
  },
  history: {
    replace: jest.fn(),
  },
};

global.localStorage = {
  setItem: () => {},
  getItem: () => {},
};

describe('Login tests', () => {
  configure({ adapter: new Adapter() });
  const login = mount(<Login {...props} />);
  const instance = login.instance();

  it('renders correctly', () => {
    const loginPage = renderer.create(<Login {...props} />).toJSON();
    expect(loginPage).toMatchSnapshot();
  });

  it('Sets user credentials in state on change', () => {
    const usernameInput = login.find("[type='text']");
    usernameInput.simulate('change', {
      target: {
        name: 'username',
        value: 'eric',
      },
    });
    expect(login.state().username).toEqual('eric');
    const passwordInput = login.find("[type='password']");
    passwordInput.simulate('change', {
      target: {
        name: 'password',
        value: 'thepassword',
      },
    });
    expect(login.state().password).toEqual('thepassword');
  });
  global.fetch = jest.fn(() => {
    return Promise.resolve({
      json: () => Promise.resolve({}),
    });
  });
  it('Logs a user in', () => {
    const button = login.find("[type='submit']");
    button.simulate('submit');
    expect(global.fetch).toHaveBeenCalled();
  });
});
