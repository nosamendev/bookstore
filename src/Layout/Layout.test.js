import React from 'react';
import { shallow, mount } from 'enzyme';
import { storeFactory } from '../test/testUtils';
import { findByTestAttr } from '../test/testUtils';
import Layout, { UnconnectedLayout } from './Layout';
import cartContents from '../store/actions';

const setup = (state = {}, props) => {
  const store = storeFactory(state);
  const wrapper = shallow(<Layout store={store} {...props} />);
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

test('Test1: `cartContents` action creator runs on Layout mount', () => {
  const cartContentsMock = jest.fn();

  const setup = () => {
    cartContentsMock.mockClear();
    cartContents = cartContentsMock; // read-only?
    return mount(<App />);
  };

  setup();
  expect(cartContentsMock).toHaveBeenCalled();
});

test('Test2: tests if all dropdowns close on `wrapper` click', () => {
  const closeFindBookDropdownMock = jest.fn();
  const props = { closeFindBookDropdown: closeFindBookDropdownMock };

  const wrapper = shallow(<UnconnectedLayout {...props} />);
  const componentWrapper = findByTestAttr(wrapper, 'component-wrapper');
  //console.log(componentWrapper);
  componentWrapper.simulate('click');

  const closeFindBookDropdownCallCount =
    closeFindBookDropdownMock.mock.calls.length;
  expect(closeFindBookDropdownCallCount).toBe(1);
});
