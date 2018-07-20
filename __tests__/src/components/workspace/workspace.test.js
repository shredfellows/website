import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, render, mount } from 'enzyme';

import Workspace from '../../../../src/components/workspace/workspace.js'

Enzyme.configure({adapter: new Adapter()});

describe('workspace tests', () => {

  test('rendering workspace', () => {
    const wrapper = shallow(<Workspace assignment ="{}" />);
    expect(wrapper).toHaveLength(1);
})
  test('checking number of workspace properties', () => {
      const wrapper = shallow(<Workspace assignment ="{}"/>);
      let testVar = wrapper.props();
      let varKeys = Object.keys(testVar);
      expect(varKeys.length).toEqual(2);
    });

  test(`does the workspace component have the "workspace" class`, () => {
     const wrapper = shallow(<Workspace assignment ="{}" />);

     expect(wrapper.hasClass('workspace'));
   });
  });
