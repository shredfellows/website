import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, render, mount } from 'enzyme';

import Video from '../../../../src/components/video/video.js'

Enzyme.configure({adapter: new Adapter()});

describe('video tests', () => {
  const testUrl = 'https://www.youtube.com/embed?v=33EmWe23ZF4';

  test('does the component render successfully', () => {
    const wrapper = shallow(<Video />);
    expect(wrapper).toHaveLength(1);
  });

  test('does the iframe recieve a url when rendered', () => {
    const wrapper = shallow(<Video videoUrl={testUrl}/>);
    let wrapProps = wrapper.props()
    let testVar = wrapProps.children.props.src;
    expect(testVar).toEqual(testUrl);
  })
  test(`does the video component have the "tutorial" id`, () => {
     const wrapper = shallow(<Video videoUrl={testUrl}/>);
     let wrapProps = wrapper.props()
     let testVar = wrapProps.id;
     expect(testVar).toEqual('tutorial');
   });
  });
