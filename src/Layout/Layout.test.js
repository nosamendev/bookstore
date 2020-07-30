import React from 'react';
import { shallow } from 'enzyme';
import { storeFactory } from '../test/testUtils';
import { findByTestAttr } from '../test/testUtils';
import Layout from './Layout';

const setup = (state = {}) => {
  const store = storeFactory(state);
  const wrapper = shallow(<Layout store={store} />);
  //console.log(wrapper.debug());
  return wrapper;
};

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper.dive(), 'component-wrapper');
  expect(component.length).toBe(1);
});

test('`cartContents` action creator is a function on the props', () => {
  const wrapper = setup();
  const cartContentsProp = wrapper.props().cartContents;
  //console.log(wrapper.props());
  expect(cartContentsProp).toBeInstanceOf(Function);
});

test('`closeFindBookDropdown` action creator is a function on the props', () => {
  const wrapper = setup();
  const closeFindBookDropdownProp = wrapper.props().closeFindBookDropdown;
  expect(closeFindBookDropdownProp).toBeInstanceOf(Function);
});

test('`cartContents` action creator runs on Layout mount', () => {
  const cartContentsMock = jest.fn();

  const wrapper = setup();
  console.log(wrapper.debug());

  wrapper.setProps();
  const cartContentsCallCount = cartContentsMock.mock.calls.length;

  expect(cartContentsCallCount).toBe(1);
});
