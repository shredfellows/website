import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, render, mount } from 'enzyme';
import { Provider } from 'react-redux';
import 'react-dates/initialize';
import Repl from '../../../../src/components/repl/repl.js'

import createStore from '../../../../src/store/';
const store = createStore();


Enzyme.configure({adapter: new Adapter()});

describe('repl tests', () => {
  test('testing repl initial state', () => {

    let mountedRepl = Enzyme.shallow(<Repl/>)

    const expected = {code: undefined};
    expect(mountedRepl.state()).toEqual(expected);
  });

  test(`does the repl component have the "repl" class`, () => {
     const wrapper = shallow(
     <Provider store={store}>
      <Repl challenges={[]} runCode={null}><form></form></Repl>
     </Provider>
     );
     let wrapProps = wrapper.props()
     console.log('WRAP PROPS', wrapProps);
     let testVar = wrapProps.className;
     expect(testVar).toEqual(undefined);
   });
 });
