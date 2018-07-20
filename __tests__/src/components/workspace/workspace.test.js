import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, render, mount } from 'enzyme';

import Workspace from '../../../../src/components/workspace/workspace.js'

Enzyme.configure({adapter: new Adapter()});

describe('workspace tests', () => {

  test('render workspace', () => {
    const wrapper = shallow(<Workspace assignment ="{}" />);
    expect(wrapper).toHaveLength(1);

  test('render workspace', () => {
      const mountedWorkspace = mount(<Workspace />);
      console.log(mountedWorkspace)
      expect(mountedWorkspace.props('class')).toEqual('workspace');
    });

  test(`does the workspace component have the "workspace" class`, () => {
     const wrapper = shallow(<Workspace assignment ="{}" />);
     console.log(wrapper)
     expect(wrapper.props().exists().toEqual('true'));
   });
  });
});
