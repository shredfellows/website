import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, render, mount } from 'enzyme';
import 'react-dates/initialize';

import Repl from '../../../../src/components/repl/repl.js'

Enzyme.configure({adapter: new Adapter()});

describe('repl tests', () => {
  // test('testing repl initial state', () => {
  //
  //   let mountedRepl = Enzyme.mount(<Repl/>)
  //
  //   const expected = {code: ''};
  //   expect(mountedRepl.state()).toEqual(expected)
  // });

  test(`does the repl component have the "repl" class`, () => {
     const wrapper = shallow(<Repl challenges={[]} runCode={null}><form></form></Repl>);
     let wrapProps = wrapper.props()
     let testVar = wrapProps.className;
     expect(testVar).toEqual('repl');
   });
 });
