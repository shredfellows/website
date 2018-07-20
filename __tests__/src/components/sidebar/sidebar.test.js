//import 'jsdom-global/register';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, render, mount } from 'enzyme';

import Sidebar from '../../../../src/components/sidebar/sidebar.js'

Enzyme.configure({adapter: new Adapter()});

describe('sidebar tests', () => {

  // test('render sidebar', () => {
  //   const wrapper = shallow(<Sidebar />);
  //   expect(wrapper).toHaveLength(1);

  test(`does the sidebar component have the "sidebar" class`, () => {
     const wrapper = shallow(<Sidebar />);
     let wrapProps = wrapper.props()
     let testVar = wrapProps.className;
     expect(testVar).toEqual('sidebar');
   });
 });
