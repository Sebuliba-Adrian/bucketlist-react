import React from 'react';
import renderer from 'react-test-renderer';
import Registration from '../components/authentication/registration';


it('renders correctly', () => {
  const registration = renderer.create(<Registration />).toJSON();
  expect(registration).toMatchSnapshot();
});
